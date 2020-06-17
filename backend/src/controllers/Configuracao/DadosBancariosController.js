const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const dadosbancarios = await connection('dadosbancarios')
        .join('tecnico', 'tecnico.id', '=', 'dadosbancarios.tecnicoid')   
        .join('banco', 'banco.id', '=', 'dadosbancarios.bancoid')   
        .join('tipoconta', 'tipoconta.id', '=', 'dadosbancarios.tipocontaid') 
        .join('usuario', 'usuario.id', '=', 'dadosbancarios.usuarioid')   
        .select([
            'dadosbancarios.*',
            'tecnico.nometecnico',
            'banco.nomebanco',
            'tipoconta.nometipoconta',           
            'usuario.nome'
        ]);
    


        return response.json(dadosbancarios);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const dadosbancarios = await connection('dadosbancarios')
            .where('dadosbancarios.id', id)
            .join('tecnico', 'tecnico.id', '=', 'dadosbancarios.tecnicoid')   
            .join('banco', 'banco.id', '=', 'dadosbancarios.bancoid')   
            .join('tipoconta', 'tipoconta.id', '=', 'dadosbancarios.tipocontaid') 
            .join('usuario', 'usuario.id', '=', 'dadosbancarios.usuarioid')   
            .select([
                'dadosbancarios.*',
                'tecnico.nometecnico',
                'banco.nomebanco',
                'tipoconta.nometipoconta',           
                'usuario.nome'
            ])
            .first();
    
        return response.json(dadosbancarios);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { tecnicoid, bancoid, tipocontaid, agencia, conta, titularconta,
                doctitular, contapadrao, ativo } = request.body;
        
        const [id] = await connection('dadosbancarios').insert({            
            tecnicoid,
            bancoid,
            tipocontaid,
            agencia,
            conta,
            titularconta,
            doctitular,
            contapadrao,
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
        
        const { tecnicoid, bancoid, tipocontaid, agencia, conta, titularconta,
                doctitular, contapadrao, ativo } = request.body;

        await connection('dadosbancarios').where('id', id).update({            
            tecnicoid,
            bancoid,
            tipocontaid,
            agencia,
            conta,
            titularconta,
            doctitular,
            contapadrao,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('dadosbancarios').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};