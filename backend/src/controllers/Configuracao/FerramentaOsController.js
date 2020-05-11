const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const ferramentaos = await connection('ferramentaos').select('*');
    
        return response.json(ferramentaos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const ferramentaos = await connection('ferramentaos')
            .where('id', id)
            .select()
            .first();
    
        return response.json(ferramentaos);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { ferramentaid, ordemservicoid, observacao, ativo } = request.body;
        
        const [id] = await connection('ferramentaos').insert({
            ferramentaid,
            ordemservicoid,
            observacao, 
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
        
        const { ferramentaid, ordemservicoid, observacao, ativo } = request.body;

        await connection('ferramentaos').where('id', id).update({
            ferramentaid,
            ordemservicoid,
            observacao, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};