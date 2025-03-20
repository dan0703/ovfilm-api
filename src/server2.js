const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'formulario@ovfilm.com',
        pass: 'ethp qxnh svqm eyfy'
    }
});

app.post('/send-email', async (req, res) => {
    const { to, clientName, language, text } = req.body;
    let subject;
    let message;
    const subjectForUs = 'Nueva solicitud de informacion de: '+clientName;
    if (language === 'en') {
        message = `
        Hi ${clientName},
        Thank you for contacting us! We're thrilled that you're considering OV Film to capture the special moments of your wedding. We've received your inquiry, 
        and our team will get back to you within 24-48 hours.

        In the meantime, if you have any specific questions or need a quick response, feel free to email us at contacto@ovfilm.com or message us on +52 998-305-6025.

        We can’t wait to get to know you and be part of your big day!

        Best regards,
        OV Film
        `;
        subject = 'Thank You for Reaching Out to OV Film!';
    }
    else {
        message = `
        ¡Gracias por escribirnos! Nos emociona que estés considerando a OV Film para capturar los momentos especiales de tu boda. Tu solicitud de información ha sido recibida, 
        y nuestro equipo se pondrá en contacto contigo en un plazo máximo de 24-48 horas.
        Mientras tanto, si tienes preguntas específicas o necesitas una respuesta rápida, no dudes en escribirnos directamente a contacto@ovfilm.com o enviarnos un mensaje al +52 998-305-6025.
        ¡Estamos ansiosos por conocerte y ser parte de tu gran día!
        Saludos,
        OV Film
        `;
        subject = '¡Gracias por contactarte con OV Film!';

    }

    try {
        await transporter.sendMail({
            from: 'OV Film',
            to: 'contacto@ovfilm.com',
            subject: subjectForUs,
            text
        });
        await transporter.sendMail({
            from: 'OV Film',
            to,
            subject,
            text: message
        });

        await transporter.sendMail({
            from: 'OV Film',
            to: 'vgallardo@ovfilm.com',
            subject: subjectForUs,
            text
        });
        res.status(200).json({ message: 'Correo enviado' });
        console.log('Correo enviado');
    } catch (error) {
        res.status(500).json('Error al enviar correo' + error);
        console.log('Error al enviar correo' + error);
    }
});

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));
