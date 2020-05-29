const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const tipoconta = await connection('tipoconta')
        .select('*')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20); //paginacao    
    
        return response.json(tipoconta);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tipoconta = await connection('tipoconta')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tipoconta);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nometipoconta, ativo } = request.body;
        
        const [id] = await connection('tipoconta').insert({            
            nometipoconta, 
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
        
        const { nometipoconta, ativo } = request.body;

        await connection('tipoconta').where('id', id).update({
            codtipoconta,
            nometipoconta, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('tipoconta').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};