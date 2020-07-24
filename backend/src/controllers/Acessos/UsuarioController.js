const connection = require('../../database/connection');
const getPassword = require('../../utils/getPassword');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const usuarios = await connection('usuario')
        .leftJoin('perfilacesso', 'perfilacesso.id', '=', 'usuario.perfilacessoid')
        .select([
            'usuario.*',
            'perfilacesso.nomeperfil',
        ]);
        return response.json(usuarios);
    },
    
    async getAtivo (request, response) {
        const clientes = await connection('usuario')
        .where('ativo', 1)
        .select([
        ]);
    
        return response.json(clientes);
    },

    async getById (request, response) {
        const { id }  = request.params;

        const usuario = await connection('usuario')
            .where('usuario.id', id)
            .leftJoin('perfilacesso', 'perfilacesso.id', '=', 'usuario.perfilacessoid')
            .select([
                'usuario.*',
                'perfilacesso.nomeperfil',
            ])
            .first();
    
        return response.json(usuario);
    },

    async create (request, response) {
        
        const  dataUltModif = getDate();

        const { perfilacessoid, nome, sobrenome, dataNasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, contatoemergencia, telefonecttoemergencia, email, login, senhaForm, ativo } = request.body;
                
        const senha = getPassword(senhaForm);

        const [id] = await connection('usuario').insert({
            perfilacessoid,
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
            contatoemergencia,
            telefonecttoemergencia,
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
        
        const { perfilacessoid, nome, sobrenome, dataNasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, contatoemergencia, telefonecttoemergencia, email, login, senhaForm, ativo } = request.body;

        const  dataUltModif = getDate();
        const senha = getPassword(senhaForm);          

        await connection('usuario').where('id', id).update({
            perfilacessoid,
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
            contatoemergencia, 
            telefonecttoemergencia,
            email,
            login,
            senha,
            ativo,
            dataUltModif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('usuario').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};