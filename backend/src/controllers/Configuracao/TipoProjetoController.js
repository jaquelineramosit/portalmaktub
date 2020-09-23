const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const tipoprojeto = await connection('tipoprojeto')
                .select('*')
            return response.status(200).json(tipoprojeto);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const tipoprojeto = await connection('tipoprojeto')
                .where('id', id)
                .select()
                .first();

            return response.status(200).json(tipoprojeto);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        const trx = await connection.transaction();
        try {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { nometipoprojeto, receita, despesa, horas, valorhoraextra, escopoprojeto, valorhoratecnico, horadecimal, ativo, right } = request.body;

            const [tipoprojetoid] = await trx('tipoprojeto').insert({
                nometipoprojeto,
                receita,
                despesa,
                horas,
                valorhoraextra,
                valorhoratecnico,
                horadecimal,
                escopoprojeto,
                ativo,
                usuarioid,
                dataultmodif
            })

            const tipoProjetoFerramenta = right.map((ferramentaItem) => {
                console.log(right)
                return {
                    ferramentaid: ferramentaItem.id,
                    tipoprojetoid: tipoprojetoid,
                    observacao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })

            await trx('tipoprojetoferramenta').insert(tipoProjetoFerramenta)
            trx.commit()
            return response.status(200).json({ tipoProjetoFerramenta });

        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { nometipoprojeto, receita, despesa, horas, valorhoraextra, horadecimal, valorhoratecnico, escopoprojeto, ativo, right, left } = request.body;

        const trx = await connection.transaction();
        try {
            await trx('tipoprojeto').where('id', id).update({
                nometipoprojeto,
                receita,
                despesa,
                horas,
                valorhoraextra,
                valorhoratecnico,
                horadecimal,
                escopoprojeto,
                ativo,
                usuarioid,
                dataultmodif
            })

            //cadastra novamente
            const tipoProjetoFerramenta = right.map((ferramentaItem) => {
                return {
                    ferramentaid: ferramentaItem.id,
                    tipoprojetoid: id,
                    observacao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })
            //deleta os tipos de projeto x ferramenta e cadastra tudo de novo
            await trx('tipoprojetoferramenta').where('tipoprojetoId', id).delete()
            await trx('tipoprojetoferramenta').insert(tipoProjetoFerramenta)
            trx.commit()
            return response.status(200).json({ tipoProjetoFerramenta });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
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

        const [count] = await connection('tipoprojeto').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};