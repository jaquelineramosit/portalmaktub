const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const statusatendimento = await connection('statusatendimento')
        .join('usuario', 'usuario.id', '=', 'statusatendimento.usuarioid')   
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao    
        .select([
            'statusatendimento.*',            
            'usuario.nome'
        ]);
    
        return response.json(statusatendimento);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const statusatendimento = await connection('statusatendimento')
            .where('statusatendimento.id', id)
            .join('usuario', 'usuario.id', '=', 'statusatendimento.usuarioid')   
            .select([
                'statusatendimento.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(statusatendimento);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statusatendimento').insert({
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

        await connection('statusatendimento').where('id', id).update({
            status,
            descstatus,             
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('statusadiantamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};