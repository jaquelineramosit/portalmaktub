const connection = require('../../database/connection');
const getPassword = require('../../utils/getPassword');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
        const { login, senhaForm } = request.body;

        console.log(request.body);

        const senhaBanco = await connection('usuario')
            .where('login', login)
            .select('senha')
            .first();

        console.log(bcrypt.compareSync(senhaForm, senhaBanco.senha));
        

        const usuario = await connection('usuario')
            .where('login', login)
            .select('nome', 'id')           
            .first();

        if((!usuario) || (bcrypt.compareSync(senhaForm, senhaBanco.senha) == false)) {
            return response.status(400).json({ error: 'Usuário e/ou senha inválidos' })
        }        
                      
        return response.json(usuario);
    }
}