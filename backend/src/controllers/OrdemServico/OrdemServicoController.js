const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const ordemservico = await connection('ordemservico').select('*');
    
        return response.json(ordemservico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const ordemservico = await connection('ordemservico')
            .where('id', id)
            .select()
            .first();
    
        return response.json(ordemservico);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { numeroos, datasolicitacao, dataatendimento, clientefilialid, tiposervicoid, 
                descricaoservico, tecnicoid, observacaoos, datafechamento, horaentrada, 
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar, 
                totalareceber, diadasemana, custoadicional, ativo } = request.body;
        
        const [id] = await connection('ordemservico').insert({            
            numeroos,
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tiposervicoid,
            descricaoservico,
            tecnicoid,
            observacaoos,
            datafechamento,
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

        return response.json({ id });
    },
    
        async update (request, response) {
            const   { id }   = request.params;
            const  usuarioid  = request.headers.authorization;
            const  dataultmodif = getDate();
            
            const { numeroos, datasolicitacao, dataatendimento, clientefilialid, tiposervicoid, 
                descricaoservico, tecnicoid, observacaoos, datafechamento, horaentrada, 
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar, 
                totalareceber, diadasemana, custoadicional, ativo } = request.body;
    
            await connection('ordemservico').where('id', id).update({
                numeroos,
                datasolicitacao,
                dataatendimento,
                clientefilialid,
                tiposervicoid,
                descricaoservico,
                tecnicoid,
                observacaoos,
                datafechamento,
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
    };