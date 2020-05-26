const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const disponibilidadetecnico = await connection('disponibilidadetecnico')        
        .join('disponibilidade', 'disponibilidade.id', '=', 'disponibilidadetecnico.disponibilidadeId')   
        .join('tecnico', 'tecnico.id', '=', 'disponibilidadetecnico.tecnicoId')   
        .join('usuario', 'usuario.id', '=', 'disponibilidadetecnico.usuarioid')
        .select([
            'disponibilidadetecnico.*',
            'tecnico.nometecnico',
            'disponibilidade.nomedisponibilidade',
            'usuario.nome'
        ]);
    
        return response.json(disponibilidadetecnico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const disponibilidadetecnico = await connection('disponibilidadetecnico')
            .where('disponibilidadetecnico.id', id)
            .join('disponibilidade', 'disponibilidade.id', '=', 'disponibilidadetecnico.disponibilidadeId')   
            .join('tecnico', 'tecnico.id', '=', 'disponibilidadetecnico.tecnicoId')   
            .join('usuario', 'usuario.id', '=', 'disponibilidadetecnico.usuarioid')
            .select([
                'disponibilidadetecnico.*',
                'tecnico.nometecnico',
                'disponibilidade.nomedisponibilidade',
                'usuario.nome'
            ])
            .first();
    
        return response.json(disponibilidadetecnico);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { disponibilidadeId, tecnicoId, ativo } = request.body;
        
        const [id] = await connection('disponibilidadetecnico').insert({            
            disponibilidadeId,
            tecnicoId,
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
        
        const { disponibilidadeId, tecnicoId, ativo } = request.body;

        await connection('disponibilidadetecnico').where('id', id).update({            
            disponibilidadeId,
            tecnicoId,
            ativo,
            usuarioId,
            dataultmodif
        });           

        return response.status(204).send();
    },
};