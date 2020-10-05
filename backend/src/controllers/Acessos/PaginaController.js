const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const paginas = await connection('pagina')
                .join('modulo', 'modulo.id', '=', 'pagina.moduloid')
                .join('usuario', 'usuario.id', '=', 'pagina.usuarioid')
                .select(['pagina.*', 'modulo.nomemodulo', 'usuario.nome'])
                .orderBy('pagina.nomepagina', 'asc');

            return response.status(200).json(paginas);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const pagina = await connection('pagina')
                .where('pagina.id', id)
                .join('modulo', 'modulo.id', '=', 'pagina.moduloid')
                .join('usuario', 'usuario.id', '=', 'pagina.usuarioid')
                .select(['pagina.*', 'modulo.nomemodulo', 'usuario.nome'])
                .first();
            return response.status(200).json(pagina);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioId = request.headers.authorization;
            const dataUltModif = getDate();

            const { moduloid, nomepagina, descricao, ativo } = request.body;

            const [id] = await connection('pagina').insert({
                moduloid,
                nomepagina,
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

            const { moduloid, nomepagina, descricao, ativo } = request.body;

            await connection('pagina').where('id', id).update({
                moduloid,
                nomepagina,
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

        const [count] = await connection('pagina').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};