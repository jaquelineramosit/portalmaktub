const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const modulos = await connection('modulo').select('*');
    
        return response.json(modulos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const modulo = await connection('modulo')
            .where('id', id)
            .select()
            .first();
    
        return response.json(modulo);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomeModulo, descricao, ativo } = request.body;
        
        const [id] = await connection('modulo').insert({
                nomeModulo,
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
            const { nomeModulo, descricao, ativo } = request.body;
    
            await connection('modulo').where('id', id).update({
                nomeModulo,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };