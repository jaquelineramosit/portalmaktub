const connection = require('../../database/connection');
const getPassword = require('../../utils/getPassword');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll(request, response) {
        try {
            const usuarios = await connection('usuario').select('*');

            return response.status(200).json(usuarios);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const usuario = await connection('usuario')
                .where('id', id)
                .select()
                .first();

            return response.status(200).json(usuario);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async create(request, response) {
        try {
            const dataUltModif = getDate();

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
            return response.status(200).json({ id, login });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, sobrenome, dataNasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, email, login, senhaForm, ativo } = request.body;

        const dataUltModif = getDate();
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