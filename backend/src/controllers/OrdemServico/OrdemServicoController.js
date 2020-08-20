const connection = require('../../database/connection');
const knex = require('../../database/knex');
const getDate = require('../../utils/getDate');
const ultimoNumeroOs = require('../OrdemServico/UltimoNumeroOs');

module.exports = {

    async getAll (request, response) {
        const [count] = await connection('ordemservico').count();
        const ordemservico = await connection('ordemservico')
            .whereRaw(
                `movimentacaoos.id = (SELECT MAX(id) FROM movimentacaoos AS mos WHERE mos.ordemservicoid = movimentacaoos.ordemservicoid)`
            )
            .join('clientefilial', 'clientefilial.id', '=', 'ordemservico.clientefilialid')
            .join('cliente', 'cliente.id', '=', 'clientefilial.clienteid')
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
            .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
            .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
            .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
            .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
            .select([
                'ordemservico.*',
                'cliente.nomecliente',
                'clientefilial.nomefilial',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome',
                'statusatendimento.status as statusAtendimento'
            ])
            .orderBy('ordemservico.dataatendimento', 'desc')
            .distinct()
        
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

        const objetoRetorno = 
            knex.transaction(function(trx) {
                return knex('ordemservico').transacting(trx).insert({
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
                }).then(function(ordemServicoId){ 
                    if(ordemServicoId[0]) {                    
                        return knex('movimentacaoos').transacting(trx).insert({
                            ordemServicoId,
                            statusatendimentoid,
                            statuspagamentoid,
                            statuscobrancaid,
                            observacao,
                            ativo,
                            usuarioid,
                            dataultmodif
                        }) .then(function(movimentacaoOsId) {     
                            console.log("movimentacaoOsId[0]");
                            console.log(movimentacaoOsId[0]);                   
                            if(movimentacaoOsId[0]) {
                                trx.commit;
                                return [{ ordemServicoId: ordemServicoId[0], numeroos:  numeroos, movimentacaoOsId: movimentacaoOsId[0]}];
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
            .then(function(resp) {
                return response.json(resp);
            })
            .catch(function(err) {
                console.error(err);
            });
    
        //FIM ////////////////////////////////////////////////////////////////////////////////////////

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