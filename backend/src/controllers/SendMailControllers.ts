import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
import SurveysRepository from "../repositories/SurveysRepository";
import SurveysUsers from "../repositories/SurveysUsersRepository";
import UsersRepository from "../repositories/UsersRepository";
import sendMailService from "../services/sendMailService";
import AppError from "../errors/AppError";

class SendMailControllers {
    async execute(request: Request, response: Response){
        const {
            email,
            survey_id
        } = request.body

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsers);

        // Verifying if user exists
        const userAlreadyExists =  await usersRepository.findOne({email});

        if(!userAlreadyExists){
            throw new AppError("User does not exists")
        }

        // Verifying if survey exists
        const surveysAlreadyExists = await surveysRepository.findOne({id: survey_id});

        if (!surveysAlreadyExists) {
            throw new AppError("Survey does not exists");
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id,value: null},
            relations: ["user", "survey"]
        })

        //Variables for email service
        const variables = {
            name: userAlreadyExists.name,
            title: surveysAlreadyExists.title,
            description: surveysAlreadyExists.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;

            await sendMailService.execute(email, variables.title, variables, npsPath);

            return response.json(surveyUserAlreadyExists);
        }


        //Created relation between users and surveys s
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);

        //Send E-mail
        variables.id = surveyUser.id;
        await sendMailService.execute(email, variables.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export default SendMailControllers;