import express from 'express';
import AnswerControllers from './controllers/AnswerControllers';
import NpsControllers from './controllers/NpsControllers';
import SendMailControllers from './controllers/SendMailControllers';
import SurveysControllers from './controllers/SurveysControllers';
import UsersControllers from './controllers/UsersControlers';

const routes = express.Router();
const usersControlers = new UsersControllers();
const surveysControllers = new SurveysControllers();
const sendMailControllers = new SendMailControllers();
const answerControllers = new AnswerControllers();
const npsControllers = new NpsControllers();

routes.post('/users', usersControlers.create);

routes.post('/survey', surveysControllers.create);
routes.get('/surveyAll', surveysControllers.show);

routes.post('/sendMail', sendMailControllers.execute);

routes.get('/answers/:value', answerControllers.execute);

routes.get('/nps/:survey_id', npsControllers.execute);


export default routes;
