const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const bandeira = await connection('bandeira')
        .leftJoin('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
        .leftJoin('parceiro', 'parceiro.id', '=', 'bandeira.parceiroid') 
        .select([
            'bandeira.*', 
            'usuario.nome',
            'parceiro.nomeparceiro'
        ]);
        
        return response.json(bandeira);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const bandeira = await connection('bandeira')
            .where('bandeira.id', id)
            .leftJoin('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
            .leftJoin('parceiro', 'parceiro.id', '=', 'bandeira.parceiroid') 
            .select([
                'bandeira.*', 
                'usuario.nome',
                'parceiro.nomeparceiro'
            ])
            .first();
    
        return response.json(bandeira);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { parceiroid,nomebandeira, descricao, ativo } = request.body;
        
        const [id] = await connection('bandeira').insert({            
            parceiroid,
            nomebandeira, 
            descricao,
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
        
        const { parceiroid,nomebandeira, descricao, ativo } = request.body;

        await connection('bandeira').where('id', id).update({            
            parceiroid,
            nomebandeira, 
            descricao,
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('bandeira').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};