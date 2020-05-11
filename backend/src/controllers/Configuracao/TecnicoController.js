const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tecnico = await connection('tecnico').select('*');
    
        return response.json(tecnico);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tecnico = await connection('tecnico')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tecnico);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { tipotecnicoid, nometecnico, rg, cpf, logradouro, numero, complemento, bairro, 
            cidade, estado, cep, telefonefixo, telefonecelular, ativo } = request.body;
        
        const [id] = await connection('tecnico').insert({
            tipotecnicoid,
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            telefonecelular,
            ativo,
            dataultmodif,
            usuarioid
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { tipotecnicoid, nometecnico, rg, cpf, logradouro, numero, complemento, bairro, 
            cidade, estado, cep, telefonefixo, telefonecelular, ativo } = request.body;

        await connection('tecnico').where('id', id).update({
            tipotecnicoid,
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            telefonecelular, 
            ativo,
            dataultmodif,
            usuarioid
        });           

        return response.status(204).send();
    },
};