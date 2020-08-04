const connection = require('../../database/connection');
const knex = require('../../database/knex');
const getDate = require('../../utils/getDate');
const ultimoNumeroOs = require('../OrdemServico/UltimoNumeroOs');

module.exports = {

    // async getTeste (request, response) {

    //     // const teste = ultimoNumeroOs.getLastNumeroOs(request, response);
    //     // console.log(ultimoNumeroOs.getLastNumeroOs);
    //     // console.log(teste);

    //     const teste = ultimoNumeroOs.LastNumeroOs();
    //     console.log(teste);


    //     return response.json(teste);

    // },

    async getAll (request, response) {
        const [count] = await connection('ordemservico').count();
        const ordemservico = await connection('ordemservico')
        
            .join('clientefilial', 'clientefilial.id', '=', 'ordemservico.clientefilialid')
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
            .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
            .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
            .select([
                'ordemservico.*',
                'clientefilial.nomefilial',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome'
            ])
            response.header('X-Total-Count', count['count(*)']);
    
        return response.json(ordemservico);
    },

    async getById (request, response) {
        const  { id }  = request.params;
        
        const ordemservico = await connection('ordemservico')
            .where('ordemservico.id', id)
            .join('clientefilial', 'clientefilial.id', '=', 'ordemservico.clientefilialid')            
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
            .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
            .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')            
            .select([
                'ordemservico.*',
                'clientefilial.clienteid',
                'clientefilial.nomefilial',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome'
            ])
            .first();
    
        return response.json(ordemservico);
    },

    

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        //////////////////////////////////////////////////////////////////////////////////////////////
        //SEPARAR EM FUNÇÃO
        //Regra de negócio:
        //  Ao cadastrar uma nova ordem de serviço, buscar o último número de OS e incrementar em 1.
        const ultimoNumeroOS = await connection('ordemservico')
            .max('ordemservico.numeroos as numeroos');
        let numeroos = ultimoNumeroOS[0].numeroos + 1;
        //////////////////////////////////////////////////////////////////////////////////////////////

        const { datasolicitacao, dataatendimento, clientefilialid, tipoprojetoid, 
                descricaoservico, tecnicoid, observacaoos, horaentrada, 
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar, 
                totalareceber, diadasemana, custoadicional, ativo } = request.body;                        
        const [ordemServicoId] = await connection('ordemservico').insert({            
            numeroos,
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tipoprojetoid,
            descricaoservico,
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
        })

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

        const statusatendimentoid = (tecnicoid || tecnicoid !== undefined) ? 2 : 1
        const statuspagamentoid = 4 //statuspagamentoid: [4] não executado
        const statuscobrancaid = 6 //statuscobrancaid: [6] não faturado
        const observacao = "";
        console.log(statusatendimentoid);

        // var Promise = require('bluebird');
        knex.transaction(function(trx) {
            knex('movimentacaoos').transacting(trx).insert({
                ordemServicoId,
                statusatendimentoid,
                statuspagamentoid,
                statuscobrancaid,
                observacao,
                ativo,
                usuarioid,
                dataultmodif
            })
            .then(function(resp) {
                var id = resp[0];
                return someExternalMethod(id, trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(resp) {
            console.log('Transaction complete.');
        })
        .catch(function(err) {
            console.error(err);
        });

        // const [movimentacaoOsId] = await connection('movimentacaoos').insert({
        //     ordemServicoId,
        //     statusatendimentoid,
        //     statuspagamentoid,
        //     statuscobrancaid,
        //     observacao,
        //     ativo,
        //     usuarioid,
        //     dataultmodif
        // })
        //FIM ////////////////////////////////////////////////////////////////////////////////////////
        return response.json({ ordemServicoId }, { numeroos}, { movimentacaoOsId});
        //////////////////////////////////////////////////////////////////////////////////////////////
    },
    
    async update (request, response) {
        const { id }   = request.params;
        const usuarioid  = request.headers.authorization;
        const dataultmodif = getDate();
        
        const { datasolicitacao, dataatendimento, clientefilialid, tiposervicoid, 
            descricaoservico, tecnicoid, observacaoos, horaentrada, 
            horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar, 
            totalareceber, diadasemana, custoadicional, ativo } = request.body;

        await connection('ordemservico').where('id', id).update({
            
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tiposervicoid,
            descricaoservico,
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
        });           

        return response.status(204).send();
    },

    async getCount (request,response) {        

        const [count] = await connection('ordemservico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};