const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const perfilacesso = await connection('perfilacesso')
                .join('usuario', 'usuario.id', '=', 'perfilacesso.usuarioid')
                .select('perfilacesso.*', 'usuario.nome');

            return response.status(200).json(perfilacesso);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const perfilacesso = await connection('perfilacesso')
                .where('perfilacesso.id', id)
                .join('usuario', 'usuario.id', '=', 'perfilacesso.usuarioid')
                .select('perfilacesso.*', 'usuario.nome')
                .first();

            return response.status(200).json(perfilacesso);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { nomeperfil, descricao, ativo } = request.body;

            const [id] = await connection('perfilacesso').insert({
                nomeperfil,
                descricao,
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

            const { nomeperfil, descricao, ativo } = request.body;

            await connection('perfilacesso').where('id', id).update({
                nomeperfil,
                descricao,
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

        const [count] = await connection('perfilacesso').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};