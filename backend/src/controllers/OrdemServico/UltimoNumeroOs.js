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
    async getLastNumeroOs(request, response) {
        try {
            console.log(this.LastNumeroOs);
            const ultimoNumeroOS = this.LastNumeroOs;
            return response.status(200).json(ultimoNumeroOS);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getLastNumeroAdiantamentoOs(request, response) {
        try {
            const ultimoNumeroOS = await connection('ordemservico')
                .max('ordemservico.numeroos as numeroos');
            return response.status(200).json(ultimoNumeroOS);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

};

