import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

  // codigo para carregar o react-select caso ele dependa de outro campo (aqui carrega os ids da ordem de servico de acordo com o tecnico)

  // case 'tecnicoid':
  //   if (value !== 'Selecione...') {
  //       api.get(`ordem-servico-tecnico/${value}`).then(response => {
  //           let serializedOptions = response.data;
  //           serializedOptions = serializedOptions.map((ordemservico) => {
  //               return {
  //                   label: ordemservico.id,
  //                   value: ordemservico.id
  //               }
  //           })
  //           setOptions(serializedOptions);

  //       });
  //   } else {
  //       setOptions([]);
  //   }
  //   break;

  //funcao ao selecionar id no multi select
  // function handleOSIdChange(newValue) {
    //     let osId = newValue;
    //     if (osId !== null) osId = osId.map(os => os.value);
    //     console.log(osId);
    // }

const MyComponent = () => (
  <div>
    <p>React Select</p>
    <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
    />
    {/* <Col md="3">
        <Label htmlFor="ordemServicoId">Ordem de Serviço</Label>
        <Select
            name="ordemservicoid"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={handleOSIdChange}
            options={options}
        />
    </Col> */}
  </div>
)

export default MyComponent;