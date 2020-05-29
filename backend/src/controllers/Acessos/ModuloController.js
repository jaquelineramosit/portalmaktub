const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const modulos = await connection('modulo')
        .join('usuario', 'usuario.id', '=', 'modulo.usuarioid')  
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select(['modulo.*', 'usuario.nome']);
    
        return response.json(modulos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const modulo = await connection('modulo')
            .where('modulo.id', id)
            .join('usuario', 'usuario.id', '=', 'modulo.usuarioid')  
            .select(['modulo.*', 'usuario.nome'])
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
        async getCount (request,response) {        

            const [count] = await connection('modulo').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };