const connection = require('../../database/connection');
const knex = require('../../database/knex');
const getDate = require('../../utils/getDate');
const ultimoNumeroOs = require('../OrdemServico/UltimoNumeroOs');

module.exports = {

    async getAll(request, response) {
        try {
            const [count] = await connection('ordemservico').count();
            const ordemservico = await connection('ordemservico')
                .whereRaw(
                    `movimentacaoos.id = (SELECT MAX(id) FROM movimentacaoos AS mos WHERE mos.ordemservicoid = movimentacaoos.ordemservicoid)`
                )
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
                .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .select([
                    'ordemservico.*',
                    'clientefinal.nomeclientefinal',
                    'clientefinal.bandeiraid',
                    'bandeira.nomebandeira',
                    'bandeira.grupoempresarialid',
                    'grupoempresarial.nomegrupoempresarial',
                    'grupoempresarial.clienteid',
                    'cliente.nomecliente',
                    'tipoprojeto.nometipoprojeto',
                    'tecnico.nometecnico',
                    'usuario.nome',
                    'statusatendimento.status as statusAtendimento'
                ])
                .orderBy('ordemservico.dataatendimento', 'desc')
                .distinct()

            response.header('X-Total-Count', count['count(*)']);

            return response.status(200).json(ordemservico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getAllByStatus (request, response) {
        try {
            
            const status  = request.params.status; 
            const periodo  = request.params.periodo; 
            
            const ordemservico = await connection('ordemservico') 
                .whereRaw(
                    `movimentacaoos.id = (SELECT MAX(id) FROM movimentacaoos AS mos WHERE mos.ordemservicoid = movimentacaoos.ordemservicoid)`
                )
                .andWhere('statusatendimento.codstatus', '=', status)
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
                .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .select([
                    'ordemservico.*',
                    'cliente.nomecliente',
                    'bandeira.nomebandeira',
                    'grupoempresarial.nomegrupoempresarial',
                    'clientefinal.nomeclientefinal',
                    'tipoprojeto.nometipoprojeto',
                    'tecnico.nometecnico',
                    'usuario.nome',
                    'statusatendimento.status'
                ])
                .orderBy('ordemservico.id', 'desc')
                .distinct()
                .limit(rows);
            
                return response.status(200).json(ordemservico);
             
        } catch (error) {
            return response.status(404).json(error.message);
        }
            
    },

    async getById(request, response) {
        try {
            const { id } = request.params;
            const ordemservico = await connection('ordemservico')
                .where('ordemservico.id', id)
                .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
                .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
                .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
                .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
                .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .select([
                    'ordemservico.*',
                    'clientefinal.nomeclientefinal',
                    'clientefinal.bandeiraid',
                    'bandeira.nomebandeira',
                    'bandeira.grupoempresarialid',
                    'grupoempresarial.nomegrupoempresarial',
                    'grupoempresarial.clienteid',
                    'cliente.nomecliente',
                    'tipoprojeto.nometipoprojeto',
                    'tecnico.nometecnico',
                    'usuario.nome',
                    'statusatendimento.status as statusAtendimento'
                ])
                .first();
            return response.status(200).json(ordemservico);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            //////////////////////////////////////////////////////////////////////////////////////////////
            //SEPARAR EM FUNÇÃO
            //Regra de negócio:
            //  Ao cadastrar uma nova ordem de serviço, buscar o último número de OS e incrementar em 1.
            const ultimoNumeroOS = await connection('ordemservico')
                .max('ordemservico.numeroos as numeroos');
            let numeroos = ultimoNumeroOS[0].numeroos + 1;
            //////////////////////////////////////////////////////////////////////////////////////////////

            const { datasolicitacao, dataatendimento, clientefinalid, tipoprojetoid,
                descricaoprojeto, tecnicoid, observacaoos, horaentrada,
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar,
                totalareceber, diadasemana, custoadicional, ativo, statusatendimentoid,
                statuspagamentoid, statuscobrancaid, observacao } = request.body;

            //////////////////////////////////////////////////////////////////////////////////////////////
            //SEPARAR EM FUNÇÃO
            //Regra de negócio: {
            //  Ao criar uma Ordem de Serviço se tudo der certo, cadastra um registro na movimentação
            //  de OS com a seguinte regra:
            //      - caso seja informado a data do atendimento e o técnico, 
            //          { status de atendimento : [2] Agendado
            //      - caso NÃO seja informado a data do atendimento e/ou técnico
            //          { status de atendimento: [1] Novo
            //}

            // const statusatendimentoid = (tecnicoid || tecnicoid !== undefined) ? 2 : 1
            // const statuspagamentoid = 4 //statuspagamentoid: [4] não executado
            // const statuscobrancaid = 6 //statuscobrancaid: [6] não faturado
            // const observacao = "";

            const objetoRetorno =
                knex.transaction(function (trx) {
                    return knex('ordemservico').transacting(trx).insert({
                        numeroos,
                        datasolicitacao,
                        dataatendimento,
                        clientefinalid,
                        tipoprojetoid,
                        descricaoprojeto,
                        tecnicoid,
                        observacaoos,
                        horaentrada,
                        horasaida,
                        qtdehoras,
                        horaextra,
                        valorapagar,
                        valorareceber,
                        totalapagar,
                        totalareceber,
                        diadasemana,
                        custoadicional,
                        ativo,
                        usuarioid,
                        dataultmodif
                    }).then(function (ordemServicoId) {
                        if (ordemServicoId[0]) {
                            return knex('movimentacaoos').transacting(trx).insert({
                                ordemServicoId,
                                statusatendimentoid,
                                statuspagamentoid,
                                statuscobrancaid,
                                observacao,
                                ativo,
                                usuarioid,
                                dataultmodif
                            }).then(function (movimentacaoOsId) {
                                console.log("movimentacaoOsId[0]");
                                console.log(movimentacaoOsId[0]);
                                if (movimentacaoOsId[0]) {
                                    trx.commit;
                                    return [{ ordemServicoId: ordemServicoId[0], numeroos: numeroos, movimentacaoOsId: movimentacaoOsId[0] }];
                                } else {
                                    trx.rollback;
                                }
                            })
                        } else {
                            trx.rollback;
                        }
                    })
                        .catch(trx.rollback);
                })
                    .then(function (resp) {
                        return response.json(resp);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });

            //FIM ////////////////////////////////////////////////////////////////////////////////////////

        } catch (error) {
            trx.rollback();
            return response.status(404).json(error.message);
        }
    },

    async update(request, response) {

        try {
            const { id } = request.params;
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            //////////////////////////////////////////////////////////////////////////////////////////////
            //SEPARAR EM FUNÇÃO
            //Regra de negócio:
            //  Ao cadastrar uma nova ordem de serviço, buscar o último número de OS e incrementar em 1.
            const ultimoNumeroOS = await connection('ordemservico')
                .max('ordemservico.numeroos as numeroos');
            let numeroos = ultimoNumeroOS[0].numeroos + 1;
            //////////////////////////////////////////////////////////////////////////////////////////////

            const { datasolicitacao, dataatendimento, clientefinalid, tipoprojetoid,
                descricaoprojeto, tecnicoid, observacaoos, horaentrada,
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar,
                totalareceber, diadasemana, custoadicional, ativo, statusatendimentoid,
                statuspagamentoid, statuscobrancaid, observacao } = request.body;

            //////////////////////////////////////////////////////////////////////////////////////////////
            //SEPARAR EM FUNÇÃO
            //Regra de negócio: {
            //  Ao criar uma Ordem de Serviço se tudo der certo, cadastra um registro na movimentação
            //  de OS com a seguinte regra:
            //      - caso seja informado a data do atendimento e o técnico, 
            //          { status de atendimento : [2] Agendado
            //      - caso NÃO seja informado a data do atendimento e/ou técnico
            //          { status de atendimento: [1] Novo
            //}

            const objetoRetorno =
                knex.transaction(function (trx) {
                    return knex('ordemservico').transacting(trx).where('id', id).update({
                        numeroos,
                        datasolicitacao,
                        dataatendimento,
                        clientefinalid,
                        tipoprojetoid,
                        descricaoprojeto,
                        tecnicoid,
                        observacaoos,
                        horaentrada,
                        horasaida,
                        qtdehoras,
                        horaextra,
                        valorapagar,
                        valorareceber,
                        totalapagar,
                        totalareceber,
                        diadasemana,
                        custoadicional,
                        ativo,
                        usuarioid,
                        dataultmodif
                    }).then(function (ordemServicoId) {
                        if (ordemServicoId[0]) {
                            return knex('movimentacaoos').transacting(trx).insert({
                                ordemServicoId,
                                statusatendimentoid,
                                statuspagamentoid,
                                statuscobrancaid,
                                observacao,
                                ativo,
                                usuarioid,
                                dataultmodif
                            }).then(function (movimentacaoOsId) {
                                console.log("movimentacaoOsId[0]");
                                console.log(movimentacaoOsId[0]);
                                if (movimentacaoOsId[0]) {
                                    trx.commit;
                                    return [{ ordemServicoId: ordemServicoId[0], numeroos: numeroos, movimentacaoOsId: movimentacaoOsId[0] }];
                                } else {
                                    trx.rollback;
                                }
                            })
                        } else {
                            trx.rollback;
                        }
                    })
                        .catch(function (err) {
                            trx.rollback();
                            return response.status(404).json(err.message);
                        })
                })
                    .then(function (resp) {
                        return response.status(200).json(resp);
                    })
                    .catch(function (err) {
                        trx.rollback();
                        return response.status(404).json(err.message);
                    });
            //FIM ////////////////////////////////////////////////////////////////////////////////////////
            //return response.status(204).send();

        } catch (error) {
            trx.rollback();
            return response.status(404).json(error.message);
        }
    },

    async getCount(request, response) {

        const [count] = await connection('ordemservico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};