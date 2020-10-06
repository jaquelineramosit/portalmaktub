const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const funcao = await connection('funcao')
                .leftJoin('subpagina', 'subpagina.id', '=', 'funcao.subpaginaid')
                .leftJoin('pagina', 'pagina.id', '=', 'funcao.paginaid')
                .join('usuario', 'usuario.id', '=', 'funcao.usuarioid')
                .select([
                    'funcao.*',
                    'subpagina.nomesubpagina',
                    'pagina.nomepagina',
                    'usuario.nome'
                ])
                .orderBy('funcao.nomefuncao', 'asc')
            return response.status(200).json(funcao);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const funcao = await connection('funcao')
                .where('funcao.id', id)
                .leftJoin('subpagina', 'subpagina.id', '=', 'funcao.subpaginaid')
                .leftJoin('pagina', 'pagina.id', '=', 'funcao.paginaid')
                .join('usuario', 'usuario.id', '=', 'funcao.usuarioid')
                .select([
                    'funcao.*',
                    'subpagina.nomesubpagina',
                    'pagina.nomepagina',
                    'usuario.nome'
                ])
                .first();
            return response.status(200).json(funcao);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataUltModif = getDate();

            const { subpaginaid, paginaid, nomefuncao, descricao, ativo } = request.body;

            const [id] = await connection('funcao').insert({
                subpaginaid,
                paginaid,
                nomefuncao,
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
            const { subpaginaid, paginaid, nomefuncao, descricao, ativo } = request.body;

            await connection('funcao').where('id', id).update({
                subpaginaid,
                paginaid,
                nomefuncao,
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

        const [count] = await connection('funcao').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};