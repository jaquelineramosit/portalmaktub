/*
Autor: Jaqueline Ramos da Silva
Em: 18/09/2020
Objetivo: Este arquivo tem como objetivo ser uma biblioteca de funções úteis em todo o projeto.
*/

//Função retorna uma string vazia caso o valor seja nulo ou undefined

export const valorNulo = valor => {
    if(valor === null || valor === undefined) {
        return ''
    } else {
        return valor;
    }
}