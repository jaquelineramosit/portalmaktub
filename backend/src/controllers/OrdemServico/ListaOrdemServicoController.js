const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const [count] = await connection('ordemservico').count();
        const ordemservico = await connection('ordemservico')        
            .join('clientefilial', 'clientefilial.id', '=', 'ordemservico.clientefilialid')
            .join('cliente', 'cliente.id', '=', 'clientefilial.clienteid')
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')
            .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
            .join('usuario', 'usuario.id', '=', 'ordemservico.usuarioid')
            .select([
                'ordemservico.*',
                'cliente.nomecliente',
                'clientefilial.nomefilial',
                'tipoprojeto.nometipoprojeto',
                'tecnico.nometecnico',
                'usuario.nome'
            ])
            response.header('X-Total-Count', count['count(*)']);
    
        return response.json(ordemservico);
    },    
};