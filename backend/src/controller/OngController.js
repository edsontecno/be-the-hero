const generateRandomId = require('../util/generateRandomId');
const connection = require('../database/connections');

class OngController {

    async create(request, response){
        const {name, email, whatsapp, city, uf } = request.body;
        const id = generateRandomId();
        
        await  connection('ongs').insert({id,name, email, whatsapp, city, uf });
    
        return response.json({ id });
    }

    async list (request, response){
        const list  = await  connection('ongs').select();

        return response.json(list);
    }

}

module.exports = new OngController();
