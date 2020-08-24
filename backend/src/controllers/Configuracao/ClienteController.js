const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        const cliente = await connection('cliente')
            .join('usuario', 'usuario.id', '=', 'cliente.usuarioid')
            .join('parceiro', 'parceiro.id', '=', 'cliente.parceiroid')
            .select([
                'cliente.*',
                'parceiro.nomeparceiro',
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
            .join('parceiro', 'parceiro.id', '=', 'cliente.parceiroid')
            .select([
                'cliente.*',
                'parceiro.nomeparceiro',
                'usuario.nome'
            ])
            .first();

        return response.json(cliente);
    },


    async create(request, response) {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { parceiroid, nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
            bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
            telefoneresponsavel, ativo, right } = request.body;

        const trx = await connection.transaction();
        try {
            const [clienteid] = await trx('cliente').insert({
                parceiroid,
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

            const clienteBandeira = right.map((bandeiraItem) => {
                return {
                    bandeiraid: bandeiraItem.id,
                    clienteid: clienteid,
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })



            await trx('clientebandeira').insert(clienteBandeira)
            trx.commit()
            return response.json({ clienteBandeira });
        } catch (err) {
            trx.rollback()
            console.log(err)
            return response.send('ocorreu um erro ao salvar')
        }
    },



    async update(request, response) {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { parceiroid, nomecliente, cnpj, razaosocial, logradouro, numero, complemento,
            bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
            telefoneresponsavel, right,left, ativo } = request.body;

        const trx = await connection.transaction();
        try {
            await trx('cliente').where('id', id).update({
                parceiroid,
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

            //cadastra novamente
            const clienteBandeira = right.map((bandeirasItem) => {
                return {
                    bandeiraid: bandeirasItem.id,
                    clienteid: id,
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })
            
            //deleta os tipos de projeto x ferramenta e cadastra tudo de novo
            await trx('clientebandeira').where('id', id).delete(clienteBandeira)
            await trx('clientebandeira').insert(clienteBandeira)
            trx.commit()
            return response.json({ clienteBandeira });
        } catch (err) {
            trx.rollback()
            console.log(err)
            return response.send('ocorreu um erro ao salvar')
        }


        await connection('tipoprojeto').where('id', id).update({
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoraextra,
            valorhoratecnico,
            horadecimal,
            ativo,
            usuarioid,
            dataultmodif
        });

        return response.status(204).send();
    },

    async getCount(request, response) {

        const [count] = await connection('cliente').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};