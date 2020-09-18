/*
Autor: Jaqueline Ramos da Silva
Em: 18/09/2020
Objetivo: Este arquivo tem como objetivo disponibilizar mensagens de erros configuradas.
*/

import Toaster from '../components/Toaster'
export const messagePorStatus = statusHttp => {
    if(statusHttp === 200) {
        Toaster.exibeMensagem('success', "Incluido com sucesso!"); 
        return true
    } else {
        Toaster.exibeMensagem('error', "Ocorreu um erro ao cadastrar um novo registro");
        return false
    }
}

export const message = (status, msg) => {
    Toaster.exibeMensagem(status, msg);     
}