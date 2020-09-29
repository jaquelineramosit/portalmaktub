const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const statuscobranca = await connection('statuscobranca')
                .join('usuario', 'usuario.id', '=', 'statuscobranca.usuarioid')
                .select([
                    'statuscobranca.*',
                    'usuario.nome'
                ]);
            return response.status(200).json(statuscobranca);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getByStatus(request, response) {
        try {
        const { codstatus } = request.params;

        const statuscobranca = await connection('statuscobranca')
            .where('statuscobranca.codstatus,', codstatus)
            .join('usuario', 'usuario.id', '=', 'statuscobranca.usuarioid')
            .select([
                'statuscobranca.*',
                'usuario.nome'
            ])
            .first();

            return response.status(200).json(statuscobranca);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },


    async getById(request, response) {
        try {
            const { id } = request.params;

            const statuscobranca = await connection('statuscobranca')
                .where('statuscobranca.id', id)
                .join('usuario', 'usuario.id', '=', 'statuscobranca.usuarioid')
                .select([
                    'statuscobranca.*',
                    'usuario.nome'
                ])
                .first();
            return response.status(200).json(statuscobranca);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { codstatus, status, descstatus, ativo } = request.body;

            const [id] = await connection('statuscobranca').insert({
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

            await connection('statuscobranca').where('id', id).update({
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

        const [count] = await connection('statuscobranca').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }

};