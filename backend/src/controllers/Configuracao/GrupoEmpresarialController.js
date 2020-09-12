const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {

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

        return response.json(grupoempresarial);
    },

    async getAtivo(request, response) {
        const grupoempresarial = await connection('grupoempresarial')
            .where('ativo', 1)
            .select('*');

        return response.json(grupoempresarial);
    },

    async getById(request, response) {
        const { id } = request.params;
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
            ])
            .first();

        return response.status(200).json(grupoempresarial);
    },


    async create(request, response) {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        console.log('usuarioid')
        console.log(usuarioid)
        const { clienteid, nomegrupoempresarial, descricao, ativo } = request.body;

        const trx = await connection.transaction();
        try {
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
            console.log(err)
            return response.status(404).send('ocorreu um erro ao salvar')
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { clienteid, nomegrupoempresarial, descricao, ativo } = request.body;

        const trx = await connection.transaction();
        try {
            await trx('grupoempresarial').where('id', id).update({
                clienteid,
                nomegrupoempresarial,
                descricao,
                ativo,
                usuarioid,
                dataultmodif
            });

            trx.commit()
            return response.status(200).send();
        } catch (err) {
            trx.rollback()
            return response.status(404).send('ocorreu um erro ao salvar')
        }
    },

    async getCount(request, response) {

        const [count] = await connection('grupoempresarial').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};