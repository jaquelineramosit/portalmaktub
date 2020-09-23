const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const disponibilidade = await connection('disponibilidade')
                .join('usuario', 'usuario.id', '=', 'disponibilidade.usuarioid')
                .select([
                    'disponibilidade.*',
                    'usuario.nome'
                ]);

            return response.status(200).json(disponibilidade);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const disponibilidade = await connection('disponibilidade')
                .where('disponibilidade.id', id)
                .join('usuario', 'usuario.id', '=', 'disponibilidade.usuarioid')
                .select([
                    'disponibilidade.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(disponibilidade);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataultmodif = getDate();

            const { nomedisponibilidade, descricao, ativo } = request.body;

            const [id] = await connection('disponibilidade').insert({
                nomedisponibilidade,
                descricao,
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
            const usuarioId = request.headers.authorization;
            const dataultmodif = getDate();

            const { nomedisponibilidade, descricao, ativo } = request.body;

            await connection('disponibilidade').where('id', id).update({
                nomedisponibilidade,
                descricao,
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

        const [count] = await connection('disponibilidade').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};