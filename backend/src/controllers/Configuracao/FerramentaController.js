const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const ferramenta = await connection('ferramenta')
        .join('usuario', 'usuario.id', '=', 'ferramenta.usuarioid')   
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'ferramenta.*',
            'usuario.nome'
        ]);
    
        return response.json(ferramenta);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const ferramenta = await connection('ferramenta')
            .where('ferramenta.id', id)
            .join('usuario', 'usuario.id', '=', 'ferramenta.usuarioid')   
            .select([
                'ferramenta.*',
                'usuario.nome'
            ])
            .first();
    
        return response.json(ferramenta);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { codferramenta, descferramenta, ativo } = request.body;
        
        const [id] = await connection('ferramenta').insert({
            codferramenta,
            descferramenta, 
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
        
        const { codferramenta, descferramenta, ativo } = request.body;

        await connection('ferramenta').where('id', id).update({
            codferramenta,
            descferramenta, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('ferramenta').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};