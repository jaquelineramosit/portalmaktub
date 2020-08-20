/*
Autor: Jaqueline Ramos da Silva
Em: 19/08/2020
Objetivo: Esse controle tem o objetivo criar um objeto do tipo Badge de acordo com o status escolhido.
*/
import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';

const BadgeStatus = (props) => {
    const status = props.status;        
    var color = "";
    var textColor = "";
    
    switch (status) {
        case "Novo":
            color = "info";
            textColor = "text-white";
            break
        case "Concluído":
            color = "success"
            break
        case "Em Andamento":
            color = "warning"
            break
        case "Cancelado":
            color = "danger"
            break
        case "Agendado":
            color = "light"
            break     
        case "Improdutivo":
            color = "dark"
            break 
        case "Pago":
            color = "success"
            break 
        case "Nota Recebida":
            color = "info"
            break
        case "Nao Executado":
            color = "danger"
            break
        case "Enviada ao Financeiro":
            color = "light"
            break  
        case "Nao Faturado":
            color = "warning"
            break  
        case "Faturado":
            color = "success"
            break  
        case "Programados":
            color = "info"
            break 
        case "Nao Pago":
            color = "danger"
            break 
        }

        
    return (
        <Fragment>
            <Badge className={textColor} color={color}>{status}</Badge>
        </Fragment>
    )
} 
export default BadgeStatus;