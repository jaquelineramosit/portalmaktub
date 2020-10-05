const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const tipotecnico = await connection('tipotecnico')
                .select('*')
                .orderBy('tipotecnico.nometipotecnico', 'asc');
            return response.status(200).json(tipotecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },
    async getById(request, response) {
        try {
            const { id } = request.params;

            const tipotecnico = await connection('tipotecnico')
                .where('id', id)
                .select()
                .first();
            return response.status(200).json(tipotecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { nometipotecnico, desctipotecnico, ativo } = request.body;

            const [id] = await connection('tipotecnico').insert({
                nometipotecnico,
                desctipotecnico,
                ativo,
                dataultmodif,
                usuarioid
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

            const { nometipotecnico, desctipotecnico, ativo } = request.body;

            await connection('tipotecnico').where('id', id).update({
                nometipotecnico,
                desctipotecnico,
                ativo,
                dataultmodif,
                usuarioid
            });
            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('tipotecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};