import validador from 'validator';

class FormValidator {

    constructor(validacoes) {
        this.validacoes = validacoes;
    }

    valida(state) {
        //console.log(state);

        //começa assumindo que está tudo válido, recebe o 
        //objeto do método valido.
        const validacao = this.valido();        

        this.validacoes.forEach(regra => { //loop em todos os campos do formulário
        
            console.log(regra);
            const campoValor = state[regra.campo.toString()];
            const args = regra.args || [];
            const metodoValidacoes = typeof regra.metodo == 'string' ? validador[regra.metodo] : regra.metodo; //valida se o método de validação é uma string
            
            

            //invoca o método específico para cada campo do forEach
            if (metodoValidacoes(campoValor, ...args, state) !== regra.validoQuando) {
                console.log("campoValor");
                console.log(campoValor);
                validacao[regra.campo] = {
                    isInvalid: true,
                    message: regra.mensagem
                }
                validacao.isValid = false;

            } else {
                validacao.isValid = true;
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