const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const movimentacaooslog = await connection('movimentacaooslog')
                .join('movimentacaoos', 'movimentacaoos.id', '=', 'movimentacaooslog.movimentacaoosid')
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaooslog.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaooslog.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaooslog.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaooslog.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaooslog.usuarioid')
                .select([
                    'movimentacaooslog.*',
                    'movimentacaooslog.movimentacaoosid',
                    'ordemservico.numeroos',
                    'statusatendimento.status as statusAtendimento',
                    'statuspagamento.status as statusPagamento',
                    'statuscobranca.status as statusCobranca',
                    'usuario.nome',
                    'usuario.sobrenome',
                ]);

            return response.status(200).json(movimentacaooslog);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const movimentacaooslog = await connection('movimentacaooslog')
                .where('movimentacaooslog.id', id)
                .join('movimentacaoos', 'movimentacaoos.id', '=', 'movimentacaooslog.movimentacaoosid')
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaooslog.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaooslog.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaooslog.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaooslog.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaooslog.usuarioid')
                .select([
                    'movimentacaooslog.*',
                    'movimentacaooslog.movimentacaoosid',
                    'ordemservico.numeroos',
                    'statusatendimento.status as statusAtendimento',
                    'statuspagamento.status as statusPagamento',
                    'statuscobranca.status as statusCobranca',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(movimentacaooslog);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAllByOsId(request, response) {
        try {
            const { ordemservicoId } = request.params;

            const movimentacaooslog = await connection('movimentacaooslog')
                .where('movimentacaooslog.ordemservicoid', ordemservicoId)
                .join('movimentacaoos', 'movimentacaoos.id', '=', 'movimentacaooslog.movimentacaoosid')
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaooslog.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaooslog.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaooslog.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaooslog.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaooslog.usuarioid')
                .select([
                    'movimentacaooslog.*',
                    'movimentacaooslog.movimentacaoosid',
                    'ordemservico.numeroos',
                    'statusatendimento.status as statusAtendimento',
                    'statuspagamento.status as statusPagamento',
                    'statuscobranca.status as statusCobranca',
                    'usuario.nome'
                ]);

            return response.status(200).json(movimentacaooslog);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },


    async create(request, response) {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { movimentacaoosid, ordemservicoid, statusatendimentoid, statuspagamentoid,
            statuscobrancaid, observacao, ativo } = request.body;

        const [id] = await connection('movimentacaooslog').insert({
            movimentacaoosid,
            ordemservicoid,
            statusatendimentoid,
            statuspagamentoid,
            statuscobrancaid,
            observacao,
            ativo,
            usuarioid,
            dataultmodif
        })

        return response.status(200).json({ id });
    },
    catch (err) {
        return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
    }
};