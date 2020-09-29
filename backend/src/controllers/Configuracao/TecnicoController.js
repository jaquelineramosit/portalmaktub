const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const { tipoProjetoId } = request.query;

            const tecnico = await connection('tecnico')
                .join('usuario', 'usuario.id', '=', 'tecnico.usuarioid')
                .join('tipotecnico', 'tipotecnico.id', '=', 'tecnico.tipotecnicoid')
                .join('tipoprojetotecnico', 'tipoprojetotecnico.tecnicoid', '=', 'tecnico.id')
                .modify(function (queryBuilder) {
                    if (tipoProjetoId && tipoProjetoId !== 'Selecione...') {
                        queryBuilder.where('tipoprojetotecnico.tipoprojetoid', tipoProjetoId);
                    }
                })
                .select([
                    'tecnico.*',
                    'tipotecnico.id as tipotecnicoid',
                    'tipotecnico.nometipotecnico',
                    'tipotecnico.desctipotecnico',
                    'usuario.nome'
                ])
                .distinct();

            return response.status(200).json(tecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const tecnico = await connection('tecnico')
                .where('tecnico.id', id)
                .join('usuario', 'usuario.id', '=', 'tecnico.usuarioid')
                .join('tipotecnico', 'tipotecnico.id', '=', 'tecnico.tipotecnicoid')
                .select([
                    'tecnico.*',
                    'tipotecnico.nometipotecnico',
                    'tipotecnico.desctipotecnico',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(tecnico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        const trx = await connection.transaction();
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { tipotecnicoid, telefonecttoemergencial, nomecontatoemergencial, nometecnico, rg, cpf, logradouro, numero, complemento, bairro,
                cidade, estado, cep, telefonefixo, telefonecelular, ativo, right, rights } = request.body;


            const [tecnicoid] = await trx('tecnico').insert({
                tipotecnicoid,
                nometecnico,
                rg,
                cpf,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                telefonefixo,
                telefonecelular,
                telefonecttoemergencial,
                nomecontatoemergencial,
                ativo,
                dataultmodif,
                usuarioid
            })

            const projetoTecnico = right.map((tipoProjetoItem) => {
                console.log(right)
                return {
                    tipoprojetoid: tipoProjetoItem.id,
                    tecnicoid: tecnicoid,
                    descricao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })
            const disponTecnico = rights.map((disponTecnicoItem) => {
                console.log(rights)
                return {
                    disponibilidadeId: disponTecnicoItem.id,
                    tecnicoId: tecnicoid,
                    ativo: 1,
                    usuarioId: usuarioid,
                    dataultmodif: dataultmodif
                }
            })

            await trx('tipoprojetotecnico').insert(projetoTecnico)
            await trx('disponibilidadetecnico').insert(disponTecnico)
            trx.commit()
            return response.status(200).json({ projetoTecnico }), ({ disponTecnico });
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

            const { tipotecnicoid, telefonecttoemergencial, nomecontatoemergencial, nometecnico, rg, cpf, logradouro, numero, complemento, bairro,
                cidade, estado, cep, telefonefixo, telefonecelular, ativo, right, rights } = request.body;



            await trx('tecnico').where('id', id).update({
                tipotecnicoid,
                nometecnico,
                rg,
                cpf,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                telefonefixo,
                telefonecelular,
                telefonecttoemergencial,
                nomecontatoemergencial,
                ativo,
                dataultmodif,
                usuarioid
            })


            //cadastra novamente
            const projetoTecnico = right.map((tipoProjetoItem) => {
                console.log(right)
                return {
                    tipoprojetoid: tipoProjetoItem.id,
                    tecnicoid: id,
                    descricao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }
            })
            const disponTecnico = rights.map((disponTecnicoItem) => {
                console.log(rights)
                return {
                    disponibilidadeId: disponTecnicoItem.id,
                    tecnicoId: id,
                    ativo: 1,
                    usuarioId: usuarioid,
                    dataultmodif: dataultmodif
                }
            })
            //deleta os tipos de projeto x ferramenta e cadastra tudo de novo
            await trx('tipoprojetotecnico').where('tecnicoId', id).delete()
            await trx('disponibilidadetecnico').where('tecnicoId', id).delete()

            await trx('tipoprojetotecnico').insert(projetoTecnico)
            await trx('disponibilidadetecnico').insert(disponTecnico)
            trx.commit()
            return response.status(200).json({ projetoTecnico }), ({ disponTecnico });
        } catch (err) {
            trx.rollback()
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('tecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};