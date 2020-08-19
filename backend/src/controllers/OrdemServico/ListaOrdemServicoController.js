const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {

    /*
    Responsável: Jaqueline Ramos
    Em: 18/08/2020
    Objetivo: Lista as Ordens de Serviços limitadas a uma determinada quantidade de linhas, o parâmetro row vai determinar qual é esse limite
    */
    async getAllLimitRows (request, response) {
        const rows  = request.params.rows; 

        if(rows > 0) {
            
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
                'statusatendimento.status'
            ])
            .orderBy('ordemservico.id', 'desc')
            .distinct()
            .limit(rows);
        
            return response.json(ordemservico);
        } else {
            return response.json();
        }        
    },
};