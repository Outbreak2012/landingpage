// Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar links smooth scroll
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Formulario de Contacto - Backend Propio con Node.js
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        empresa: document.getElementById('empresa').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    try {
        const response = await fetch('https://landingpage-production-8456.up.railway.app/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo (npm start).', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Base de conocimientos del chatbot sobre SMARTTRANSIT
const knowledgeBase = {
    'smarttransit': {
        keywords: ['smarttransit', 'sistema', 'que es', 'empresa', 'quienes', 'sobre'],
        response: 'SMARTTRANSIT es un sistema web y móvil innovador para pago electrónico con tarjetas NFC y monitoreo GPS en tiempo real del transporte público urbano. Revolucionamos la forma en que operadores y pasajeros interactúan con el transporte público.'
    },
    'pago': {
        keywords: ['pago', 'tarjeta', 'nfc', 'transaccion', 'cobro', 'dinero', 'efectivo'],
        response: 'Nuestro sistema utiliza tecnología NFC (Near Field Communication) que permite pagos sin contacto de forma rápida y segura. Los pasajeros pueden pagar con tarjetas bancarias o dispositivos móviles compatibles, eliminando la necesidad de efectivo.'
    },
    'gps': {
        keywords: ['gps', 'rastreo', 'ubicacion', 'monitoreo', 'seguimiento', 'tiempo real', 'mapa'],
        response: 'El sistema de monitoreo GPS permite rastrear en tiempo real la ubicación exacta de cada unidad de transporte. Los operadores pueden visualizar toda su flota en un mapa interactivo y optimizar rutas basándose en datos reales.'
    },
    'beneficios': {
        keywords: ['beneficios', 'ventajas', 'ventaja', 'porque', 'por que'],
        response: 'Los principales beneficios son: 1) Reducción de costos operativos hasta 30%, 2) Eliminación del manejo de efectivo, 3) Transparencia total en operaciones, 4) Mejor experiencia para pasajeros, 5) Reportes y análisis detallados, 6) Optimización de rutas en tiempo real.'
    },
    'costo': {
        keywords: ['costo', 'precio', 'cuanto', 'valor', 'tarifa', 'pagar'],
        response: 'El costo varía según el tamaño de su flota y las funcionalidades requeridas. Le recomiendo solicitar una demo gratuita para que podamos analizar sus necesidades específicas y ofrecerle una cotización personalizada.'
    },
    'demo': {
        keywords: ['demo', 'prueba', 'probar', 'demostración', 'ver'],
        response: '¡Excelente! Puede solicitar una demo gratuita completando el formulario de contacto en esta página. También puede comunicarse directamente por WhatsApp al +591 60918961 o enviarnos un correo a darkoutbreak@gmail.com.'
    },
    'contacto': {
        keywords: ['contacto', 'telefono', 'correo', 'email', 'llamar', 'escribir', 'comunicar'],
        response: 'Puede contactarnos por: WhatsApp: +591 60918961, Email: darkoutbreak@gmail.com. También puede completar el formulario de contacto en esta página y nos comunicaremos con usted a la brevedad.'
    },
    'app': {
        keywords: ['aplicacion', 'app', 'movil', 'celular', 'smartphone', 'android', 'ios'],
        response: 'SMARTTRANSIT cuenta con aplicaciones móviles para operadores y pasajeros. Los operadores pueden gestionar su flota desde el smartphone, mientras que los pasajeros pueden consultar rutas, horarios y realizar recargas desde la app.'
    },
    'seguridad': {
        keywords: ['seguridad', 'seguro', 'proteccion', 'robo', 'fraude'],
        response: 'La seguridad es nuestra prioridad. Todas las transacciones están encriptadas y protegidas. El sistema elimina el riesgo de robo de efectivo y cuenta con protocolos de seguridad bancarios para todas las operaciones.'
    },
    'rutas': {
        keywords: ['rutas', 'ruta', 'optimizar', 'eficiencia', 'recorrido'],
        response: 'El sistema analiza los datos de GPS en tiempo real para identificar las rutas más eficientes. Puede reducir costos de combustible, mejorar tiempos de llegada y optimizar la distribución de su flota según la demanda.'
    }
};

// Inicializar Chatbot cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    console.log('Chatbot inicializando...', {chatbotToggle, chatbot, chatbotClose});

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            console.log('Toggle clicked');
            chatbot.classList.add('active');
            chatbotToggle.style.display = 'none';
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            console.log('Close clicked');
            chatbot.classList.remove('active');
            chatbotToggle.style.display = 'block';
        });
    }

    // Enviar mensaje
    if (chatbotSend) {
        chatbotSend.addEventListener('click', () => sendMessage());
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        console.log('Sending message:', message);
        
        // Agregar mensaje del usuario
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simular "escribiendo..."
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 800);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const icon = document.createElement('i');
        icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        messageDiv.appendChild(icon);
        messageDiv.appendChild(p);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll al final
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Saludos
        if (lowerMessage.match(/hola|buenos|buenas|saludos|hi|hello/)) {
            return '¡Hola! 👋 Soy el asistente virtual de SMARTTRANSIT. Puedo ayudarte con información sobre nuestro sistema de pago electrónico y monitoreo GPS. ¿Qué te gustaría saber?';
        }
        
        // Despedidas
        if (lowerMessage.match(/adios|chao|hasta|bye|gracias/)) {
            return '¡Gracias por tu interés en SMARTTRANSIT! Si necesitas más información, no dudes en contactarnos por WhatsApp al +591 60918961 o escribirnos a darkoutbreak@gmail.com. ¡Que tengas un excelente día! 😊';
        }
        
        // Buscar respuesta en la base de conocimientos
        for (const [category, data] of Object.entries(knowledgeBase)) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword)) {
                    return data.response;
                }
            }
        }
        
        // Respuesta por defecto
        return 'Entiendo tu pregunta. Para brindarte información más específica, te recomiendo: 1) Revisar las secciones de Ventajas y Características en esta página, 2) Solicitar una demo gratuita, o 3) Contactarnos directamente por WhatsApp (+591 60918961) o email (darkoutbreak@gmail.com). ¿Hay algo más en lo que pueda ayudarte?';
    }
});



// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.ventaja-card, .caracteristica-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animación para elementos estadísticos
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Inicializar animación de stats después de cargar
window.addEventListener('load', () => {
    setTimeout(animateStats, 1000);
});

// Agregar estilos para animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);

console.log('SMARTTRANSIT Landing Page cargada correctamente ✅');
