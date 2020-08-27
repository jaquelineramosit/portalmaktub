/*
Autor: Jaqueline Ramos da Silva
Em: 27/08/2020
Objetivo: Esse controle tem o objetivo criar um objeto do tipo list-grpup-item para exibir o status.
*/
import React, { Fragment } from 'react';
import {  ListGroupItem, } from 'reactstrap';
const CardListStatus = (props) => {
    const movimentacaolog = props.movimentacaolog;
    const status = movimentacaolog.status; 
    let classDefault = "list-group-item-divider text-grey p-2"
    let className = "";
    
    switch (status) {
        case "Novo":
            className = "list-group-item-accent-info";
            // textclassName = "text-white";
            break
        case "Concluído":
            className = "list-group-item-accent-success"
            break
        case "Em Andamento":
            className = "list-group-item-accent-warning"
            break
        case "Cancelado":
            className = "list-group-item-accent-danger"
            break
        case "Agendado":
            className = "list-group-item-accent-light"
            break     
        case "Improdutivo":
            className = "list-group-item-accent-dark"
            break 
        case "Pago":
            className = "list-group-item-accent-success"
            break 
        case "Nota Recebida":
            className = "list-group-item-accent-info"
            break
        case "Nao Executado":
            className = "list-group-item-accent-danger"
            break
        case "Enviada ao Financeiro":
            className = "list-group-item-accent-light"
            break  
        case "Nao Faturado":
            className = "list-group-item-accent-warning"
            break  
        case "Faturado":
            className = "list-group-item-accent-success"
            break  
        case "Programados":
            className = "list-group-item-accent-info"
            break 
        case "Nao Pago":
            className = "list-group-item-accent-danger"
            break 
        }
        className = `${className} ${classDefault}`  
    return (
        <Fragment>
            <ListGroupItem className={className}>
                <div className="avatar float-right">
                    <img className="img-avatar" src="assets/img/avatars/7.jpg" alt="Usuário"></img>
                </div>
                <div>
                    <small className="text-muted mr-2">
                        <i className="icon-layers"></i>
                    </small>
                    <strong>{movimentacaolog.statusAtendimento}</strong> 
                </div>
                <div>
                    <small className="text-muted mr-2">
                        <i className="icon-user"></i>                                                            
                    </small>
                    <small className="text-muted">
                        {movimentacaolog.nome}&nbsp;{movimentacaolog.sobrenome}
                    </small>                                        
                </div>
                <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; Em: {movimentacaolog.sobrenome} às {movimentacaolog.sobrenome}
                </small>                                        
            </ListGroupItem>
        </Fragment>
    )
} 
export default CardListStatus;