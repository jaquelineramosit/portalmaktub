const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const parceiro = await connection('parceiro')
        .join('usuario', 'usuario.id', '=', 'parceiro.usuarioid')   
        .select([
            'parceiro.*',            
            'usuario.nome'
        ]);
    
        return response.json(parceiro);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const parceiro = await connection('parceiro')
            .where('parceiro.id', id)
            .join('usuario', 'usuario.id', '=', 'parceiro.usuarioid')   
            .select([
                'parceiro.*',            
                'usuario.nome'
            ])
            .first();
    
        return response.json(parceiro);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nomeparceiro, descricao, ativo } = request.body;
        
        const [id] = await connection('parceiro').insert({
            nomeparceiro,
            descricao,
            ativo,
            usuarioId,
            dataultmodif
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { nomeparceiro, descricao, ativo } = request.body;

        await connection('parceiro').where('id', id).update({
            nomeparceiro,
            descricao,
            ativo,
            usuarioId,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('parceiro').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};