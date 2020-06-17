const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const perfilacesso = await connection('perfilacesso')
        .join('usuario', 'usuario.id', '=', 'perfilacesso.usuarioid')
        .select('perfilacesso.*', 'usuario.nome');
    
        return response.json(perfilacesso);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const perfilacesso = await connection('perfilacesso')
            .where('perfilacesso.id', id)
            .join('usuario', 'usuario.id', '=', 'perfilacesso.usuarioid')
            .select('perfilacesso.*', 'usuario.nome')
            .first();
    
        return response.json(perfilacesso);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;        
        const  dataultmodif = getDate();

        const {nomeperfil, descricao, ativo } = request.body;
        
        const [id] = await connection('perfilacesso').insert({                
            nomeperfil,
            descricao, 
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

            const {nomeperfil, descricao, ativo } = request.body;
    
            await connection('perfilacesso').where('id', id).update({                
                nomeperfil,
                descricao, 
                ativo,
                dataultmodif,
                usuarioid
            });           

            return response.status(204).send();
        },
        async getCount (request,response) {        

            const [count] = await connection('perfilacesso').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };