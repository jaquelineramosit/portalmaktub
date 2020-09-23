const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const acessopagina = await connection('permissaoacesso')
                .join('perfilacesso', 'perfilacesso.id', '=', 'permissaoacesso.perfilacessoid')
                .join('modulo', 'modulo.id', '=', 'permissaoacesso.moduloid')
                .join('pagina', 'pagina.id', '=', 'permissaoacesso.paginaid')
                .leftJoin('subpagina', 'subpagina.id', '=', 'permissaoacesso.subpaginaid')
                .leftJoin('funcao', 'funcao.id', '=', 'permissaoacesso.funcaoid')
                .join('usuario', 'usuario.id', '=', 'permissaoacesso.usuarioid')
                .select([
                    'permissaoacesso.*',
                    'perfilacesso.nomeperfil',
                    'modulo.nomemodulo',
                    'pagina.nomepagina',
                    'subpagina.nomesubpagina',
                    'funcao.nomefuncao',
                    'usuario.nome'
                ]);

            return response.status(200).json(acessopagina);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const acessopagina = await connection('permissaoacesso')
                .where('permissaoacesso.id', id)
                .join('perfilacesso', 'perfilacesso.id', '=', 'permissaoacesso.perfilacessoid')
                .join('modulo', 'modulo.id', '=', 'permissaoacesso.moduloid')
                .join('pagina', 'pagina.id', '=', 'permissaoacesso.paginaid')
                .leftJoin('subpagina', 'subpagina.id', '=', 'permissaoacesso.subpaginaid')
                .leftJoin('funcao', 'funcao.id', '=', 'permissaoacesso.funcaoid')
                .join('usuario', 'usuario.id', '=', 'permissaoacesso.usuarioid')
                .select([
                    'permissaoacesso.*',
                    'perfilacesso.nomeperfil',
                    'modulo.nomemodulo',
                    'pagina.nomepagina',
                    'subpagina.nomesubpagina',
                    'funcao.nomefuncao',
                    'usuario.nome'
                ])
                .first();


            return response.status(200).json(acessopagina);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataUltModif = getDate();

            const { perfilacessoid, moduloid, paginaid, subpaginaid, funcaoid, ativo } = request.body;

            const [id] = await connection('permissaoacesso').insert({
                perfilacessoid,
                moduloid,
                paginaid,
                subpaginaid,
                funcaoid,
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

            const { perfilacessoid, moduloid, paginaid, descricao, ativo } = request.body;

            await connection('permissaoacesso').where('id', id).update({
                perfilacessoid,
                moduloid,
                paginaid,
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

        const [count] = await connection('permissaoacesso').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};