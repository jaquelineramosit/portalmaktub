import validador from 'validator';

class FormValidator {

    constructor(validacoes) {
        this.validacoes = validacoes;
    }

    valida(state) {

        //começa assumindo que está tudo válido, recebe o 
        //objeto do método valido.
        const validacao = this.valido();
        validacao.isValid = true;
        this.validacoes.forEach(regra => { //loop em todos os campos do formulário
        
            const campoValor = state[regra.campo.toString()];
            const args = regra.args || [];
            const metodoValidacoes = typeof regra.metodo == 'string' ? validador[regra.metodo] : regra.metodo; //valida se o método de validação é uma string
            
            //invoca o método específico para cada campo do forEach
            if (metodoValidacoes(campoValor, ...args, state) !== regra.validoQuando) {
                
                validacao[regra.campo] = {
                    isInvalid: true,
                    message: regra.mensagem
                }
                validacao.isValid = false;
            } 
        });  

        return validacao;      
    }

    valido() {        

        const validacao = {}; //criação do objeto

        this.validacoes.map(regra => (
            validacao[regra.campo] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validacao };
    }
}

export default FormValidator;