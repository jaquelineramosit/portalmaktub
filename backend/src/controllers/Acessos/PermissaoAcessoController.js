const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const acessopagina = await connection('permissaoacesso')
        .join('perfilacesso', 'perfilacesso.id', '=', 'permissaoacesso.perfilacessoid')
        .join('modulo', 'modulo.id', '=', 'permissaoacesso.moduloid')
        .join('pagina', 'pagina.id', '=', 'permissaoacesso.paginaid')
        .join('subpagina', 'subpagina.id', '=', 'permissaoacesso.subpaginaid')
        .join('funcao', 'funcao.id', '=', 'permissaoacesso.funcaoid')
        .join('usuario', 'usuario.id', '=', 'permissaoacesso.usuarioid')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'permissaoacesso.*',
            'perfilacesso.nomeperfil',
            'modulo.nomemodulo',
            'pagina.nomepagina',
            'subpagina.nomesubpagina',
            'funcao.nomefuncao',
            'usuario.nome'
        ]);
    
        return response.json(acessopagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const acessopagina = await connection('permissaoacesso')
            .where('permissaoacesso.id', id)
            .join('perfilacesso', 'perfilacesso.id', '=', 'permissaoacesso.perfilacessoid')
            .join('modulo', 'modulo.id', '=', 'permissaoacesso.moduloid')
            .join('pagina', 'pagina.id', '=', 'permissaoacesso.paginaid')
            .join('subpagina', 'subpagina.id', '=', 'permissaoacesso.subpaginaid')
            .join('funcao', 'funcao.id', '=', 'permissaoacesso.funcaoid')
            .join('usuario', 'usuario.id', '=', 'permissaoacesso.usuarioid')
            .select([
                'permissaoacesso.*',
                'perfilacesso.nomeperfil',
                'modulo.nomemodulo',
                'pagina.nomepagina',
                'subpagina.nomesubpagina',
                'funcao.nomefuncao',
                'usuario.nome'
            ])
            .first();
    
        return response.json(acessopagina);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;        
        const  dataUltModif = getDate();

        const {perfilacessoid, moduloid, paginaid, subpaginaid, funcaoid, ativo } = request.body;
        
        const [id] = await connection('permissaoacesso').insert({    
                perfilacessoid,
                moduloid,
                paginaid,
                subpaginaid,
                funcaoid,
                ativo,
                dataUltModif,
                usuarioId
        })

        return response.json({ id });
    },
    
        async update (request, response) {
            const   { id }   = request.params;
            const  usuarioId  = request.headers.authorization;            
            const  dataUltModif = getDate();

            const {perfilacessoId, moduloId, paginaId, descricao, ativo } = request.body;
    
            await connection('permissaoacesso').where('id', id).update({                
                perfilacessoId,
                moduloId,
                paginaId,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
        async getCount (request,response) {        

            const [count] = await connection('permissaoacesso').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };