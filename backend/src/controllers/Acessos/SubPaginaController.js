const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const subpagina = await connection('subpagina')
        .join('pagina', 'pagina.id', '=', 'subpagina.paginaid')
        .join('usuario', 'usuario.id', '=', 'subpagina.usuarioid')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select(['subpagina.*', 'pagina.nomepagina', 'usuario.nome']);
    
        return response.json(subpagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const subpagina = await connection('subpagina')
            .where('subpagina.id', id)
            .join('pagina', 'pagina.id', '=', 'subpagina.paginaid')
            .join('usuario', 'usuario.id', '=', 'subpagina.usuarioid')
            .select(['subpagina.*', 'pagina.nomepagina', 'usuario.nome'])
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
    async getCount (request,response) {        

        const [count] = await connection('subpagina').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};