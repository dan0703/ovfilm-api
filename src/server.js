const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Article = require(path.join(__dirname, 'models/article.js'))
const Video = require(path.join(__dirname, 'models/video.js'))
const Image = require(path.join(__dirname, 'models/image.js'))
const VideoGallery = require(path.join(__dirname, 'models/videoGallery.js'))
const Review = require(path.join(__dirname, 'models/review.js'))
const PhotoGallery = require(path.join(__dirname, 'models/photoGallery.js'))
const ContactUs = require(path.join(__dirname, 'models/contactUs.js'))
const AboutUs = require(path.join(__dirname, 'models/aboutUs.js'))
const Translation = require(path.join(__dirname, 'models/translation.js'))

const port = 1624;
const dbserver = '192.168.1.154:27017';
const dbname = 'ovfilm';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// Conectar a MongoDB
mongoose.connect(`mongodb://${dbserver}/${dbname}` )
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

  app.get('/videolist', async (req, res) => {
    var videos = await Video.find({})
    var results = videos.filter(element => {
      return element != null;
    });
    res.status(200).send(results)
  })

  app.get('/imagelist', async (req, res) => {
    var images = await Image.find({})
    var results = images.filter(element => {
      return element != null;
    });
    res.status(200).send(results)
  })
  app.get('/photoGallery', async (req, res) => {
    var photoGallery = await PhotoGallery.find({})
    var results = photoGallery.filter(element => {
      return element != null;
    });
    res.status(200).send(results)
  })

  app.get('/reviewlist', async (req, res) => {
    var reviews = await Review.find({})
    var results = reviews.filter(element => {
      return element != null;
    });
    res.status(200).send(results)
  })

  app.get('/articlelist', async (req, res) => {
    var articles = await Article.find({})
    var results = articles.filter(element => {
      return element != null;
    });
    res.status(200).send(results)
  })

  app.get('/articlebyid', async (req, res) => {
    try{
      var article = await Article.findOne({_id: req.query._id})
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }
      res.status(200).json(article)
    }catch(error){
      return res.status(500).send(error)
    }
  })
  
  app.get('/translation/:language', async (req, res) => {
    const { language } = req.params;

    var translation = await Translation.find({language: language})
    var results = translation.filter(element => {
      return element != null;
    });

    const populatedTranslation = await Translation.findOne({ language })
    .populate('sections.REVIEW')
    .populate('sections.VIDEO_GALLERY')     
    .populate('sections.ABOUT_US')          
    .populate('sections.PHOTO_GALLERY') 
    .populate('sections.CONTACT_US');       

    res.status(200).send(populatedTranslation)
  })

  app.get('/build-translation/:language', async (req, res) => {
    const { language } = req.params;

    try {
        const videoGallery = await VideoGallery.findOne({ LANGUAGE: language });
        const reviews = await Review.find({ LANGUAGE: language });
        const aboutUs = await AboutUs.findOne({ LANGUAGE: language });
        const photoGallery = await PhotoGallery.findOne({ LANGUAGE: language });
        const contactUs = await ContactUs.findOne({ LANGUAGE: language });

        if (!videoGallery && reviews.length === 0 && !aboutUs && !photoGallery && !contactUs) {
            return res.status(404).send({ message: 'No content found for the specified language' });
        }

        const translation = {
            language: language,
            sections: {
                VIDEO_GALLERY: videoGallery || null,
                REVIEW: reviews.length > 0 ? reviews : null,
                ABOUT_US: aboutUs || null,
                PHOTO_GALLERY: photoGallery || null,
                CONTACT_US: contactUs || null
            }
        };

        const { _id, ...translationWithoutId } = translation;

        const updatedTranslation = await Translation.findOneAndUpdate(
            { language },        
            translationWithoutId,  
            { new: true, upsert: true }  
        );

        res.status(200).send(updatedTranslation);
    } catch (error) {
        res.status(500).send({ message: 'Error building translation', error });
    }
});


  app.post('/admin/video', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var video = new Video(req.body)

        await video.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.delete('/admin/video', async (req, res) => {
    if (req.body.auth === '#oV0202@2025') {
        try {
            const result = await Video.findOneAndDelete({ videolink: req.body.videolink });

            if (result) {
                res.status(200).send({ message: 'Video deleted', deletedVideo: result });
            } else {
                res.status(404).send({ error: 'Video not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error', details: error.message });
        }
    } else {
        res.status(403).send({ error: 'No authorized' });
    }
  });

  app.delete('/admin/image', async (req, res) => {
    if (req.body.auth === '#oV0202@2025') {
        try {
            const result = await Image.findOneAndDelete({ IMAGE_NAME: req.body.IMAGE_NAME });

            if (result) {
                res.status(200).send({ message: 'image deleted', deletedImage: result });
            } else {
                res.status(404).send({ error: 'Image not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error', details: error.message });
        }
    } else {
        res.status(403).send({ error: 'No authorized' });
    }
  });

  app.delete('/admin/article', async (req, res) => {
    if (req.body.auth === '#oV0202@2025') {
        try {
            const result = await Article.findOneAndDelete({ title: req.body.title });

            if (result) {
                res.status(200).send({ message: 'article deleted', deletedArticle: result });
            } else {
                res.status(404).send({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error', details: error.message });
        }
    } else {
        res.status(403).send({ error: 'No authorized' });
    }
  });


  app.post('/admin/article', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        try{
          var article = new Article(req.body)
          const existingArticle = await Article.findOne({ title: req.body.title });
          if(existingArticle){
            return res.status(409).send({ error: 'the title already exist'})
          }
          await article.save()
          res.status(201).send(req.body)
        }catch (error){
          res.status(500).send({ error: 'Error saving article', details: error.message });
        }
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.post('/admin/image', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var image = new Image(req.body)
        await image.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })
  
  app.post('/admin/review', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var review = new Review(req.body)

        await review.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.post('/admin/videoGallery', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var videoGallery = new VideoGallery(req.body)

        await videoGallery.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.post('/admin/photoGallery', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var photoGallery = new PhotoGallery(req.body)

        await photoGallery.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.post('/admin/contactus', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var contactUs = new ContactUs(req.body)

        await contactUs.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })

  app.post('/admin/aboutUs', async (req, res) => {
    if(req.body.auth === '#oV0202@2025'){
        var aboutUs = new AboutUs(req.body)

        await aboutUs.save()
        res.status(201).send(req.body)
    }else{
        res.status(404).send({error: 'error'})
    }
  })


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

app.listen(port, () => console.log('API corriendo en http://localhost:' + port));
