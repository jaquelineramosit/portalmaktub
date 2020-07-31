const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAllLimitRows (request, response) {
        const rows  = request.params; 
        
        const [count] = await connection('ordemservico').count();
        const ordemservico = await connection('ordemservico')        
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
            ]).distinct().limit(rows);
            response.header('X-Total-Count', count['count(*)']);
    
        return response.json(ordemservico);
    },    
};