const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll(request, response) {
        const { tipoProjetoId } = request.query;

        const tecnico = await connection('tecnico')            
            .join('usuario', 'usuario.id', '=', 'tecnico.usuarioid')
            .join('tipotecnico', 'tipotecnico.id', '=', 'tecnico.tipotecnicoid')
            .join('tipoprojetotecnico', 'tipoprojetotecnico.tecnicoid', '=', 'tecnico.id')
            .modify(function(queryBuilder) {
                if ( tipoProjetoId && tipoProjetoId !== 'Selecione...' ) {
                    queryBuilder.where('tipoprojetotecnico.tipoprojetoid', tipoProjetoId);
                }
            })
            .select([
                'tecnico.*',
                'tipotecnico.id as tipotecnicoid',
                'tipotecnico.nometipotecnico',
                'tipotecnico.desctipotecnico', 
                'usuario.nome'       
            ])
            .distinct();

        return response.json(tecnico);
    },

    async getById(request, response) {
        const { id } = request.params;

        const tecnico = await connection('tecnico')
            .where('tecnico.id', id)
            .join('usuario', 'usuario.id', '=', 'tecnico.usuarioid')
            .join('tipotecnico', 'tipotecnico.id', '=', 'tecnico.tipotecnicoid')
            .select([
                'tecnico.*',
                'tipotecnico.nometipotecnico',
                'tipotecnico.desctipotecnico',
                'usuario.nome'
            ])
            .first();

        return response.json(tecnico);
    },

    async create(request, response) {
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { tipotecnicoid, nomecontatoemergencial, telefonecttoemergencial, nometecnico, rg, cpf, logradouro, numero, complemento, bairro,
            cidade, estado, cep, telefonefixo, telefonecelular, ativo } = request.body;

        const [id] = await connection('tecnico').insert({
            tipotecnicoid,
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            telefonecelular,
            nomecontatoemergencial,
            telefonecttoemergencial,
            ativo,
            dataultmodif,
            usuarioid
        })

        return response.json({ id });
    },

    async update(request, response) {
        const { id } = request.params;
        const usuarioid = request.headers.authorization;
        const dataultmodif = getDate();

        const { tipotecnicoid, telefonecttoemergencial, nomecontatoemergencial, nometecnico, rg, cpf, logradouro, numero, complemento, bairro,
            cidade, estado, cep, telefonefixo, telefonecelular, ativo } = request.body;

        await connection('tecnico').where('id', id).update({
            tipotecnicoid,
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            telefonecelular,
            telefonecttoemergencial,
            nomecontatoemergencial,
            ativo,
            dataultmodif,
            usuarioid
        });

        return response.status(204).send();
    },
    async getCount(request, response) {

        const [count] = await connection('tecnico').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);
    }
};