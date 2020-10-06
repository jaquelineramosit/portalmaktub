const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const tipoconta = await connection('tipoconta')
                .select('*')
                .orderBy('tipoconta.nometipoconta', 'asc');
            return response.status(200).json(tipoconta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const tipoconta = await connection('tipoconta')
                .where('id', id)
                .select()
                .first();

            return response.status(200).json(tipoconta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { nometipoconta, ativo } = request.body;

            const [id] = await connection('tipoconta').insert({
                nometipoconta,
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

            const { nometipoconta, ativo } = request.body;

            await connection('tipoconta').where('id', id).update({
                nometipoconta,
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

        const [count] = await connection('tipoconta').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};