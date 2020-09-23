const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const movimentacaoos = await connection('movimentacaoos')
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
                .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .select([
                    'movimentacaoos.*',
                    'ordemservico.numeroos',
                    'clientefinal.nomeclientefinal',
                    'statusatendimento.status',
                    'statuspagamento.status ',
                    'statuscobranca.status',
                    'usuario.nome',
                    'tecnico.nometecnico'
                ]);

            return response.status(200).json(movimentacaoos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const movimentacaoos = await connection('movimentacaoos')
                .where('movimentacaoos.id', id)
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
                .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .select([
                    'movimentacaoos.*',
                    'ordemservico.numeroos',
                    'clientefinal.nomeclientefinal',
                    'statusatendimento.status',
                    'statuspagamento.status ',
                    'statuscobranca.status',
                    'usuario.nome',
                    'tecnico.nometecnico',
                ])
                .first();

            return response.status(200).json(movimentacaoos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByOrdemServicoId(request, response) {
        try {
            const { ordemservicoId } = request.params;

            const movimentacaoos = await connection('movimentacaoos')
                .where('movimentacaoos.ordemservico', ordemservicoId)
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .select([
                    'movimentacaoos.*',
                    'ordemservico.numeroos',
                    'statusatendimento.status',
                    'statuspagamento.status',
                    'statuscobranca.status',
                    'usuario.nome',
                    'tecnico.nometecnico',
                    'clientefinal.nomeclientefinal',
                ])
                .first();

            return response.status(200).json(movimentacaoos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAllListaOS(request, response) {
        try {
            const { ordemservicoId } = request.params;

            const movimentacaoos = await connection('movimentacaoos')
                .whereRaw(
                    `movimentacaoos.id = (SELECT MAX(id) FROM movimentacaoos AS mos WHERE mos.ordemservicoid = movimentacaoos.ordemservicoid)`
                )
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .select([
                    'ordemservico.*',
                    'statusatendimento.status as statusAtendimento',
                    'statuspagamento.status as statusPagamento',
                    'statuscobranca.status as statusCobranca',
                    'usuario.nome',
                    'tecnico.nometecnico',
                    'clientefinal.nomeclientefinal',
                ])
                .orderBy('ordemservico.numeroos', 'desc')

            return response.status(200).json(movimentacaoos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByOsId(request, response) {
        try {
            const { ordemservicoId } = request.params;

            const movimentacaoos = await connection('movimentacaoos')
                .where('movimentacaoos.ordemservicoid', ordemservicoId)
                .join('ordemservico', 'ordemservico.id', '=', 'movimentacaoos.ordemservicoid')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .join('statuspagamento', 'statuspagamento.id', '=', 'movimentacaoos.statuspagamentoid')
                .join('statuscobranca', 'statuscobranca.id', '=', 'movimentacaoos.statuscobrancaid')
                .join('usuario', 'usuario.id', '=', 'movimentacaoos.usuarioid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .select([
                    'movimentacaoos.*',
                    'ordemservico.numeroos',
                    'statusatendimento.status',
                    'statuspagamento.status ',
                    'statuscobranca.status',
                    'usuario.nome',
                    'tecnico.nometecnico',
                    'clientefinal.nomeclientefinal',
                ]).orderBy('movimentacaoos.id', 'desc')
                .first();

            return response.status(200).json(movimentacaoos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },


    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

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

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async update(request, response) {
        try {
            const { id } = request.params;
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();
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

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    
    async getCount(request, response) {

        const [count] = await connection('movimentacaoos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};