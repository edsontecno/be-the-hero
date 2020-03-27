const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('../src/controller/OngController');
const IncidenteController = require('../src/controller/IncidenteController');
const SessionController = require('../src/controller/SessionController');

const routes = express.Router();

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);
routes.get('/ongs', OngController.list);

routes.post('/incidents', IncidenteController.create);
routes.get('/incidents', IncidenteController.list);
routes.get('/incidents/listOng', IncidenteController.listForOng);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidenteController.delete);

routes.post('/login',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

module.exports = routes;