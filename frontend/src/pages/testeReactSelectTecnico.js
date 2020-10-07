import React, { Fragment, useEffect, useState} from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import api from '../../src/services/api';


export default function MultSelTecnico() {

  const [tecnicoPrioridade, setTecnicoPrioridade] = useState([]);
  const [tecnicoOutros, setTecnicoOutros] = useState([]);
  const [tecnicoidArray, setTecnicoIdArray] = useState([])
  const [tipoProjetoId, setTipoProjetoId] = useState(8)
  const [tecnicoid, setTecnicoId] = useState(8)
  
  let tipoProjetoIdInicial = 9;

  //setTecnicoIdArray([{value: 8, label: "Marcos Vinicios Viana Nunes"}]);
  //setTecnicoId(8)

 
  useEffect(() => {
    api.get(`ordem-servico/136`).then(response => {
      setTecnicoId(response.data.tecnicoid);
      setTecnicoIdArray([{value: response.data.tecnicoid, label: response.data.nometecnico}]);
      setTipoProjetoId(response.data.tipoprojetoid);      
    })
  }, []);

  console.log(tecnicoidArray)
  console.log(tipoProjetoId)
  console.log(tecnicoid)

  tipoProjetoIdInicial = tipoProjetoId;

  useEffect(() => {
    api.get(`tecnico?tipoProjetoId=${tipoProjetoIdInicial}`).then(response => {
      setTecnicoPrioridade(response.data);           
    })
  }, []);

  useEffect(() => {
    api.get(`tecnico?tipoProjetoIdOutros=${tipoProjetoIdInicial}`).then(response => {
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

  // console.log('tecnicoPrioridadeOpt');
  // console.log(tecnicoPrioridadeOpt);
  // console.log('tecnicoOutrosOpt');
  // console.log(tecnicoOutrosOpt);

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

  // const formatGroupLabel = data => (
  //   <div style={groupStyles}>
  //     <span>{data.label}</span>
  //     <span style={groupBadgeStyles}>{data.options.length}</span>
  //   </div>
  // );

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  //console.log();

  //let obj = groupedOptions.find(v => v.value === 2);
  //console.log(tecnicoid);

  return (
      <Select
        defaultValue={tecnicoidArray}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
      />

      // <Input type="select" id="cboCliente"
      //     value={tecnicoid}
      //     name="tecnicoid"
      //     //onChange={handleInputChange}
      // >
      //     <option value={""} defaultValue>Selecione...</option>
      //     {resultadoCard4.map(tecnico => (
      //         <option key={`cliente${tecnico.id}`} value={tecnico.id}>{tecnico.nometecnico}</option>
      //     ))}
      // </Input>
  );
}
