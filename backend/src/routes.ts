import express from 'express';
import SurveysControllers from './controllers/SurveysControllers';
import UsersControllers from './controllers/UsersControlers';

const routes = express.Router();
const usersControlers = new UsersControllers();
const surveysControllers = new SurveysControllers();

routes.post('/users', usersControlers.create);

routes.post('/survey', surveysControllers.create);
routes.get('/surveyAll', surveysControllers.show);


export default routes;
