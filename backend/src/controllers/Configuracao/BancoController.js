const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const banco = await connection('banco')
        .join('usuario', 'usuario.id', '=', 'banco.usuarioid') 
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'banco.*', 
            'usuario.nome'
        ]);
    
        return response.json(banco);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const banco = await connection('banco')
            .where('banco.id', id)
            .join('usuario', 'usuario.id', '=', 'banco.usuarioid') 
            .select([
                'banco.*', 
                'usuario.nome'
            ])            
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
    async getCount (request,response) {        

        const [count] = await connection('banco').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};