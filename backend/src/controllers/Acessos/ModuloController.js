const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const modulos = await connection('modulo')
                .join('usuario', 'usuario.id', '=', 'modulo.usuarioid')
                .select(['modulo.*', 'usuario.nome'])
                .orderBy('modulo.nomemodulo', 'asc');

            return response.status(200).json(modulos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const modulo = await connection('modulo')
                .where('modulo.id', id)
                .join('usuario', 'usuario.id', '=', 'modulo.usuarioid')
                .select(['modulo.*', 'usuario.nome'])
                .first();

            return response.status(200).json(modulo);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataUltModif = getDate();

            const { nomemodulo, descricao, ativo } = request.body;

            const [id] = await connection('modulo').insert({
                nomemodulo,
                descricao,
                ativo,
                dataUltModif,
                usuarioId
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
            const dataUltModif = getDate();
            const { nomemodulo, descricao, ativo } = request.body;

            await connection('modulo').where('id', id).update({
                nomemodulo,
                descricao,
                ativo,
                dataUltModif,
                usuarioId
            });
            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('modulo').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};