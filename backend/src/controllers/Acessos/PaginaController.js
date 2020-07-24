const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const paginas = await connection('pagina')
        .join('modulo', 'modulo.id', '=', 'pagina.moduloid')
        .join('usuario', 'usuario.id', '=', 'pagina.usuarioid') 
        .select(['pagina.*', 'modulo.nomemodulo', 'usuario.nome']);
    
        return response.json(paginas);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const pagina = await connection('pagina')
            .where('pagina.id', id)
            .join('modulo', 'modulo.id', '=', 'pagina.moduloid')
            .join('usuario', 'usuario.id', '=', 'pagina.usuarioid') 
            .select(['pagina.*', 'modulo.nomemodulo', 'usuario.nome'])
            .first();
    
        return response.json(pagina);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;        
        const  dataUltModif = getDate();

        const {moduloid, nomepagina, descricao, ativo } = request.body;
        
        const [id] = await connection('pagina').insert({
                moduloid,
                nomepagina,
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

            const {moduloid, nomepagina, descricao, ativo } = request.body;
    
            await connection('pagina').where('id', id).update({
                moduloid,
                nomepagina,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
        async getCount (request,response) {        

            const [count] = await connection('pagina').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };