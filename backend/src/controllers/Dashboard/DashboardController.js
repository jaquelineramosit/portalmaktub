const connection = require('../../database/connection');
//const getDate = require('../../utils/getDate');

module.exports = {
    async getValoresSemanais (request, response) {

        const {statusatendimentoid} = request.params;
        
        //define as datas
        const data = new Date();
        const data1 = data.setDate(data.getDate() -7);   //1ª semana
        const data2 = data1.setDate(data1.getDate() -7); //2ª semana
        const data3 = data2.setDate(data2.getDate() -7); //3ª semana
        const data4 = data3.setDate(data3.getDate() -7); //4ª semana
        const data5 = data4.setDate(data4.getDate() -7); //5ª semana
        const data6 = data5.setDate(data5.getDate() -7); //6ª semana
         
        console.log("data");
        console.log(data);


        //data.setDate(data.getDate() - 14)
        const ordemservicoTotal = await connection('ordemservico')
            .where({
                "statusatendimento.id": statusatendimentoid
            })
            .whereBetween('movimentacaoos.dataultmodif', ['2020-06-30', '2020-07-15'])
            .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
            .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')            
            .sum('ordemservico.id as totalSemanal');
            
    
        return response.json(ordemservicoTotal);
    },    
};