const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll(request, response) {
        try {
            const subpagina = await connection('subpagina')
                .join('pagina', 'pagina.id', '=', 'subpagina.paginaid')
                .join('usuario', 'usuario.id', '=', 'subpagina.usuarioid')
                .select(['subpagina.*', 'pagina.nomepagina', 'usuario.nome']);

            return response.status(200).json(subpagina);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const subpagina = await connection('subpagina')
                .where('subpagina.id', id)
                .join('pagina', 'pagina.id', '=', 'subpagina.paginaid')
                .join('usuario', 'usuario.id', '=', 'subpagina.usuarioid')
                .select(['subpagina.*', 'pagina.nomepagina', 'usuario.nome'])
                .orderBy('subpagina.nomesubpagina', 'asc')
                .first();

            return response.status(200).json(subpagina);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataUltModif = getDate();

            const { paginaid, nomesubpagina, descricao, ativo } = request.body;

            const [id] = await connection('subpagina').insert({
                paginaid,
                nomesubpagina,
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

            const { paginaid, nomesubpagina, descricao, ativo } = request.body;

            await connection('subpagina').where('id', id).update({
                paginaid,
                nomesubpagina,
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

        const [count] = await connection('subpagina').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};