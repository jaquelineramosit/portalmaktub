const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const parceiro = await connection('parceiro').select('*');
    
        return response.json(parceiro);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const parceiro = await connection('parceiro')
            .where('id', id)
            .select()
            .first();
    
        return response.json(parceiro);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nomeparceiro, descricao, ativo } = request.body;
        
        const [id] = await connection('parceiro').insert({
            nomeparceiro,
            descricao,
            ativo,
            usuarioId,
            dataultmodif
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { nomeparceiro, descricao, ativo } = request.body;

        await connection('parceiro').where('id', id).update({
            nomeparceiro,
            descricao,
            ativo,
            usuarioId,
            dataultmodif
        });           

        return response.status(204).send();
    },
};