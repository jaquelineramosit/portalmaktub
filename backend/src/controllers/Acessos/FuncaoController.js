const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const funcao = await connection('funcao').select('*');
    
        return response.json(funcao);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const funcao = await connection('funcao')
            .where('id', id)
            .select()
            .first();
    
        return response.json(funcao);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const {subPaginaId, paginaId, nomefuncao, descricao, ativo } = request.body;
        
        const [id] = await connection('funcao').insert({
            subPaginaId,
            paginaId,
            nomefuncao,
            descricao, 
            ativo,
            dataUltModif,
            usuarioId
        })

        return response.json({ id });
    },
    
        async update (request, response) {
            const   { id }   = request.params;
            const  usuarioId  = request.headers.authorization;
            const  dataUltModif = getDate();
            const {subPaginaId, paginaId, nomefuncao, descricao, ativo } = request.body;
    
            await connection('funcao').where('id', id).update({
                subPaginaId,
                paginaId,
                nomefuncao,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };