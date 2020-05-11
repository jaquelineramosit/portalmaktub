const connection = require('../../database/connection');
const getPassword = require('../../utils/getPassword');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const usuarios = await connection('usuario').select('*');
    
        return response.json(usuarios);
    },

    async getById (request, response) {
        const { id }  = request.params;

        const usuario = await connection('usuario')
            .where('id', id)
            .select()
            .first();
    
        return response.json(usuario);
    },

    async create (request, response) {
        
        const  dataUltModif = getDate();

        const { nome, sobrenome, dataNasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, email, login, senhaForm, ativo } = request.body;

        console.log(request.body);
        
        const senha = getPassword(senhaForm);

        const [id] = await connection('usuario').insert({
            nome,
            sobrenome, 
            dataNasc,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefone,
            celular,
            cpf,
            rg,
            genero,
            email,
            login,
            senha,            
            ativo,
            dataUltModif
        })

        return response.json({ id, login });
    },

    async update (request, response) {
        const { id } = request.params;
        const { nome, sobrenome, dataNasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
                telefone, celular, cpf, rg, genero, email, login, senhaForm, ativo } = request.body;
        
        const  dataUltModif = getDate();
        const senha = getPassword(senhaForm);          

        await connection('usuario').where('id', id).update({
            nome,
            sobrenome, 
            dataNasc,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefone,
            celular,
            cpf,
            rg,
            genero,
            email,
            login,
            senha,
            ativo,
            dataUltModif
        });           

        return response.status(204).send();
    },
};