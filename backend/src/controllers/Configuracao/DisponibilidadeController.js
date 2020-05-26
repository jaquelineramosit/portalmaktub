const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const disponibilidade = await connection('disponibilidade')
        .join('usuario', 'usuario.id', '=', 'disponibilidade.usuarioid')   
        .select([
            'disponibilidade.*',
            'usuario.nome'
        ]);
    
        return response.json(disponibilidade);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const disponibilidade = await connection('disponibilidade')
            .where('disponibilidade.id', id)
            .join('usuario', 'usuario.id', '=', 'disponibilidade.usuarioid')   
            .select([
                'disponibilidade.*',
                'usuario.nome'
            ])
            .first();
    
        return response.json(disponibilidade);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nomedisponibilidade, descricao, ativo } = request.body;
        
        const [id] = await connection('disponibilidade').insert({            
            nomedisponibilidade,
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
        
        const { nomedisponibilidade, descricao, ativo } = request.body;

        await connection('disponibilidade').where('id', id).update({            
            nomedisponibilidade,
            descricao,
            ativo,
            usuarioId,
            dataultmodif
        });           

        return response.status(204).send();
    },
};