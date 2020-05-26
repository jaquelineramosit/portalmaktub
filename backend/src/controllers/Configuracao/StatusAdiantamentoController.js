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

        const { status, descstatus, ativo } = request.body;
        
        const [id] = await connection('statusadiantamento').insert({
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

        await connection('statusadiantamento').where('id', id).update({
            status,
            descstatus, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};