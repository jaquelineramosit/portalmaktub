const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const movimentacaoos = await connection('movimentacaoos')
        .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
        .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
        .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
        .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
        .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
        .select([
            'movimentacaoos.*',
            'ordemservico.numeroos',
            'statusatendimento.status',
            'statuspagamento.status ',
            'statuscobranca.status',
            'usuario.nome'
        ]);
    
        return response.json(movimentacaoos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const movimentacaoos = await connection('movimentacaoos')
            .where('movimentacaoos.id', id)
            .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
            .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
            .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
            .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
            .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
            .select([
                'movimentacaoos.*',
                'ordemservico.numeroos',
                'statusatendimento.status',
                'statuspagamento.status',
                'statuscobranca.status',
                'usuario.nome'
            ])            
            .first();
    
        return response.json(movimentacaoos);
    },

    async getByOrdemServicoId (request, response) {
        const  { ordemservicoId }  = request.params;

        const movimentacaoos = await connection('movimentacaoos')
            .where('movimentacaoos.ordemservico', ordemservicoId)
            .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
            .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
            .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
            .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
            .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
            .select([
                'movimentacaoos.*',
                'ordemservico.numeroos',
                'statusatendimento.status',
                'statuspagamento.status',
                'statuscobranca.status',
                'usuario.nome'
            ])            
            .first();
    
        return response.json(movimentacaoos);
    },

    async getAllListaOS (request, response) {
        const  { ordemservicoId }  = request.params;

        const movimentacaoos = await connection('movimentacaoos')
        .whereRaw(
            `movimentacaoos.id = (SELECT MAX(id) FROM movimentacaoos AS mos WHERE mos.ordemservicoid = movimentacaoos.ordemservicoid)`
        )
        .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
        .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
        .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
        .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
        .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
        .select([
            'ordemservico.*',            
            'statusatendimento.status as statusAtendimento',
            'statuspagamento.status as statusPagamento',
            'statuscobranca.status as statusCobranca',
            'usuario.nome'
        ])
        .orderBy('ordemservico.numeroos', 'desc')
                
        return response.json(movimentacaoos);
    },

    async getByOsId (request, response) {
        const  { ordemservicoId }  = request.params;

        const movimentacaoos = await connection('movimentacaoos')
        .where('movimentacaoos.ordemservicoid', ordemservicoId)
        .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
        .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
        .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
        .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
        .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
        .select([
            'movimentacaoos.*',
            'ordemservico.numeroos',
            'statusatendimento.status',
            'statuspagamento.status ',
            'statuscobranca.status',
            'usuario.nome'
        ]).orderBy('movimentacaoos.id', 'desc')
        .first();
    
        return response.json(movimentacaoos);
    },


    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { ordemservicoid, statusatendimentoid, statuspagamentoid,
                statuscobrancaid, observacao, ativo } = request.body;
        
        const [id] = await connection('movimentacaoos').insert({
            ordemservicoid,
            statusatendimentoid,
            statuspagamentoid,
            statuscobrancaid,
            observacao,
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
        const { ordemservicoid, statusatendimentoid, statuspagamentoid,
            statuscobrancaid, observacao, ativo } = request.body;

        await connection('movimentacaoos').where('ordemservicoid', id).update({
            ordemservicoid,
            statusatendimentoid,
            statuspagamentoid,
            statuscobrancaid,
            observacao,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('movimentacaoos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};