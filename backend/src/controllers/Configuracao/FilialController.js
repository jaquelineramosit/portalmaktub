const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const clientefilial = await connection('clientefilial').select('*');
    
        return response.json(clientefilial);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const clientefilial = await connection('clientefilial')
            .where('id', id)
            .select()
            .first();
    
        return response.json(clientefilial);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { bandeiraid, clienteid, ced, nomefilial, cnpj, razaosocial, logradouro, numero, 
                complemento, bairro, cidade, estado, cep, telefonefixo, nomeresponsavel,
                telefoneresponsavel, horarioiniciosemana, horariofimsemana, horarioiniciosabado,
                horariofimsabado, horarioiniciodomingo, horariofimdomingo, ativo } = request.body;
        
        const [id] = await connection('clientefilial').insert({            
            bandeiraid,
            clienteid,
            ced,
            nomefilial,
            cnpj,
            razaosocial,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            nomeresponsavel,
            telefoneresponsavel,
            horarioiniciosemana,
            horariofimsemana,
            horarioiniciosabado,
            horariofimsabado,
            horarioiniciodomingo,
            horariofimdomingo,
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
        
        const { bandeiraid, clienteid, ced, nomefilial, cnpj, razaosocial, logradouro, numero, 
            complemento, bairro, cidade, estado, cep, telefonefixo, nomeresponsavel,
            telefoneresponsavel, horarioiniciosemana, horariofimsemana, horarioiniciosabado,
            horariofimsabado, horarioiniciodomingo, horariofimdomingo, ativo } = request.body;

        await connection('clientefilial').where('id', id).update({            
            bandeiraid,
            clienteid,
            ced,
            nomefilial,
            cnpj,
            razaosocial,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            nomeresponsavel,
            telefoneresponsavel,
            horarioiniciosemana,
            horariofimsemana,
            horarioiniciosabado,
            horariofimsabado,
            horarioiniciodomingo,
            horariofimdomingo,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
};