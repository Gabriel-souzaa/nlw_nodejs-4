import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

class UsersControllers {
    async create(request: Request, response: Response){
        const {
            name,
            email
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "Usuário existente"
            })
        }

        const user = usersRepository.create({
            name,
            email
        })

        await usersRepository.save(user);

        return response.json(user)
    }
}

export default UsersControllers;