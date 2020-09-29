const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const statusadiantamento = await connection('statusadiantamento')
                .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')
                .select([
                    'statusadiantamento.*',
                    'usuario.nome'
                ]);

            return response.status(200).json(statusadiantamento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByStatus(request, response) {
        try {
            const { codstatus } = request.params;

            const statusadiantamento = await connection('statusadiantamento')
                .where('statusadiantamento.codstatus,', codstatus)
                .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')
                .select([
                    'statusadiantamento.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(statusadiantamento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },
    async getAtivo(request, response) {
        try {
            const clientes = await connection('statusadiantamento')
                .where('ativo', 1)
                .select('*');

            return response.status(200).json(clientes);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const statusadiantamento = await connection('statusadiantamento')
                .where('statusadiantamento.id', id)
                .join('usuario', 'usuario.id', '=', 'statusadiantamento.usuarioid')
                .select([
                    'statusadiantamento.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(statusadiantamento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }

    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { codstatus, status, descstatus, ativo } = request.body;

            const [id] = await connection('statusadiantamento').insert({
                codstatus,
                status,
                descstatus,
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

            const { codstatus, status, descstatus, ativo } = request.body;

            await connection('statusadiantamento').where('id', id).update({
                codstatus,
                status,
                descstatus,
                ativo,
                dataultmodif,
                usuarioid
            });

            return response.status(200).send();
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('statusadiantamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};