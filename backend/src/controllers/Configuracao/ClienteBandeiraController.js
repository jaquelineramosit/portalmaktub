const connection = require('../../database/connection');

module.exports = {
  async getByClientId (request, response) {
    const  { clienteId }  = request.params;
  
    const clientebandeiras = await connection('clientebandeira')
        .where('clienteId', clienteId)
        .join('bandeira', 'bandeira.id', '=', 'clientebandeira.bandeiraid') 
        .select([
            'clientebandeira.bandeiraid as id', 
            'bandeira.*'
        ]);         
  
    return response.json(clientebandeiras);
  }
}