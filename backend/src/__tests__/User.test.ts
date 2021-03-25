import request from 'supertest';
import app from '../App';

import createConnection from '../database';

describe("User", () => {
    beforeAll(async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it('Shold be able to create a new user', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            email: "Gabriel@gmail.com",
            name: "Gabriel"
        })

        expect(response.status).toBe(201);
    })

    it('Shold not able to create a new user with exists email', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            email: "Gabriel@gmail.com",
            name: "Gabriel"
        })

        expect(response.status).toBe(400);
    })
})