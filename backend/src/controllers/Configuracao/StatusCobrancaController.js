const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const statuscobranca = await connection('statuscobranca')
        .join('usuario', 'usuario.id', '=', 'statuscobranca.usuarioid')   
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao    
        .select([
            'statuscobranca.*',            
            'usuario.nome'
        ]);
    
        return response.json(statuscobranca);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const statuscobranca = await connection('statuscobranca')
            .where('statuscobranca.id', id)
            .join('usuario', 'usuario.id', '=', 'statuscobranca.usuarioid')   
            .select([
                'statuscobranca.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(statuscobranca);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statuscobranca').insert({
            status,
            descstatus,            
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
        
        const { status, descstatus, ativo } = request.body;

        await connection('statuscobranca').where('id', id).update({
            status,
            descstatus,             
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('statuscobranca').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
    
};