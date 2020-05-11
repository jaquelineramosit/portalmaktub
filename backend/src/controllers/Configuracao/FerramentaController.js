const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const ferramenta = await connection('ferramenta').select('*');
    
        return response.json(ferramenta);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const ferramenta = await connection('ferramenta')
            .where('id', id)
            .select()
            .first();
    
        return response.json(ferramenta);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { codferramenta, descferramenta, ativo } = request.body;
        
        const [id] = await connection('ferramenta').insert({
            codferramenta,
            descferramenta, 
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
        
        const { codferramenta, descferramenta, ativo } = request.body;

        await connection('ferramenta').where('id', id).update({
            codferramenta,
            descferramenta, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};