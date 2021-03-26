import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import SurveysUsers from "../repositories/SurveysUsersRepository";

class AnswerControllers {
    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveysUsers);

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser){
            throw new AppError("Survey User does not exists");
        }

        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export default AnswerControllers;