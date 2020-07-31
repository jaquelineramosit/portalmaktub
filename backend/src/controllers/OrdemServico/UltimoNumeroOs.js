const connection = require('../../database/connection');
const { response, json } = require('express');

module.exports = {

    //  async LastNumeroOs() {

    //     const ultimoNumeroOS = await connection('ordemservico')
    //             .max('ordemservico.numeroos as numeroos');
    
    //     console.log("ultimoNumeroOS");
    //     console.log(ultimoNumeroOS);
    //     return response.json(ultimoNumeroOS);
    // },


    //Correto
    async getLastNumeroOs (request, response) {      
        console.log(this.LastNumeroOs);
        const ultimoNumeroOS = this.LastNumeroOs;
        return response.json(ultimoNumeroOS);
    },

    async getLastNumeroAdiantamentoOs (request, response) {        
        const ultimoNumeroOS = await connection('ordemservico')
            .max('ordemservico.numeroos as numeroos');
        return response.json(ultimoNumeroOS);
    },
};

