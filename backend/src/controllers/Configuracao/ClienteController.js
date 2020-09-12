const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        const cliente = await connection('cliente')
            .join('usuario', 'usuario.id', '=', 'cliente.usuarioid')
            .leftJoin('grupoempresarial', 'grupoempresarial.clienteid', '=', 'cliente.id')
            .select([
                'cliente.*',
                'grupoempresarial.nomegrupoempresarial',
                'usuario.nome'
            ]);

        return response.json(cliente);
    },

    async getAtivo(request, response) {
        const clientes = await connection('cliente')
            .where('ativo', 1)
            .select('*');

        return response.json(clientes);
    },

    async getById(request, response) {
        const { id } = request.params;

        const cliente = await connection('cliente')
            .where('cliente.id', id)
            .join('usuario', 'usuario.id', '=', 'cliente.usuarioid')
            .select([
                'cliente.*',
                'usuario.nome'
            ])
            .first();

        return response.json(cliente);
    },


    async create(request, response) {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
            bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
            telefoneresponsavel, ativo } = request.body;

        const trx = await connection.transaction();
        try {
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
            console.log(err)
            return response.status(400).send('ocorreu um erro ao salvar')
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
            bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
            telefoneresponsavel, ativo } = request.body;

        const trx = await connection.transaction();
        try {
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
            return response.status(200).json();
        } catch (err) {
            trx.rollback()
            console.log(err)
            return response.send('ocorreu um erro ao salvar')
        }
    },

    async getCount(request, response) {

        const [count] = await connection('cliente').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};