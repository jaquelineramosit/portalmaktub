const { first } = require('../../database/connection');
const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        
        const { grupoempresarialId } = request.query;
        
        try {
            const bandeira = await connection('bandeira')
            .join('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
            .leftJoin('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
            .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
            .modify(function (queryBuilder) {
                if (grupoempresarialId && grupoempresarialId !== '') {
                    queryBuilder.where('bandeira.grupoempresarialid', grupoempresarialId);
                }
            })
            .select([
                'bandeira.*', 
                'usuario.nome as nomeusuario',
                'grupoempresarial.nomegrupoempresarial',
                'cliente.nomecliente',
            ]);
        
            return response.status(200).json(bandeira);
        } catch (error) {
            return response.status(404).json(error.message);
        }
        
    },

    async getById (request, response) {
        try {
            
            const  { id }  = request.params;
            const { grupoempresarialId } = request.query;

            const bandeira = await connection('bandeira')
                .where('bandeira.id', id)
                .join('usuario', 'usuario.id', '=', 'bandeira.usuarioid') 
                .leftJoin('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
                .leftJoin('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
                .modify(function (queryBuilder) {
                    if (grupoempresarialId && grupoempresarialId !== 'Selecione...') {
                        queryBuilder.where('bandeira.grupoempresarialid', grupoempresarialId);
                    }
                })
                .select([
                    'bandeira.*', 
                    'usuario.nome as nomeusuario',
                    'grupoempresarial.nomegrupoempresarial',
                    'cliente.nomecliente',
                ])
                .first();
        
            return response.status(200).json(bandeira);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    },

    async create(request, response) {

        try {
            const  usuarioid  = request.headers.authorization;
            const  dataultmodif = getDate();

            const { grupoempresarialid, nomebandeira, descricao, ativo } = request.body;
            
            const [id] = await connection('bandeira').insert({
                grupoempresarialid,
                nomebandeira, 
                descricao,
                ativo,
                dataultmodif,
                usuarioid
            })

            return response.status(200).json({ id });
        } catch (error) {
            return response.status(404).json(error.message);
        }
        
    },
    
    async update (request, response) {
        
        try {
            const   { id }   = request.params;
            const  usuarioid  = request.headers.authorization;
            const  dataultmodif = getDate();
            
            const { grupoempresarialid, nomebandeira, descricao, ativo } = request.body;

            await connection('bandeira').where('id', id).update({            
                grupoempresarialid, 
                nomebandeira, 
                descricao,
                ativo,
                dataultmodif,
                usuarioid
            });           

            return response.status(204).send();
        } catch (error) {
            return response.status(404).json(error.message);
        }
        
    },
    async getCount (request,response) {        

        const [count] = await connection('bandeira').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};