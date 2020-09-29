const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const ferramenta = await connection('ferramenta')
                .join('usuario', 'usuario.id', '=', 'ferramenta.usuarioid')
                .select([
                    'ferramenta.*',
                    'usuario.nome'
                ]);
            return response.status(200).json(ferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const ferramenta = await connection('ferramenta')
                .where('ferramenta.id', id)
                .join('usuario', 'usuario.id', '=', 'ferramenta.usuarioid')
                .select([
                    'ferramenta.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(ferramenta);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },
    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { codferramenta, descferramenta, ativo } = request.body;

            const [id] = await connection('ferramenta').insert({
                codferramenta,
                descferramenta,
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

            const { codferramenta, descferramenta, ativo } = request.body;

            await connection('ferramenta').where('id', id).update({
                codferramenta,
                descferramenta,
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

        const [count] = await connection('ferramenta').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};