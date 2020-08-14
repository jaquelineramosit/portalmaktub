const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const clientebandeira = await connection('clientebandeira')
        .select('*')   
        return response.json(clientebandeira);
    },

    async getById (request, response) {
        const  { id }  = request.params;
        const clientebandeira = await connection('clientebandeira')
            .where('id', id)
            .select()
            .first();
           
    
        return response.json(clientebandeira);
    },

    async getByClienteId (request, response) {
        const  { clienteId }  = request.params;
        console.log(clienteId)
        const bandeira = await connection('bandeira')
        .whereRaw(
            `bandeira.id IN (SELECT bandeiraid FROM clientebandeira WHERE clienteId = ${clienteId})`
        ) 
            .select([
                'bandeira.*'                
            ]);
    
        return response.json(bandeira);
    },

    async getBybandeirasDisponiveis (request, response) {
        const  { clienteId }  = request.params;
        const bandeira = await connection('bandeira')
            .whereRaw(
                `bandeira.id NOT IN (SELECT bandeiraid FROM clientebandeira WHERE clienteId = ${clienteId})`
            )
            .select([
                'bandeira.*'
            ]);
    
        return response.json(bandeira);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { bandeiraid, clienteid } = request.body;
        
        const [id] = await connection('clientebandeira').insert({            
            bandeiraid,
            clienteid,
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
        
        const { bandeiraid, clienteid } = request.body;

        await connection('clientebandeira').where('id', id).update({            
            bandeiraid,
            clienteid,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('clientebandeira').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};