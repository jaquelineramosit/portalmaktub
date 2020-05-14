const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const movimentacaoos = await connection('movimentacaoos').select('*');
    
        return response.json(movimentacaoos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const movimentacaoos = await connection('movimentacaoos')
            .where('id', id)
            .select()
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
};