const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const subpagina = await connection('subpagina').select('*');
    
        return response.json(subpagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const subpagina = await connection('subpagina')
            .where('id', id)
            .select()
            .first();
    
        return response.json(subpagina);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const {paginaid, nomesubpagina, descricao, ativo } = request.body;
        
        const [id] = await connection('subpagina').insert({
                paginaid,
                nomesubpagina,
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

        const {paginaid, nomesubpagina, descricao, ativo } = request.body;

        await connection('subpagina').where('id', id).update({
            paginaid,
            nomesubpagina,
            descricao, 
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};