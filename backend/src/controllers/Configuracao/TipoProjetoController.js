const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tipoprojeto = await connection('tipoprojeto').select('*');
    
        return response.json(tipoprojeto);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tipoprojeto = await connection('tipoprojeto')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tipoprojeto);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nometipoprojeto, receita, despesa, horas, valorhoracobrado, valorhoratecnico, ativo } = request.body;
        
        const [id] = await connection('tipoprojeto').insert({            
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoracobrado,
            valorhoratecnico,
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
        
        const { nometipoprojeto, receita, despesa, horas, valorhoracobrado, valorhoratecnico, ativo } = request.body;

        await connection('tipoprojeto').where('id', id).update({            
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoracobrado,
            valorhoratecnico,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
};