const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tipoprojeto = await connection('tipoprojeto')
        .select('*')   
        return response.json(tipoprojeto);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tipoprojeto = await connection('tipoprojeto')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tipoprojeto);
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nometipoprojeto, receita, despesa, horas, valorhoraextra, valorhoratecnico, horadecimal, ativo, right} = request.body;
        
        const trx = await connection.transaction();
        try {
            const [tipoprojetoid] = await trx('tipoprojeto').insert({            
                nometipoprojeto,
                receita,
                despesa,
                horas,
                valorhoraextra,
                valorhoratecnico,
                horadecimal,
                ativo,
                usuarioid,
                dataultmodif
            })
            
            const tipoProjetoFerramenta = right.map((ferramentaItem) => {
                console.log(right)
                return {
                    ferramentaid: ferramentaItem.id,
                    tipoprojetoid: tipoprojetoid,
                    observacao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }                
            })
    
        

            await trx('tipoprojetoferramenta').insert(tipoProjetoFerramenta)
            trx.commit()
            return response.json({ tipoProjetoFerramenta });
        } catch (err) {
            trx.rollback()
            console.log(err)
            return response.send(err)
        }        
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { nometipoprojeto, receita, despesa, horas, valorhoraextra, horadecimal, valorhoratecnico, ativo, right } = request.body;

        const trx = await connection.transaction();
        try {
            await trx('tipoprojeto').where('id', id).update({                
                nometipoprojeto,
                receita,
                despesa,
                horas,
                valorhoraextra,
                valorhoratecnico,
                horadecimal,
                ativo,
                usuarioid,
                dataultmodif
            })
            
            //deleta os tipos de projeto x ferramenta e cadastra tudo de novo
            await trx('tipoprojetoferramenta').where('id', id).delete(tipoProjetoFerramenta)

            //cadastra novamente
            const tipoProjetoFerramenta = right.map((ferramentaItem) => {
                return {
                    ferramentaid: ferramentaItem.id,
                    tipoprojetoid: id,
                    observacao: '',
                    ativo: 1,
                    usuarioid: usuarioid,
                    dataultmodif: dataultmodif
                }                
            })
    
            await trx('tipoprojetoferramenta').insert(tipoProjetoFerramenta)
            trx.commit()
            return response.json({ tipoProjetoFerramenta });
        } catch (err) {
            trx.rollback()
            return response.send('ocorreu um erro ao salvar')
        }      


        await connection('tipoprojeto').where('id', id).update({            
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoraextra,
            valorhoratecnico,
            horadecimal,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('tipoprojeto').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};