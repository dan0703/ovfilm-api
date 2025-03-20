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
// const dbserver = '192.168.1.154:27017';
const dbserver = '127.0.0.1';

const dbname = 'ovfilm';

const app = express();
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));


// Conectar a MongoDB
mongoose.connect(`mongodb://${dbserver}/${dbname}` )
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

  app.get('/videolist', async (req, res, next) => {
    try {
        const videos = await Video.find({});
        const results = videos.filter(element => element != null);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No videos found.' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching video list:', error);
        res.status(500).json({
            message: 'An error occurred while fetching the video list.',
            error: error.message || 'Unknown error'
        });
        next(error);
    }
});


app.get('/imagelist', async (req, res) => {
  try {
      const images = await Image.find({});
      const results = images.filter(element => element != null);

      if (results.length === 0) {
          return res.status(404).json({ message: 'No images found.' });
      }

      res.status(200).json(results);
  } catch (error) {
      console.error('Error fetching image list:', error);
      res.status(500).json({
          message: 'An error occurred while fetching the image list.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/photoGallery', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const photoGallery = await PhotoGallery.findOne(filter);

      if (!photoGallery) {
          return res.status(404).json({ message: "PhotoGallery not found" });
      }

      res.status(200).json(photoGallery);
  } catch (error) {
      console.error('Error fetching photo gallery:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the photo gallery.',
          error: error.message || 'Unknown error'
      });
  }
});

app.get('/contactus', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const contactus = await ContactUs.findOne(filter);

      if (!contactus) {
          return res.status(404).json({ message: "ContactUs not found" });
      }

      res.status(200).json(contactus);
  } catch (error) {
      console.error('Error fetching contactus:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the contact information.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/videoGallery', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const videoGallery = await VideoGallery.findOne(filter);

      if (!videoGallery) {
          return res.status(404).json({ message: "VideoGallery not found" });
      }

      res.status(200).json(videoGallery);
  } catch (error) {
      console.error('Error fetching video gallery:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the video gallery.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/reviewlist', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const reviews = await Review.find(filter);
      const results = reviews.filter(element => element != null);

      if (results.length === 0) {
          return res.status(404).json({ message: "No reviews found" });
      }

      res.status(200).json(results);
  } catch (error) {
      console.error('Error fetching review list:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the review list.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/articlelist', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const articles = await Article.find(filter);
      const results = articles.filter(element => element != null);

      if (results.length === 0) {
          return res.status(404).json({ message: "No articles found" });
      }

      res.status(200).json(results);
  } catch (error) {
      console.error('Error fetching article list:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the article list.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/articlebyid', async (req, res) => {
  try {
      const article = await Article.findOne({ _id: req.query._id });

      if (!article) {
          return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(article);
  } catch (error) {
      console.error('Error fetching article by ID:', error);
      return res.status(500).json({
          message: 'An error occurred while fetching the article.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/aboutUs', async (req, res) => {
  try {
      const { LANGUAGE } = req.query;
      const filter = LANGUAGE ? { LANGUAGE } : {};
      const aboutUs = await AboutUs.findOne(filter);

      if (!aboutUs) {
          return res.status(404).json({ message: "About us not found for the specified language" });
      }

      res.status(200).json(aboutUs);
  } catch (error) {
      console.error('Error fetching About Us:', error);
      res.status(500).json({
          message: 'An error occurred while fetching About Us.',
          error: error.message || 'Unknown error'
      });
  }
});

app.get('/translation/:language', async (req, res) => {
  try {
      const { language } = req.params;

      const translation = await Translation.find({ language });
      const results = translation.filter(element => element != null);

      const populatedTranslation = await Translation.findOne({ language })
          .populate('sections.REVIEW')
          .populate('sections.VIDEO_GALLERY')
          .populate('sections.ABOUT_US')
          .populate('sections.PHOTO_GALLERY')
          .populate('sections.CONTACT_US');

      if (!populatedTranslation) {
          return res.status(404).json({ message: "Translation not found for the specified language" });
      }

      res.status(200).json(populatedTranslation);
  } catch (error) {
      console.error('Error fetching translation:', error);
      res.status(500).json({
          message: 'An error occurred while fetching the translation.',
          error: error.message || 'Unknown error'
      });
  }
});


app.get('/build-translation/:language', async (req, res) => {
  const { language } = req.params;

  try {
      const videoGallery = await VideoGallery.findOne({ LANGUAGE: language });
      const reviews = await Review.find({ LANGUAGE: language });
      const aboutUs = await AboutUs.findOne({ LANGUAGE: language });
      const photoGallery = await PhotoGallery.findOne({ LANGUAGE: language });
      const contactUs = await ContactUs.findOne({ LANGUAGE: language });

      if (!videoGallery && reviews.length === 0 && !aboutUs && !photoGallery && !contactUs) {
          return res.status(404).json({ message: 'No content found for the specified language' });
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

      res.status(200).json(updatedTranslation);
  } catch (error) {
      console.error('Error building translation:', error);
      res.status(500).json({
          message: 'An error occurred while building the translation.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/video', async (req, res) => {
  try {
      const video = new Video(req.body);
      await video.save();
      res.status(201).json(video);
  } catch (error) {
      console.error('Error saving video:', error);
      res.status(500).json({
          message: 'An error occurred while saving the video.',
          error: error.message || 'Unknown error'
      });
  }
});


app.delete('/admin/video', async (req, res) => {
  try {
      const result = await Video.findOneAndDelete({ videolink: req.body.videolink });

      if (result) {
          res.status(200).json({ message: 'Video deleted', deletedVideo: result });
      } else {
          res.status(404).json({ error: 'Video not found' });
      }
  } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({
          message: 'An error occurred while deleting the video.',
          error: error.message || 'Unknown error'
      });
  }
});


app.delete('/admin/image', async (req, res) => {
  try {
      const result = await Image.findOneAndDelete({ IMAGE_NAME: req.body.IMAGE_NAME });

      if (result) {
          res.status(200).json({ message: 'Image deleted', deletedImage: result });
      } else {
          res.status(404).json({ error: 'Image not found' });
      }
  } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({
          message: 'An error occurred while deleting the image.',
          error: error.message || 'Unknown error'
      });
  }
});


app.delete('/admin/AllImages', async (req, res) => {
  try {
      await Image.deleteMany({});
      res.status(200).json({ message: 'All images have been deleted successfully.' });
  } catch (error) {
      console.error('Error deleting images:', error);
      res.status(500).json({
          message: 'An error occurred while deleting images.',
          error: error.message || 'Unknown error'
      });
  }
});


app.delete('/admin/article', async (req, res) => {
  try {
      console.log(req.query._id);
      const article = await Article.findOneAndDelete({ _id: req.query._id });

      if (article) {
          res.status(200).json({ message: 'Article deleted', deletedArticle: article });
      } else {
          res.status(404).json({ error: 'Article not found' });
      }
  } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({
          message: 'An error occurred while deleting the article.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/article', async (req, res) => {
  try {
      const article = new Article(req.body);
      const existingArticle = await Article.findOne({ title: req.body.title });

      if (existingArticle) {
          return res.status(409).json({ error: 'The title already exists' });
      }

      await article.save();
      res.status(201).json(req.body);
  } catch (error) {
      console.error('Error saving article:', error);
      res.status(500).json({
          message: 'An error occurred while saving the article.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/image', async (req, res) => {
  try {
      const image = new Image(req.body);
      await image.save();
      res.status(201).json(req.body);
  } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({
          message: 'An error occurred while saving the image.',
          error: error.message || 'Unknown error'
      });
  }
});

app.post('/admin/imageArray', async (req, res) => {
  try {
      if (!Array.isArray(req.body)) {
          return res.status(400).json({ error: 'Expected an array of images' });
      }

      await Image.deleteMany({});
      const images = await Image.insertMany(req.body);
      res.status(201).json(images);
  } catch (error) {
      console.error('Error saving images:', error);
      res.status(500).json({
          message: 'An error occurred while saving images.',
          error: error.message || 'Unknown error'
      });
  }
});

  
app.post('/admin/review', async (req, res) => {
  try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(req.body);
  } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({
          message: 'An error occurred while saving the review.',
          error: error.message || 'Unknown error'
      });
  }
});


app.put('/admin/review', async (req, res) => {
  try {
      const { CODE } = req.body;

      if (!CODE) {
          return res.status(400).json({ error: 'CODE is required' });
      }

      const updatedReview = await Review.findOneAndUpdate(
          { CODE: CODE },
          req.body,
          { new: true, upsert: true }
      );

      res.status(200).json(updatedReview);
  } catch (error) {
      console.error('Error saving or updating review:', error);
      res.status(500).json({
          message: 'An error occurred while saving or updating the review.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/videoGallery', async (req, res) => {
  try {
      const { LANGUAGE } = req.body;  
      const filter = LANGUAGE ? { LANGUAGE } : {};  
      
      await VideoGallery.deleteMany(filter); // Deletes existing videoGallery for the specified language
      
      const videoGallery = new VideoGallery(req.body);
      await videoGallery.save();
      
      res.status(201).json(req.body); // Respond with the saved videoGallery data
  } catch (error) {
      console.error('Error saving videoGallery:', error);
      res.status(500).json({
          message: 'An error occurred while saving the video gallery.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/photoGallery', async (req, res) => {
  try {
      const { LANGUAGE } = req.body;  
      const filter = LANGUAGE ? { LANGUAGE } : {};  
      
      await PhotoGallery.deleteMany(filter); 
      
      const photoGallery = new PhotoGallery(req.body);
      await photoGallery.save();
      
      res.status(201).json(req.body); 
  } catch (error) {
      console.error('Error saving photoGallery:', error);
      res.status(500).json({
          message: 'An error occurred while saving the photo gallery.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/contactus', async (req, res) => {
  try {
      const { LANGUAGE } = req.body;  
      const filter = LANGUAGE ? { LANGUAGE } : {};  
      
      await ContactUs.deleteMany(filter); // Deletes existing contactUs for the specified language
      
      const contactUs = new ContactUs(req.body);
      await contactUs.save();
      
      res.status(201).json(req.body); // Respond with the saved contactUs data
  } catch (error) {
      console.error('Error saving contactUs:', error);
      res.status(500).json({
          message: 'An error occurred while saving the contact information.',
          error: error.message || 'Unknown error'
      });
  }
});


app.post('/admin/aboutUs', async (req, res) => {
  try {
      const { LANGUAGE } = req.body;  
      const filter = LANGUAGE ? { LANGUAGE } : {};  
      
      await AboutUs.deleteMany(filter); // Deletes existing aboutUs for the specified language
      
      const aboutUs = new AboutUs(req.body);
      await aboutUs.save();
      
      res.status(201).json(req.body); // Respond with the saved aboutUs data
  } catch (error) {
      console.error('Error saving aboutUs:', error);
      res.status(500).json({
          message: 'An error occurred while saving the about us information.',
          error: error.message || 'Unknown error'
      });
  }
});




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
  const subjectForUs = `Nueva solicitud de información de: ${clientName}`;

  try {
      // Set message and subject based on the language
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
      } else {
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

      // Send emails
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
      console.error('Error al enviar correo:', error);
      res.status(500).json({ message: 'Error al enviar correo', details: error.message });
  }
});


app.listen(port, () => console.log('API corriendo en http://localhost:' + port));
