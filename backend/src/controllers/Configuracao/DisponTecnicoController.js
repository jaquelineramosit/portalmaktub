const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const disponibilidadetecnico = await connection('disponibilidadetecnico')
        .select('*')   
        return response.json(disponibilidadetecnico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const disponibilidadetecnico = await connection('disponibilidadetecnico')
            .where('id', id)
            .select()
            .first();
        return response.json(disponibilidadetecnico);
    },

    async getByTecnicosId (request, response) {
        const  {tecnicoId}  = request.params;
        const disponibilidade = await connection('disponibilidade')
        .whereRaw(
            `disponibilidade.id IN (SELECT disponibilidadeid FROM disponibilidadetecnico WHERE tecnicoId = ${tecnicoId})`
        ) 
            .select([
                'disponibilidade.*'                
            ]);
        return response.json(disponibilidade);      
    },
   
    async getBydisponibilidadesDisponiveis (request, response) {
        const  { tecnicoId }  = request.params;
        const disponibilidade = await connection('disponibilidade')
            .whereRaw(
                `disponibilidade.id NOT IN (SELECT disponibilidadeid FROM disponibilidadetecnico WHERE tecnicoId = ${tecnicoId})`
            )
            .select([
                'disponibilidade.*'
            ]);
    
        return response.json(disponibilidade);
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
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { disponibilidadeId, tecnicoId,ativo } = request.body;

        await connection('disponibilidadetecnico').where('id', id).update({            
            disponibilidadeId,
            tecnicoId,
            ativo,
            usuarioId,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('disponibilidadetecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};