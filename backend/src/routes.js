const express = require('express');

const RegisterController = require('./controllers/RegisterController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.get('/list', RegisterController.index);
routes.get('/register', RegisterController.index);
routes.get('/register/:id', RegisterController.indexId);
routes.post('/register', RegisterController.create);
routes.put('/register/:id', RegisterController.update);
routes.delete('/register/:id', RegisterController.delete);

routes.post('/auth', AuthController.create);

module.exports = routes;