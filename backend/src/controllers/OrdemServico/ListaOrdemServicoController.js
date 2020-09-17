const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {

    /*
    Responsável: Jaqueline Ramos
    Em: 18/08/2020
    Objetivo: Lista as Ordens de Serviços limitadas a uma determinada quantidade de linhas, o parâmetro row vai determinar qual é esse limite
    */
    async getAllLimitRows (request, response) {
        try {
            const rows  = request.params.rows; 

            if(rows > 0) {
                
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
            } else {
                return response.status(200).json([]);
            }   
        } catch (error) {
            return response.status(404).json(error.message);
        }
             
    },

    async getByTecnicoId (request, response) {
        const  { tecnicoId }  = request.params;
        
        const ordemservico = await connection('ordemservico')
            .where('ordemservico.tecnicoid', tecnicoId)
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
                'clientefinal.nomeclientefinal',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome'
            ])
            .where('movimentacaoos.statusatendimentoid', '<>', 5)
            .andWhere('movimentacaoos.statusatendimentoid', '<>', 6)
            .orderBy('ordemservico.id', 'asc')
            .distinct();
    
        return response.json(ordemservico);
    },
};