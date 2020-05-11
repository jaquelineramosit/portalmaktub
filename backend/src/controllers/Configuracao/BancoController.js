const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const banco = await connection('banco').select('*');
    
        return response.json(banco);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const banco = await connection('banco')
            .where('id', id)
            .select()
            .first();
    
        return response.json(banco);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { codbanco, nomebanco, ativo } = request.body;
        
        const [id] = await connection('banco').insert({
            codbanco,
            nomebanco, 
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
        
        const { codbanco, nomebanco, ativo } = request.body;

        await connection('banco').where('id', id).update({
            codbanco,
            nomebanco, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};