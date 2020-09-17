const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const adiantamentoos = await connection('adiantamentoos')
        .join('usuario', 'usuario.id', '=', 'adiantamentoos.usuarioid')
        .join('statusadiantamento', 'statusadiantamento.id', '=', 'adiantamentoos.statusadiantamentoid')
        .select([
            'adiantamentoos.*', 
            'statusadiantamento.status as statusAdiantamento',
            'usuario.nome'        
        ])
        .orderBy('adiantamentoos.dataadiantamento', 'desc');
    
        return response.json(adiantamentoos);
    },

    async getById (request, response) {
        const  { id }  = request.params;
        const adiantamentoos = await connection('adiantamentoos')
            .where('adiantamentoos.id', id)
            .join('usuario', 'usuario.id', '=', 'adiantamentoos.usuarioid')
            .join('statusadiantamento', 'statusadiantamento.id', '=', 'adiantamentoos.statusadiantamentoid')
            .select([
                'adiantamentoos.*', 
                'statusadiantamento.status',
                'usuario.nome'        
            ])
            .first();

        if (!adiantamentoos) {
            return response.status(400).json({ message : 'Adiantamento não encontrado.'});            
        };

        const ossDoAdiant = await connection('adiantamentoporos')
            .where('adiantamentoporos.adiantamentoosid', '=', id)
            .join('ordemservico', 'ordemservico.id', '=', 'adiantamentoporos.ordemservicoid')
            .join('clientefinal', 'clientefinal.id', '=', 'ordemservico.clientefinalid')
            .join('bandeira', 'bandeira.id', '=', 'clientefinal.bandeiraid')
            .join('grupoempresarial', 'grupoempresarial.id', '=', 'bandeira.grupoempresarialid')
            .join('cliente', 'cliente.id', '=', 'grupoempresarial.clienteid')
            .join('tecnico', 'tecnico.id', '=', 'ordemservico.tecnicoid')
            .join('tipoprojeto', 'tipoprojeto.id', '=', 'ordemservico.tipoprojetoid')            
            .select([
                'adiantamentoporos.*',
                'cliente.nomecliente',
                'clientefinal.nomeclientefinal',
                'tecnico.nometecnico',
                'tipoprojeto.nometipoprojeto',
                'ordemservico.*'
            ]);
    
        return response.json({ adiantamentoos, ossDoAdiant });
    },

    async create(request, response) {
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { valoradiantamento, dataadiantamento, dataquitacao, statusadiantamentoid, ativo, ossasalvar } = request.body;

        const ultimoNumeroAdiant = await connection('adiantamentoos')
            .max('adiantamentoos.numeroadiantamentoos as numeroadiantamentoos');
        let numeroadiantamentoos = ultimoNumeroAdiant[0].numeroadiantamentoos + 1;

        const trx = await connection.transaction();
        
        const adiantamentoOsAInserir = {
            numeroadiantamentoos,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        };

        const insertedIds = await trx('adiantamentoos').insert(adiantamentoOsAInserir);

        const adiantamentoOsId = insertedIds[0];

        const ossASalvar = ossasalvar
            .map((item => {
                return {
                    adiantamentoosid: adiantamentoOsId,
                    ordemservicoid: item.id,
                    valor: item.valorapagar,
                    ativo: 1,
                    dataultmodif,
                    usuarioid
                }
            }));
        
        await trx('adiantamentoporos').insert(ossASalvar);

        await trx.commit();

        return response.json({ adiantamentoOsId });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioid  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { valoradiantamento, dataadiantamento,
            dataquitacao, statusadiantamentoid, ativo } = request.body;

        await connection('adiantamentoos').where('id', id).update({
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            usuarioid,
            dataultmodif
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('adiantamentoos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};