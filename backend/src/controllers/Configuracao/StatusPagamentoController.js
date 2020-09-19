const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const statuspagamento = await connection('statuspagamento')
        .select('*')
        return response.json(statuspagamento);
    },

    async getByStatus (request, response) {
        const  { codstatus }  = request.params;

        const statuspagamento = await connection('statuspagamento')
            .where('statuspagamento.codstatus,', codstatus)
            .join('usuario', 'usuario.id', '=', 'statuspagamento.usuarioid')   
            .select([
                'statuspagamento.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(statuspagamento);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const statuspagamento = await connection('statuspagamento')
            .where('id', id)
            .select()
            .first();
    
        return response.json(statuspagamento);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { codstatus, status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statuspagamento').insert({
            codstatus,
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
        
        const { codstatus, status, descstatus, ativo } = request.body;

        await connection('statuspagamento').where('id', id).update({
            codstatus,
            status,
            descstatus,             
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
    
    async getCount (request,response) {        

        const [count] = await connection('statuspagamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};