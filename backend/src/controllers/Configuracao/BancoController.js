const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        try {
            const banco = await connection('banco')
            .join('usuario', 'usuario.id', '=', 'banco.usuarioid') 
            .select([
                'banco.*', 
                'usuario.nome'
            ])
            .orderBy('banco.nomebanco', 'asc');
        
            return response.status(200).json(banco);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById (request, response) {
        try {
            const  { id }  = request.params;

            const banco = await connection('banco')
                .where('banco.id', id)
                .join('usuario', 'usuario.id', '=', 'banco.usuarioid') 
                .select([
                    'banco.*', 
                    'usuario.nome'
                ])            
                .first();
        
            return response.status(200).json(banco);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
        
    },

    async create(request, response) {
        try {
            const  usuarioid  = request.headers.authorization;
            const  dataultmodif = getDate();

            const { codbanco, nomebanco, ativo } = request.body;
            
            const [id] = await connection('banco').insert({
                codbanco,
                nomebanco, 
                ativo,
                dataultmodif,
                usuarioid
            })

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    
    async update (request, response) {
        try {
            const   { id }   = request.params;
            const  usuarioid  = request.headers.authorization;
            const  dataultmodif = getDate();
            
            const { codbanco, nomebanco, ativo } = request.body;

            await connection('banco').where('id', id).update({
                codbanco,
                nomebanco, 
                ativo,
                dataultmodif,
                usuarioid
            });           

            return response.status(200).send();
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount (request,response) {        

        const [count] = await connection('banco').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};