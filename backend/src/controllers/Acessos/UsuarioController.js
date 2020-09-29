const connection = require('../../database/connection');
const knex = require('../../database/knex');
const getPassword = require('../../utils/getPassword');
const getDate = require('../../utils/getDate');

module.exports = {
    async getAll (request, response) {
        const usuarios = await connection('usuario')
        .innerJoin('perfilacessousuario', 'perfilacessousuario.usuarioid', '=', 'usuario.id')
        .innerJoin('perfilacesso', 'perfilacesso.id', '=', 'perfilacessousuario.perfilacessoid')
        
        .select([
            'usuario.*',
            'perfilacesso.id as perfilacessoid',
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
            .innerJoin('perfilacessousuario', 'perfilacessousuario.usuarioid', '=', 'usuario.id')
            .innerJoin('perfilacesso', 'perfilacesso.id', '=', 'perfilacessousuario.perfilacessoid')
            .select([
                'usuario.*',
                'perfilacesso.id as perfilacessoid',
                'perfilacesso.nomeperfil',
            ])
            .first();
    
        return response.json(usuario);
    },

    async create (request, response) {
        
        const  dataUltModif = getDate();

        const { perfilacessoid, nome, sobrenome, datanasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, contatoemergencia, telefonecttoemergencia, email, login, senhaForm, ativo } = request.body;
                
        const senhaHash = getPassword(senhaForm);
        
        const objetoRetorno = 
            knex.transaction(function(trx) {
                return knex('usuario').transacting(trx).insert({
                    nome,
                    sobrenome, 
                    datanasc,
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
                    senha: senhaHash,            
                    ativo,
                    dataUltModif
                }).then(function(usuarioId){ 
                    if(usuarioId[0]) {                    
                        return knex('perfilacessousuario').transacting(trx).insert({
                            perfilacessoid,
                            usuarioid: usuarioId[0],
                            ativo,
                            dataUltModif
                        }) .then(function(perfilAcessoUsuarioId) {                     
                            if(perfilAcessoUsuarioId[0]) {
                                trx.commit;
                                return response.status(200).json({usuarioId: usuarioId[0]})
                            } else {
                                trx.rollback;
                                return response.status(400).json('Ocorreu um erro ao salvar Perfil de Acesso')
                            }                            
                        })
                    } else {
                        trx.rollback;
                        return response.status(400).json('Ocorreu um erro ao salvar Usuário')
                    }       
                })         
                .catch(trx.rollback);
            })
            .then(function(resp) {
                return response.json(resp);
            })
            .catch(function(err) {
                return response.status(400).json(err.message)
            });
    },

    async update (request, response) {
        const { id } = request.params;
        
        const { perfilacessoid, nome, sobrenome, datanasc, logradouro, numero, complemento, bairro, cep, cidade, estado,
            telefone, celular, cpf, rg, genero, contatoemergencia, telefonecttoemergencia, email, login, senhaForm, ativo } = request.body;

        const  dataUltModif = getDate();
        const senhaHash = getPassword(senhaForm);          

        const objetoRetorno = 
            knex.transaction(function(trx) {
                return knex('usuario').transacting(trx).where('id', id).update({
                    perfilacessoid,
                    nome,
                    sobrenome, 
                    datanasc,
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
                    senha: senhaHash,
                    ativo,
                    dataUltModif
                })
                // .then(function(){ 
                //     return knex('perfilacessousuario').transacting(trx).where('usuarioid', id).update({
                //         perfilacessoid,
                //         usuarioid: id,
                //         ativo,
                //         dataUltModif
                //     }).then(function() {                     
                //         trx.commit;
                //         return response.status(200).json({usuarioId: id})                            
                //     })     
                // })         
                .catch(trx.rollback);
            })
            .then(function(resp) {
                return response.json(resp);
            })
            .catch(function(err) {
                return response.status(400).json(err.message)
            });         

        //return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('usuario').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};