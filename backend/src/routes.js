const express = require('express');
const routes = express.Router();
const OngController = require('../src/controller/OngController');
const IncidenteController = require('../src/controller/IncidenteController');
const SessionController = require('../src/controller/SessionController');

routes.post('/ongs',OngController.create);
routes.get('/ongs', OngController.list);

routes.post('/incidents', IncidenteController.create);
routes.get('/incidents', IncidenteController.list);
routes.get('/incidents/listOng', IncidenteController.listForOng);
routes.delete('/incidents/:id', IncidenteController.delete);

routes.post('/login', SessionController.create);

module.exports = routes;