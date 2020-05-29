const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const adiantamentoos = await connection('adiantamentoos')
        .join('ordemservico', 'ordemservico.id', '=', 'adiantamentoos.ordemservicoid')
        .join('usuario', 'usuario.id', '=', 'adiantamentoos.usuarioid')
        .join('statusadiantamento', 'statusadiantamento.id', '=', 'adiantamentoos.statusadiantamentoid')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'adiantamentoos.*', 
            'ordemservico.numeroos',
            'statusadiantamento.status',
            'usuario.nome'        
        ]);
    
        return response.json(adiantamentoos);
    },

    async getById (request, response) {
        const  { id }  = request.params;
        const adiantamentoos = await connection('adiantamentoos')
            .where('adiantamentoos.id', id)
            .join('ordemservico', 'ordemservico.id', '=', 'adiantamentoos.ordemservicoid')
            .join('usuario', 'usuario.id', '=', 'adiantamentoos.usuarioid')
            .join('statusadiantamento', 'statusadiantamento.id', '=', 'adiantamentoos.statusadiantamentoid')
            .select([
                'adiantamentoos.*', 
                'ordemservico.numeroos',
                'statusadiantamento.status',
                'usuario.nome'        
            ])
            .first();
    
        return response.json(adiantamentoos);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { ordemservicoid, valoradiantamento, dataadiantamento,
                dataquitacao, statusadiantamentoid, ativo } = request.body;
        
        const [id] = await connection('adiantamentoos').insert({
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { ordemservicoid, valoradiantamento, dataadiantamento,
            dataquitacao, statusadiantamentoid, ativo } = request.body;

        await connection('adiantamentoos').where('id', id).update({
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('adiantamentoos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};