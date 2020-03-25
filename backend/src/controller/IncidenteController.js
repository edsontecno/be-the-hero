const connection = require('../database/connections');

class OngController {

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id  = request.headers.authorization;
        
        const [id] = await  connection('incident').insert({title, description, value, ong_id });
    
        return response.json({ id });
    }

    async listForOng (request, response){
        const ong_id  = request.headers.authorization;

        const list  = await  connection('incident').where('ong_id', ong_id).select('*');

        return response.json(list);
    }

    async list (request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incident').count();

        const list  = await  connection('incident')
        .join('ongs', 'ong_id', '=', 'incident.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incident.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(list);
    }

    async delete (request, response){
        const {id} = request.params;
        const ong_id  = request.headers.authorization;

        const incident = await connection('incident')
            .where('id', id)
            .select('ong_id')
            .first();

        console.log(ong_id);

        if(incident.ong_id !== ong_id)    {
            return response.status(401).json({error: 'Operação não permitida'});
        }

        const list  = await  connection('incident').where('id', id).delete();

        return  response.status(204).send();
    }

}

module.exports = new OngController();
