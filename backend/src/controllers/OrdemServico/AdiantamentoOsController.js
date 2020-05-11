const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const adiantamentoos = await connection('adiantamentoos').select('*');
    
        return response.json(adiantamentoos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const adiantamentoos = await connection('adiantamentoos')
            .where('id', id)
            .select()
            .first();
    
        return response.json(adiantamentoos);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { ordemservicoid, valoradiantamento, dataadiantamento,
                dataquitacao, statusadiantamentoid, ativo } = request.body;
        
        const [id] = await connection('adiantamentoos').insert({
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { ordemservicoid, valoradiantamento, dataadiantamento,
            dataquitacao, statusadiantamentoid, ativo } = request.body;

        await connection('adiantamentoos').where('id', id).update({
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
};