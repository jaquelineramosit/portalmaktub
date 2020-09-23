const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const disponibilidadetecnico = await connection('disponibilidadetecnico')
                .select('*')
            return response.status(200).json(disponibilidadetecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const disponibilidadetecnico = await connection('disponibilidadetecnico')
                .where('id', id)
                .select()
                .first();
            return response.status(200).json(disponibilidadetecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByTecnicosId(request, response) {
        try {
            const { tecnicoId } = request.params;
            const disponibilidade = await connection('disponibilidade')
                .whereRaw(
                    `disponibilidade.id IN (SELECT disponibilidadeid FROM disponibilidadetecnico WHERE tecnicoId = ${tecnicoId})`
                )
                .select([
                    'disponibilidade.*'
                ]);
            return response.status(200).json(disponibilidade);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getBydisponibilidadesDisponiveis(request, response) {
        try {
            const { tecnicoId } = request.params;
            const disponibilidade = await connection('disponibilidade')
                .whereRaw(
                    `disponibilidade.id NOT IN (SELECT disponibilidadeid FROM disponibilidadetecnico WHERE tecnicoId = ${tecnicoId})`
                )
                .select([
                    'disponibilidade.*'
                ]);

            return response.status(200).json(disponibilidade);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataultmodif = getDate();

            const { disponibilidadeId, tecnicoId, ativo } = request.body;

            const [id] = await connection('disponibilidadetecnico').insert({
                disponibilidadeId,
                tecnicoId,
                ativo,
                usuarioId,
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

            const { disponibilidadeId, tecnicoId, ativo } = request.body;

            await connection('disponibilidadetecnico').where('id', id).update({
                disponibilidadeId,
                tecnicoId,
                ativo,
                usuarioId,
                dataultmodif
            });

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('disponibilidadetecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};