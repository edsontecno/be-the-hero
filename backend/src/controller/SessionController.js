const connection = require('../database/connections');

class SessionController {

    async create(request, response){
        const {ong_id } = request.body;
        const ong = await  connection('ongs').where('id', ong_id).select('name').first();

        if(!ong){
            return response.status(400).json({error: 'Ong não encontrado'});
        }
    
        return response.json(ong);
    }


}

module.exports = new SessionController();
