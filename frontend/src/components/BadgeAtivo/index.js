import React, { Fragment } from 'react';
import { Badge, FormText } from 'reactstrap';

const BadgeAtivo = (props) => {
    const ativo = props.ativo;
    var color = "";
    var text = "";
  

            if (ativo === 1) {
                color = "success";
                text='Ativo'
                
                
            } else {
                color = "danger"   ;
                text='Inativo'      
    }
    return (
        <Fragment>
            <Badge color={color}>{text}</Badge>
        </Fragment>
    )
}
export default BadgeAtivo;