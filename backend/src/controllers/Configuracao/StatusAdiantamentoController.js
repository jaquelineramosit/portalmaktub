const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const statusadiantamento = await connection('statusadiantamento')
        .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')  
        .select([
            'statusadiantamento.*',            
            'usuario.nome'
        ]);
    
        return response.json(statusadiantamento);
    },

    async getByStatus (request, response) {
        const  { codstatus }  = request.params;

        const statusadiantamento = await connection('statusadiantamento')
            .where('statusadiantamento.codstatus,', codstatus)
            .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')   
            .select([
                'statusadiantamento.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(statusadiantamento);
    },

    async getAtivo (request, response) {
        const clientes = await connection('statusadiantamento')
        .where('ativo', 1)
        .select('*');
    
        return response.json(clientes);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const statusadiantamento = await connection('statusadiantamento')
            .where('statusadiantamento.id', id)
            .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')   
            .select([
                'statusadiantamento.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(statusadiantamento);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { codstatus, status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statusadiantamento').insert({
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

        await connection('statusadiantamento').where('id', id).update({
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

        const [count] = await connection('statusadiantamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};