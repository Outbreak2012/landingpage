const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(__dirname));



// Configurar Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_2XP1rUhr_EEJHTtqtKUVa3iJ9CjBbsCoM');

// Endpoint para enviar correo
app.post('/send-email', async (req, res) => {
    const { nombre, empresa, email, telefono, mensaje } = req.body;


    try {
        const { data, error } = await resend.emails.send({
            from: 'SMARTTRANSIT <noreply@resend.dev>',
            to: 'luzmarinacadima01@gmail.com',
            subject: `Nueva Solicitud de Demo - ${empresa}`,
            html: `
                <h2>Nueva Solicitud de Demo - SMARTTRANSIT</h2>
                <hr>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Empresa:</strong> ${empresa}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje || 'Sin mensaje adicional'}</p>
                <hr>
                <p><em>Enviado desde la Landing Page de SMARTTRANSIT</em></p>
            `
        });
        if (error) {
            console.error('Error al enviar email:', error);
            res.status(500).json({ success: false, message: 'Error al enviar email' });
        } else {
            res.json({ success: true, message: 'Email enviado correctamente' });
        }
    } catch (err) {
        console.error('Error al enviar email:', err);
        res.status(500).json({ success: false, message: 'Error al enviar email' });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📧 Backend de correo configurado`);
});
