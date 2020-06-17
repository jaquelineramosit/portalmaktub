const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tipotecnico = await connection('tipotecnico')
        .select('*')  
        return response.json(tipotecnico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tipotecnico = await connection('tipotecnico')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tipotecnico);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nometipotecnico, desctipotecnico, ativo } = request.body;
        
        const [id] = await connection('tipotecnico').insert({
            nometipotecnico, 
            desctipotecnico,
            ativo,
            dataultmodif,
            usuarioid
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const  { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { nometipotecnico, desctipotecnico, ativo } = request.body;

        await connection('tipotecnico').where('id', id).update({            
            nometipotecnico, 
            desctipotecnico,
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
        
    },
    async getCount (request,response) {        

        const [count] = await connection('tipotecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};