const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const { clienteId } = request.query;

            const grupoempresarial = await connection('grupoempresarial')
                .join('usuario', 'usuario.id', '=', 'grupoempresarial.usuarioid')
                .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .modify(function (queryBuilder) {
                    if (clienteId && clienteId !== 'Selecione...') {
                        queryBuilder.where('grupoempresarial.clienteid', clienteId);
                    }
                })
                .select([
                    'grupoempresarial.*',
                    'cliente.nomecliente',
                    'usuario.nome as nomeusuario'
                ]);

            return response.status(200).json(grupoempresarial);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAtivo(request, response) {
        try {
            const grupoempresarial = await connection('grupoempresarial')
                .where('ativo', 1)
                .select('*');

            return response.status(200).json(grupoempresarial);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const { clienteId } = request.query;

            const grupoempresarial = await connection('grupoempresarial')
                .where('grupoempresarial.id', id)
                .join('usuario', 'usuario.id', '=', 'grupoempresarial.usuarioid')
                .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .modify(function (queryBuilder) {
                    if (clienteId && clienteId !== 'Selecione...') {
                        queryBuilder.where('grupoempresarial.clienteid', clienteId);
                    }
                })
                .select([
                    'grupoempresarial.*',
                    'cliente.nomecliente',
                    'usuario.nome as nomeusuario'
                ])
                .first();

            return response.status(200).json(grupoempresarial);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        const trx = await connection.transaction();
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            console.log('usuarioid')
            console.log(usuarioid)
            const { clienteid, nomegrupoempresarial, descricao, ativo } = request.body;

            const [grupoempresarialid] = await trx('grupoempresarial').insert({
                clienteid,
                nomegrupoempresarial,
                descricao,
                ativo,
                usuarioid,
                dataultmodif
            })

            trx.commit()
            return response.status(200).json({ grupoempresarialid });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },

    async update(request, response) {
        const trx = await connection.transaction();
        try {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { clienteid, nomegrupoempresarial, descricao, ativo } = request.body;
       
            await trx('grupoempresarial').where('id', id).update({
                clienteid,
                nomegrupoempresarial,
                descricao,
                ativo,
                usuarioid,
                dataultmodif
            });

            trx.commit()
            return response.status(200).json({ id });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },

    async getCount(request, response) {

        const [count] = await connection('grupoempresarial').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};