import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNasc, setDataNasc] = useState('0000-00-00');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [senhaForm, setSenhaForm] = useState('');
  const [ativo] = useState(1);

  const history = useHistory();


  async function handleRegister(e) {
    e.preventDefault();
    
    const data = {
      nome,
      sobrenome,
      dataNasc,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      telefone,
      celular,
      cpf,
      rg,
      genero,
      email,
      login,
      senhaForm,
      ativo
    };

    try {

      const response = await api.post('usuario', data);
      alert(`Seu login de acesso: ${response.data.login}`);      
      history.push('/');

    } catch (err) {

      alert('Erro no cadastro, tente novamente.');

    }
  }

  return (
      <div className="register-container">
          <div className="content">
              <section>
                  <h1>Cadastro</h1>                                        
              </section>
                
          </div>
      </div>
    );   
}