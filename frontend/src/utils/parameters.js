/*
Autor: Jaqueline Ramos da Silva
Em: 19/09/2020
Objetivo: Este arquivo tem como objetivo ser uma biblioteca de parametros comuns e necessários para o funcionamento do sistema.
*/

import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

//Retorna uma lista de Status de Atendimento com base no que está cadastrado no sistema
//Parâmetros opcionais: status

export const statusAtendimento = (codStatus) => {
    
    if(codStatus === '') {
        //puxa a lista de status de atendimento
        useEffect(() => {
            api.get('status-atendimento').then(response => {
                return response.data;
            })
        }, []);            
    } else {
        //puxa apenas o status solicitado, caso ele exista
        useEffect(() => {
            api.get(`status-atendimento-id/${codStatus}`).then(response => {
                return response.data;
            })
        }, []);
        return valor;
    }
}