const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const cliente = await connection('cliente')
        .join('usuario', 'usuario.id', '=', 'cliente.usuarioid') 
        .join('parceiro', 'parceiro.id', '=', 'cliente.parceiroid') 
        .select([
            'cliente.*', 
            'parceiro.nomeparceiro',
            'usuario.nome'
        ]);
        
    
        return response.json(cliente);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const cliente = await connection('cliente')
            .where('cliente.id', id)
            .join('usuario', 'usuario.id', '=', 'cliente.usuarioid') 
            .join('parceiro', 'parceiro.id', '=', 'cliente.parceiroid') 
            .select([
                'cliente.*', 
                'parceiro.nomeparceiro',
                'usuario.nome'
            ])            
            .first();
    
        return response.json(cliente);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { parceiroid, nomecliente, cnpj, razaosocial, logradouro, numero, complemento, 
                bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
                telefoneresponsavel, ativo } = request.body;
        
        const [id] = await connection('cliente').insert({            
            parceiroid,
            nomecliente,
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
            telefonecelular,
            nomeresponsavel,
            telefoneresponsavel,
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
        
        const { parceiroid, nomecliente, cnpj, razaosocial, logradouro, numero, complemento, 
                bairro, cidade, estado, cep, telefonefixo, telefonecelular, nomeresponsavel,
                telefoneresponsavel, ativo } = request.body;

        await connection('cliente').where('id', id).update({            
            parceiroid,
            nomecliente,
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
            telefonecelular,
            nomeresponsavel,
            telefoneresponsavel,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
};