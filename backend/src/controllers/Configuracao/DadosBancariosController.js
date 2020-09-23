const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const dadosbancarios = await connection('dadosbancarios')
                .join('tecnico', 'tecnico.id', '=', 'dadosbancarios.tecnicoid')
                .join('banco', 'banco.id', '=', 'dadosbancarios.bancoid')
                .join('tipoconta', 'tipoconta.id', '=', 'dadosbancarios.tipocontaid')
                .join('usuario', 'usuario.id', '=', 'dadosbancarios.usuarioid')
                .select([
                    'dadosbancarios.*',
                    'tecnico.nometecnico',
                    'banco.nomebanco',
                    'tipoconta.nometipoconta',
                    'usuario.nome'
                ]);
            return response.status(200).json(dadosbancarios);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const dadosbancarios = await connection('dadosbancarios')
                .where('dadosbancarios.id', id)
                .join('tecnico', 'tecnico.id', '=', 'dadosbancarios.tecnicoid')
                .join('banco', 'banco.id', '=', 'dadosbancarios.bancoid')
                .join('tipoconta', 'tipoconta.id', '=', 'dadosbancarios.tipocontaid')
                .join('usuario', 'usuario.id', '=', 'dadosbancarios.usuarioid')
                .select([
                    'dadosbancarios.*',
                    'tecnico.nometecnico',
                    'banco.nomebanco',
                    'tipoconta.nometipoconta',
                    'usuario.nome'
                ])
                .first();
            return response.status(200).json(dadosbancarios);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { tecnicoid, bancoid, tipocontaid, agencia, conta, titularconta,
                doctitular, ativo } = request.body;

            const [id] = await connection('dadosbancarios').insert({
                tecnicoid,
                bancoid,
                tipocontaid,
                agencia,
                conta,
                titularconta,
                doctitular,
                ativo,
                usuarioid,
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
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { tecnicoid, bancoid, tipocontaid, agencia, conta, titularconta,
                doctitular, ativo } = request.body;

            await connection('dadosbancarios').where('id', id).update({
                tecnicoid,
                bancoid,
                tipocontaid,
                agencia,
                conta,
                titularconta,
                doctitular,
                ativo,
                usuarioid,
                dataultmodif
            });
            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('dadosbancarios').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};