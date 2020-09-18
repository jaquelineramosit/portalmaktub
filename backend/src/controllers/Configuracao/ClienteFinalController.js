const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { bandeiraId } = request.query;

        const clientefinal = await connection('clientefinal')
        .leftJoin('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid') 
        .leftJoin('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
        .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')  
        .join('usuario', 'usuario.id', '=', 'clientefinal.usuarioid')
        .modify(function (queryBuilder) {
            if (bandeiraId && bandeiraId !== '') {
                queryBuilder.where('clientefinal.bandeiraid', bandeiraId);
            }
        })
        .select([
            'clientefinal.*',
            'bandeira.nomebandeira',
            'clientefinal.bandeiraid',
            'bandeira.grupoempresarialid',
            'grupoempresarial.nomegrupoempresarial',
            'cliente.nomecliente',
            'grupoempresarial.clienteid',
            'usuario.nome'
        ]);
    
        return response.json(clientefinal);
    },

    async getById (request, response) {
        const { bandeiraId } = request.query;
        const  { id }  = request.params;

        const clientefinal = await connection('clientefinal')
            .where('clientefinal.id', id)
            .leftJoin('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid') 
            .leftJoin('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
            .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')  
            .join('usuario', 'usuario.id', '=', 'clientefinal.usuarioid') 
            .modify(function (queryBuilder) {
                if (bandeiraId && bandeiraId !== '') {
                    queryBuilder.where('clientefinal.bandeiraid', bandeiraId);
                }
            }) 
            .select([
                'clientefinal.*',
                'bandeira.nomebandeira',
                'clientefinal.bandeiraid',
                'bandeira.grupoempresarialid',
                'grupoempresarial.nomegrupoempresarial',
                'cliente.nomecliente',
                'grupoempresarial.clienteid',
                'usuario.nome'
            ])
            .first();
    
        return response.json(clientefinal);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { bandeiraid, ced, nomeclientefinal, cnpj, razaosocial, logradouro, numero, 
                complemento, bairro, cidade, estado, cep, telefonefixo, nomeresponsavel,
                telefoneresponsavel, horarioiniciosemana, horariofimsemana, horarioiniciosabado,
                horariofimsabado, horarioiniciodomingo, horariofimdomingo, ativo } = request.body;
        
        const [id] = await connection('clientefinal').insert({            
            bandeiraid,
            ced,
            nomeclientefinal,
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
        
        const { bandeiraid, ced, nomeclientefinal, cnpj, razaosocial, logradouro, numero, 
            complemento, bairro, cidade, estado, cep, telefonefixo, nomeresponsavel,
            telefoneresponsavel, horarioiniciosemana, horariofimsemana, horarioiniciosabado,
            horariofimsabado, horarioiniciodomingo, horariofimdomingo, ativo } = request.body;

        await connection('clientefinal').where('id', id).update({            
            bandeiraid,
            ced,
            nomeclientefinal,
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
    async getCount (request,response) {        

        const [count] = await connection('clientefinal').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};