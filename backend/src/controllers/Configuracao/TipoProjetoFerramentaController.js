const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const tipoprojetoferramenta = await connection('tipoprojetoferramenta')

                .join('usuario', 'usuario.id', '=', 'tipoprojetoferramenta.usuarioid')
                .join('tipoprojeto', 'tipoprojeto.id', '=', 'tipoprojetoferramenta.tipoprojetoid')
                .join('ferramenta', 'ferramenta.id', '=', 'tipoprojetoferramenta.ferramentaid')
                .select([
                    'tipoprojetoferramenta.*',
                    'tipoprojeto.nometipoprojeto',
                    'ferramenta.codferramenta',
                    'usuario.nome'
                ])
            return response.status(200).json(tipoprojetoferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const tipoprojetoferramenta = await connection('tipoprojetoferramenta')
                .where('tipoprojetoferramenta.id', id)
                .join('usuario', 'usuario.id', '=', 'tipoprojetoferramenta.usuarioid')
                .join('tipoprojeto', 'tipoprojeto.id', '=', 'tipoprojetoferramenta.tipoprojetoid')
                .join('ferramenta', 'ferramenta.id', '=', 'tipoprojetoferramenta.ferramentaid')
                .select([
                    'tipoprojetoferramenta.*',
                    'tipoprojeto.nometipoprojeto',
                    'ferramenta.codferramenta',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(tipoprojetoferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByTipoProjetoId(request, response) {
        try {
            const { tipoProjetoId } = request.params;
            const ferramenta = await connection('ferramenta')
                .whereRaw(
                    `ferramenta.id IN (SELECT ferramentaid FROM tipoprojetoferramenta WHERE tipoprojetoid = ${tipoProjetoId})`
                )
                .select([
                    'ferramenta.*'
                ]);

            return response.status(200).json(ferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByFerramentasDisponiveis(request, response) {
        try {
            const { tipoProjetoId } = request.params;

            const ferramenta = await connection('ferramenta')
                .whereRaw(
                    `ferramenta.id NOT IN (SELECT ferramentaid FROM tipoprojetoferramenta WHERE tipoprojetoid = ${tipoProjetoId})`
                )
                .select([
                    'ferramenta.*'
                ]);

            return response.status(200).json(ferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { ferramentaid, tipoprojetoid, observacao, ativo } = request.body;

            const [id] = await connection('tipoprojetoferramenta').insert({
                ferramentaid,
                tipoprojetoid,
                observacao,
                ativo,
                usuarioid,
                dataultmodif,
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

            const { ferramentaid, tipoprojetoid, observacao, ativo } = request.body;

            await connection('tipoprojetoferramenta').where('id', id).update({
                ferramentaid,
                tipoprojetoid,
                observacao,
                ativo,
                usuarioid,
                dataultmodif,
            });

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('tipoprojetoferramenta').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};