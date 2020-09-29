const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        try {
            const { page = 1 } = request.query;
            const ferramentaos = await connection('ferramentaos')
                .join('ferramenta', 'ferramenta.id', '=', 'ferramentaos.ferramentaid')
                .join('ordemservico', 'ordemservico.id', '=', 'ferramentaos.ordemservicoid')
                .join('usuario', 'usuario.id', '=', 'ferramentaos.usuarioid')
                .limit(20) //limita o retorno dos registros
                .offset((page - 1) * 20) //paginacao
                .select([
                    'ferramentaos.*',
                    'ordemservico.numeroos',
                    'ferramenta.codferramenta',
                    'usuario.nome'
                ]);

            return response.status(200).json(ferramentaos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    async getById(request, response) {
        try {
            const { id } = request.params;

            const ferramentaos = await connection('ferramentaos')
                .where('ferramentaos.id', id)
                .join('ferramenta', 'ferramenta.id', '=', 'ferramentaos.ferramentaid')
                .join('ordemservico', 'ordemservico.id', '=', 'ferramentaos.ordemservicoid')
                .join('usuario', 'usuario.id', '=', 'ferramentaos.usuarioid')
                .select([
                    'ferramentaos.*',
                    'ordemservico.numeroos',
                    'ferramenta.codferramenta',
                    'usuario.nome'
                ])
                .first();

            return response.status(200).json(ferramentaos);
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao acessar os dados.' })
        }
    },

    // async getByOrdemServicoId (request, response) {
    //     const  { ordemServicoId }  = request.params;

    //     const ferramentaos = await connection('ferramentaos')
    //         .where('ferramentaos.ordemservicoid', ordemServicoId)
    //         .join('ferramenta', 'ferramenta.id', '=', 'ferramentaos.ferramentaid') 
    //         .join('ordemservico', 'ordemservico.id', '=', 'ferramentaos.ordemservicoid') 
    //         .join('usuario', 'usuario.id', '=', 'ferramentaos.usuarioid')   
    //         .select([
    //             'ferramentaos.*',
    //             'ordemservico.numeroos',
    //             'ferramenta.codferramenta',
    //             'usuario.nome'
    //         ]);

    //     return response.json(ferramentaos);
    // },


    async create(request, response) {
        try {
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { ferramentaid, ordemservicoid, observacao, ativo } = request.body;

            const [id] = await connection('ferramentaos').insert({
                ferramentaid,
                ordemservicoid,
                observacao,
                ativo,
                dataultmodif,
                usuarioid
            })

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },

    async update(request, response) {
        try {
            const { id } = request.params;
            const usuarioid = request.headers.authorization;
            const dataultmodif = getDate();

            const { ferramentaid, ordemservicoid, observacao, ativo } = request.body;

            await connection('ferramentaos').where('id', id).update({
                ferramentaid,
                ordemservicoid,
                observacao,
                ativo,
                dataultmodif,
                usuarioid
            });

            return response.status(200).json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Ocorreu um erro ao criar um novo registro.' })
        }
    },
    async getCount(request, response) {

        const [count] = await connection('ferramentaos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};