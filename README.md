# SMARTTRANSIT Backend

## 📧 Configuración del Backend de Correo

### 1. Instalar Node.js
Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Gmail para Envío de Correos

**Opción A: Contraseña de Aplicación (Recomendado)**

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Ve a "Seguridad"
3. Activa "Verificación en 2 pasos" (si no está activada)
4. Busca "Contraseñas de aplicaciones"
5. Genera una contraseña para "Correo"
6. Copia la contraseña generada
7. En `server.js`, línea 16, reemplaza `'tu_contraseña_de_aplicacion'` con la contraseña generada

**Opción B: Configuración menos segura (No recomendado)**

1. Ve a https://myaccount.google.com/lesssecureapps
2. Activa "Permitir aplicaciones menos seguras"
3. En `server.js`, línea 16, usa tu contraseña normal de Gmail

### 4. Ejecutar el Servidor
```bash
npm start
```

El servidor se ejecutará en: http://localhost:3000

### 5. Probar la Landing Page
Abre tu navegador y ve a: http://localhost:3000

### Solución de Problemas

**Error: "Invalid login"**
- Verifica que la contraseña de aplicación esté correcta
- Asegúrate de tener la verificación en 2 pasos activada

**Error: "ECONNREFUSED"**
- Verifica tu conexión a internet
- Revisa la configuración de firewall

**No llegan los correos**
- Revisa la carpeta de spam
- Verifica que el email darkoutbreak@gmail.com esté correcto
"# landingpage" 
"# landingpage" 
