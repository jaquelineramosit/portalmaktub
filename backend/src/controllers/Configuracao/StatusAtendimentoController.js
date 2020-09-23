const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const statusatendimento = await connection('statusatendimento')
                .join('usuario', 'usuario.id', '=', 'statusatendimento.usuarioid')
                .select([
                    'statusatendimento.*',
                    'usuario.nome'
                ]);

            return response.status(200).json(statusatendimento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },
    async getByStatus(request, response) {
        try {
        const { codstatus } = request.params;

        const statusatendimento = await connection('statusatendimento')
            .where('statusatendimento.codstatus,', codstatus)
            .join('usuario', 'usuario.id', '=', 'statusatendimento.usuarioid')
            .select([
                'statusatendimento.*',
                'usuario.nome'
            ])
            .first();

            return response.status(200).json(statusatendimento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const statusatendimento = await connection('statusatendimento')
                .where('statusatendimento.id', id)
                .join('usuario', 'usuario.id', '=', 'statusatendimento.usuarioid')
                .select([
                    'statusatendimento.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(statusatendimento);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { codstatus, status, descstatus, ativo } = request.body;

            const [id] = await connection('statusatendimento').insert({
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

            await connection('statusatendimento').where('id', id).update({
                codstatus,
                status,
                descstatus,
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

        const [count] = await connection('statusadiantamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};