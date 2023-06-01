const express = require('express');
const imageToUri = require('image-to-uri');
const fs = require('fs');
const Plates = require('../models/Plates.js');
const createError = require('../utils/errors/create-error.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken.js');
const upload = require('../utils/middleware/file.middleware.js');

const platesRouter = express.Router();

platesRouter.get('/', async(req, res) => {
   try {
      const plates = await Plates.find().populate('ingredients');
      return res.status(200).json(plates);
  } catch(err) {
      next(err);
  }
});

platesRouter.get('/:id', async (request, response, next) => {
   try {
       const id = request.params.id;
       const allPlates = await Plates.findOne({ id: id});
       return response.status(200).json(allPlates);
   } catch (error) {
       next(error)
   }
});

platesRouter.post('/', async (req, res, next) => {
    try {
       
       const newPlates = new Plates({...req.body });
       const createPlates = await newPlates.save();
        
       return res.status(201).json(createPlates);
    } catch(err) {
       next(err);
    }
 });

platesRouter.put('/add-ingredients', async (req, res, next) => {
   try {
       const {platesId, ingredientsId} = req.body;
       if(!platesId) {
           return next(createError('Se necesita un id de un plato para poder añadir un ingrediente', 500))
       }
       if(!ingredientsId) {
           return next(createError('Se necesita un id de ingrediente para añadirlo a el plato', 500))
       }
       const addPlates = await Plates.findByIdAndUpdate(
           platesId,
           {$push: {ingredients: ingredientsId}},
           {new: true }
       );
       return res.status(200).json(addPlates);
   } catch(err) {
       next(err);
   }
});

platesRouter.put('/:id', async (req, res, next) => {
   try {
      const id = req.params.id;
      const modifiedPlates = new Plates({...req.body});
      modifiedPlates._id = id;
      const platesUpdate = await Plates.findByIdAndUpdate(
         id,
         modifiedPlates,
         {new: true}
      );
      return res.status(200).json(platesUpdate);
   }catch (err) {
      next(err);
   }
 });

platesRouter.delete('/:id', async (req, res, next) => {
   try{  
      const id = req.params.id;
      await Plates.findByIdAndDelete(id);
      return res.status(200).json('El plato se a eliminado correctamente.')
   } catch(err) {
      next(err);
   }
 });

module.exports = platesRouter;