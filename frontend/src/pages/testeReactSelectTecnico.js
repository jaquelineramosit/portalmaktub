import React, { Fragment, useEffect, useState} from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import api from '../../src/services/api';


export default function MultSelTecnico() {

  const [resultadoCard4, setResultadoCard4] = useState([]);
  const [tecnicoid, setTecnicoId] = useState(1)


  useEffect(() => {
    api.get('/tecnico').then(response => {
      setResultadoCard4(response.data);           
    })
  }, []);

  const tecnicoPrioritarioOptions = [
    { value: '1', label: 'Tecnico 1', isFixed: true },
    { value: '2', label: 'Tecnico 2' },
    { value: '3', label: 'Tecnico 3' },
    { value: '4', label: 'Tecnico 4' },
    { value: '5', label: 'Tecnico 5' },
    { value: '6', label: 'Tecnico 6' },
    { value: '7', label: 'Tecnico 7'  },
    { value: '8', label: 'Tecnico 8' },
    { value: '9', label: 'Tecnico 9' },
    { value: '10', label: 'Tecnico 10' },
  ];


  const tecnicoOutrosOptions = [
    { value: '11', label: 'Tecnico 11' },
    { value: '22', label: 'Tecnico 22' },
    { value: '33', label: 'Tecnico 33' },
    { value: '44', label: 'Tecnico 44' },
    { value: '55', label: 'Tecnico 55' },
  ];


  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];

  const groupedOptions = [
    {
      label: 'Prioridade',
      options: resultadoCard4,
    },
    {
      label: 'Outros',
      options: resultadoCard4,
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

  console.log(resultadoCard4);

  return (
      // <Select
      //   defaultValue={resultadoCard4[1]}
      //   options={groupedOptions}
      //   formatGroupLabel={formatGroupLabel}
      // />

      <Input type="select" id="cboCliente"
          value={tecnicoid}
          name="tecnicoid"
          //onChange={handleInputChange}
      >
          <option value={""} defaultValue>Selecione...</option>
          {resultadoCard4.map(tecnico => (
              <option key={`cliente${tecnico.id}`} value={tecnico.id}>{tecnico.nometecnico}</option>
          ))}
      </Input>
  );
}
