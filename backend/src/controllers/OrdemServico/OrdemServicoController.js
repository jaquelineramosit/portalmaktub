const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
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

        const { numeroos, datasolicitacao, dataatendimento, clientefilialid, tipoprojetoid, 
                descricaoservico, tecnicoid, observacaoos, datafechamento, horaentrada, 
                horasaida, qtdehoras, horaextra, valorapagar, valorareceber, totalapagar, 
                totalareceber, diadasemana, custoadicional, ativo } = request.body;
        console.log(request.body);
        const [id] = await connection('ordemservico').insert({            
            numeroos,
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tipoprojetoid,
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

    async getCount (request,response) {        

        const [count] = await connection('ordemservico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};