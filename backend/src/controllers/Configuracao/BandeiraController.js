const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const bandeira = await connection('bandeira')
        .join('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
        .select([
            'bandeira.*', 
            'usuario.nome'
        ]);
        
        return response.json(bandeira);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const bandeira = await connection('bandeira')
            .where('bandeira.id', id)
            .join('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
            .select([
                'bandeira.*', 
                'usuario.nome'
            ])
            .first();
    
        return response.json(bandeira);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nomebandeira, ativo } = request.body;
        
        const [id] = await connection('bandeira').insert({            
            nomebandeira, 
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
        
        const { nomebandeira, ativo } = request.body;

        await connection('bandeira').where('id', id).update({            
            nomebandeira, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};