/*
Autor: Jaqueline Ramos da Silva
Em: 27/08/2020
Objetivo: Esse controle tem o objetivo criar um objeto do tipo list-grpup-item para exibir o status.
*/
import React, { Fragment } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import {  ListGroupItem, } from 'reactstrap';
const dateFormat = require('dateformat');
const CardListStatus = (props) => {
    const movimentacaolog = props.movimentacaolog;
    const status = movimentacaolog.statusAtendimento; 
    var classDefault = "list-group-item-divider text-grey p-2"
    var className = "";
    
    switch (status) {
        case "Novo":
            className = "list-group-item-accent-info ";
            // textclassName = "text-white";
            break
        case "Concluído":
            className = "list-group-item-accent-success "
            break
        case "Em Andamento":
            className = "list-group-item-accent-warning "
            break
        case "Cancelado":
            className = "list-group-item-accent-danger "
            break
        case "Agendado":
            className = "list-group-item-accent-lightBold "
            break     
        case "Improdutivo":
            className = "list-group-item-accent-dark "
            break 
        case "Pago":
            className = "list-group-item-accent-success "
            break 
        case "Nota Recebida":
            className = "list-group-item-accent-info "
            break
        case "Nao Executado":
            className = "list-group-item-accent-danger "
            break
        case "Enviada ao Financeiro":
            className = "list-group-item-accent-lightBold "
            break  
        case "Nao Faturado":
            className = "list-group-item-accent-warning "
            break  
        case "Faturado":
            className = "list-group-item-accent-success "
            break  
        case "Programados":
            className = "list-group-item-accent-info "
            break 
        case "Nao Pago":
            className = "list-group-item-accent-danger "
            break 
        }
        var classNova = {className, classDefault}      
        
        const PopOverMovimentacao = (props) => {
            return (
                <Popover id={`popover-basic${props.id}`}>
                    <Popover.Title as="h3">Observações</Popover.Title>
                    <Popover.Content>
                        {props.obs}
                    </Popover.Content>
                </Popover>
            )
        };
          
    return (
        <Fragment>
            <ListGroupItem className={`${classNova.className}${classNova.classDefault}`}>
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
                <div>
                    <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; Em: {dateFormat(movimentacaolog.dataultmodif, "dd/mm/yyyy")}   {/* às {dateFormat(movimentacaolog.dataultmodif, "yyyy-mm-dd"} */}
                    </small>
                    <small className="text-muted float-right mr-2 mt-1">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={
                        <Popover id={`popover-basic${movimentacaolog.id}`}>
                            <Popover.Title as="h3">Observações</Popover.Title>
                            <Popover.Content>
                                {movimentacaolog.observacao}
                            </Popover.Content>
                        </Popover>
                    
                    // <PopOverMovimentacao id={movimentacaolog.id} obs={movimentacaolog.observacao} />}>
                    }>
                        <i className="icon-speech"></i>
                    </OverlayTrigger>
                    </small>
                </div>
                                                      
            </ListGroupItem>
        </Fragment>
    )
} 
export default CardListStatus;