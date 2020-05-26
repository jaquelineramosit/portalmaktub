const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tipoprojetotecnico = await connection('tipoprojetotecnico')
        .join('tecnico', 'tecnico.id', '=', 'tipoprojetotecnico.tecnicoid') 
        .join('tipoprojeto', 'tipoprojeto.id', '=', 'tipoprojetotecnico.tipoprojetoid') 
        .join('usuario', 'usuario.id', '=', 'tipoprojetotecnico.usuarioid')   
        .select([
            'tipoprojetotecnico.*',
            'tipoprojeto.nometipoprojeto',
            'tecnico.nometecnico',
            'usuario.nome'
        ]);
    
        return response.json(tipoprojetotecnico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tipoprojetotecnico = await connection('tipoprojetotecnico')
            .where('tipoprojetotecnico.id', id)
            .join('tecnico', 'tecnico.id', '=', 'tipoprojetotecnico.tecnicoid') 
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'tipoprojetotecnico.tipoprojetoid') 
            .join('usuario', 'usuario.id', '=', 'tipoprojetotecnico.usuarioid')   
            .select([
                'tipoprojetotecnico.*',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome'
            ])
            .first();
    
        return response.json(tipoprojetotecnico);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { tecnicoid, tipoprojetoid, ativo } = request.body;
        
        const [id] = await connection('tipoprojetotecnico').insert({
            tecnicoid,
            tipoprojetoid, 
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
        
        const { tecnicoid, tipoprojetoid, ativo } = request.body;

        await connection('tipoprojetotecnico').where('id', id).update({
            tecnicoid,
            tipoprojetoid, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};