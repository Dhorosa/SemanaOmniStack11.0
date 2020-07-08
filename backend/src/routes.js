const express = require('express');
const {celebrate, Segments, Joi } = require('celebrate');

const crypto = require("crypto");



const ongcontroller = require('./controllers/ongcontroller');
const incidentscontroller = require('./controllers/incidentscontroller');

const ProfileController = require('./controllers/ProfileController');
const sessioncontroller = require('./controllers/sessioncontroller');


const routes = express.Router();

/**Listagem de ongs */
routes.get('/ongs', ongcontroller.index);

/** Método de Cadastro de Ongs */
routes.post('/ongs', celebrate({
     [Segments.BODY]:Joi.object().keys({
        name:Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , ongcontroller.create);

routes.post('/incidents', incidentscontroller.create);

routes.post('/session', sessioncontroller.create);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentscontroller.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(), 
    }),

}), incidentscontroller.delete);

module.exports = routes;