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
        const { 
            responsavelId, atividade, descricao, clienteId, contatoId, tipoatividadeId, dataatividade,
            datainicio, datafim, temponotificacao, exibenotificacao, anexoId,  cancelada } = request.body;

        await connection('movimentacaoos').where('id', id).update({
            responsavelId,
            atividade,
            descricao,
            clienteId,
            contatoId,
            tipoatividadeId,
            dataatividade,
            datainicio,
            datafim,
            temponotificacao,
            exibenotificacao,
            anexoId,
            cancelada,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('movimentacaoos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};