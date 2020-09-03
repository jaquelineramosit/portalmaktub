const connection = require('../../database/connection');
const getPassword = require('../../utils/getPassword');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
        
        try {
            const { login, senha } = request.body;
        
            const senhaBanco = await connection('usuario')
                .where('login', login)
                .select('senha')
                .first();

            const usuario = await connection('usuario')
                .where('login', login)
                .select('nome', 'id')           
                .first();

            if((!usuario) || (bcrypt.compareSync(senha, senhaBanco.senha) == false)) {
                return response.status(400).json({ error: 'Usuário e/ou senha inválidos' })
            }        
                      
            return response.status(200).json(usuario);

        } catch (error) {
            return response.status(400).json({ error: 'Usuário e/ou senha inválidos' })
        }
    }
}