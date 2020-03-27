const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');

describe('ONG', () =>{

    beforeEach( async () =>{
        await connection.migrate.rollbackcl();
        await connection.migrate.latest();
    });

    afterAll(async () =>{
        await connection.destroy();
    });

    it('Está apto para criar uma nova ong', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Minha ong",
            email: "ong@gmail.com",
            whatsapp: "61986543866",
            city: "Samambaia",
            uf: "DF"
        });
        console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    }); 
});