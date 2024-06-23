// Importamos las dependencias necesarias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Creamos una instancia de la aplicación Express
const app = express();

// Configuramos el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Configuramos el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuramos el middleware para parsear el contenido de los formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para el archivo 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para el archivo 'quienes-somos.html'
app.get('/quienes-somos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'quienes-somos.html'));
});

// Ruta para el archivo 'form.html'
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Ruta para manejar la solicitud de programación de clase
app.post('/form', (req, res) => {
    const { nombre, email, tema, datetime1_desde, datetime1_hasta, datetime2_desde, datetime2_hasta, datetime3_desde, datetime3_hasta, horas } = req.body;

    // Validación adicional del rango de horas en el servidor
    if (horas < 1 || horas > 20) {
        return res.status(400).send('La cantidad de horas debe estar entre 1 y 20.');
    }

    // Configuración de Nodemailer para enviar el correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manriquev231@gmail.com', 
            pass: 'xxxx xxxx xxxx xxxx' 
        }
    });

    const mailOptions = {
        from: 'manriquev231@gmail.com',
        to: email,
        subject: 'Confirmación de clase - Easy Maths',
        text: `Hola ${nombre},\n\nTu solicitud para una clase de ${tema} ha sido recibida.\nHas proporcionado los siguientes horarios:\n1. Desde: ${datetime1_desde} Hasta: ${datetime1_hasta}\n2. Desde: ${datetime2_desde} Hasta: ${datetime2_hasta}\n3. Desde: ${datetime3_desde} Hasta: ${datetime3_hasta}\n\nNos pondremos en contacto contigo para confirmar el horario más adecuado.\n\nCantidad de horas solicitadas: ${horas}\n\nGracias,\nEasy Maths`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Correo enviado: ' + info.response);
        res.redirect('/');
    });
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
