const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const tipoprojetotecnico = await connection('tipoprojetotecnico')
                .select('*')
            return response.status(200).json(tipoprojetotecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const tipoprojetotecnico = await connection('tipoprojetotecnico')
                .where('id', id)
                .select()
                .first();
            return response.status(200).json(tipoprojetotecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAllProjetosInTecnico(request, response) {
        try {
            const { tecnicoId } = request.params;
            const tipoprojeto = await connection('tipoprojeto')
                .whereRaw(
                    `tipoprojeto.id IN (SELECT tipoprojetoid FROM tipoprojetotecnico WHERE tecnicoId = ${tecnicoId})`
                )
                .select([
                    'tipoprojeto.*'
                ]);
            return response.status(200).json(tipoprojeto);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAllProjetosNotInTecnico(request, response) {
        try {
            const { tecnicoId } = request.params;
            const tipoprojeto = await connection('tipoprojeto')
                .whereRaw(
                    `tipoprojeto.id NOT IN (SELECT tipoprojetoid FROM tipoprojetotecnico WHERE tecnicoId = ${tecnicoId})`
                )
                .select([
                    'tipoprojeto.*'
                ]);
            return response.status(200).json(tipoprojeto);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },



    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { tipoprojetoid, tecnicoid } = request.body;

            const [id] = await connection('tipoprojetotecnico').insert({
                tipoprojetoid,
                tecnicoid,
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

            const { tipoprojetoid, tecnicoid } = request.body;

            await connection('tipoprojetotecnico').where('id', id).update({
                tipoprojetoid,
                tecnicoid,
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

        const [count] = await connection('tipoprojetotecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};