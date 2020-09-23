const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const { clienteId } = request.query;
            const cliente = await connection('cliente')
                .join('usuario', 'usuario.id', '=', 'cliente.usuarioid')
                .modify(function (queryBuilder) {
                    if (clienteId && clienteId !== '') {
                        queryBuilder.where('cliente.id', clienteId);
                    }
                })
                .select([
                    'cliente.*',
                    'usuario.nome'
                ]);
            return response.status(200).json(cliente);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAtivo(request, response) {
        try {
            const clientes = await connection('cliente')
                .where('ativo', 1)
                .select('*');

            return response.status(200).json(clientes);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { clienteId } = request.query;
            const { id } = request.params;

            const cliente = await connection('cliente')
                .where('cliente.id', id)
                .join('usuario', 'usuario.id', '=', 'cliente.usuarioid')
                .modify(function (queryBuilder) {
                    if (clienteId && clienteId !== '') {
                        queryBuilder.where('cliente.id', clienteId);
                    }
                })
                .select([
                    'cliente.*',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(cliente);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        const trx = await connection.transaction();
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
                bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
                telefoneresponsavel, ativo } = request.body;

            const [clienteid] = await trx('cliente').insert({
                nomecliente,
                cnpj,
                razaosocial,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                telefonefixo,
                telefonecelular,
                nomeresponsavel,
                telefoneresponsavel,
                ativo,
                usuarioid,
                dataultmodif
            })
            trx.commit()
            return response.status(200).json({ clienteid });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async update(request, response) {
        const trx = await connection.transaction();
        try {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
            bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
            telefoneresponsavel, ativo } = request.body;
        
            await trx('cliente').where('id', id).update({
                nomecliente,
                cnpj,
                razaosocial,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                telefonefixo,
                telefonecelular,
                nomeresponsavel,
                telefoneresponsavel,
                ativo,
                usuarioid,
                dataultmodif
            });

            trx.commit()
            return response.status(200).json({ id });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getCount(request, response) {

        const [count] = await connection('cliente').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};