import React, { Fragment, useEffect, useState} from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import api from '../../src/services/api';
import TesteMensagens from './testeMensagens';


export default function MultSelTecnico() {

  const [tecnicoPrioridade, setTecnicoPrioridade] = useState([]);
  const [tecnicoOutros, setTecnicoOutros] = useState([]);
  const [tecnicoidArray, setTecnicoIdArray] = useState([])
  const [tipoProjetoId, setTipoProjetoId] = useState(8)
  const [tecnicoid, setTecnicoId] = useState(8)
  

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("ordem-servico/136");
      setTecnicoIdArray([{"value": response.data.tecnicoid, "label": response.data.nometecnico}]);
      setTipoProjetoId(response.data.tipoprojetoid);
    }
    loadProducts();
  }, []);

  let _tecnicoIdArray = tecnicoidArray;


  

  useEffect(() => {
    api.get(`tecnico?tipoProjetoId=${tipoProjetoId}`).then(response => {
      setTecnicoPrioridade(response.data);           
    })
  }, []);

  useEffect(() => {
    api.get(`tecnico?tipoProjetoIdOutros=${tipoProjetoId}`).then(response => {
      setTecnicoOutros(response.data);           
    })
  }, []);





  const tecnicoPrioridadeOpt = [

    tecnicoPrioridade.map(tecnico => ({
      value: tecnico.id,
      label: tecnico.nometecnico
    }))
  ]

  const tecnicoOutrosOpt = [

    tecnicoOutros.map(tecnico => ({
      value: tecnico.id,
      label: tecnico.nometecnico
    }))
  ]


  const groupedOptions = [
    {
      label: 'Prioridade',
      options: tecnicoPrioridadeOpt[0],
    },
    {
      label: 'Outros',
      options: tecnicoOutrosOpt[0],
    },
  ];

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  console.log('tecnicoPrioridadeOpt[1]')
  console.log(tecnicoPrioridadeOpt[0].find(t => t.value === 36))
  console.log(tecnicoOutrosOpt[0].find(t => t.value === 36))

  return (
    <Fragment>
      <Select
        //tecnicoidArray
        defaultValue={
          tecnicoidArray
        }
        value={tecnicoidArray}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
      />
    </Fragment>
  );
}
