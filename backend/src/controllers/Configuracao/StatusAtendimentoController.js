const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const statusatendimento = await connection('statusatendimento').select('*');
    
        return response.json(statusatendimento);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const statusatendimento = await connection('statusatendimento')
            .where('id', id)
            .select()
            .first();
    
        return response.json(statusatendimento);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statusatendimento').insert({
            status,
            descstatus,            
            ativo,
            dataultmodif,
            usuarioid
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { status, descstatus, ativo } = request.body;

        await connection('statusatendimento').where('id', id).update({
            status,
            descstatus,             
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};