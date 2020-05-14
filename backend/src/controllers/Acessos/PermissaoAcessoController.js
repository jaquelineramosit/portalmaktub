const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const acessopagina = await connection('permissaoacesso').select('*');
    
        return response.json(acessopagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const acessopagina = await connection('permissaoacesso')
            .where('id', id)
            .select()
            .first();
    
        return response.json(acessopagina);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;        
        const  dataUltModif = getDate();

        const {perfilacessoid, moduloid, paginaid, subpaginaid, funcaoid, ativo } = request.body;
        
        const [id] = await connection('permissaoacesso').insert({    
                perfilacessoid,
                moduloid,
                paginaid,
                subpaginaid,
                funcaoid,
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

            const {perfilacessoId, moduloId, paginaId, descricao, ativo } = request.body;
    
            await connection('acessopagina').where('id', id).update({                
                perfilacessoId,
                moduloId,
                paginaId,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };