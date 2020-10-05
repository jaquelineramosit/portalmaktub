import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { isAuthenticated } from "./services/auth";

const loading = () => <div className="animated fadeIn pt-3 text-center">Carregando...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Logon = React.lazy(() => import('./pages/Acessos/Logon'));
const Register = React.lazy(() => import('./pages/Acessos/Register'));



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {... rest} 
    render={props =>
      isAuthenticated() ? (
        <Component {... props} />
      ) : (
        <Redirect to={{pathname: '/', state: {from: props.location}}} />
      )
    } 
  />
);

class App extends Component {
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Página de Logon" render={props => <Logon {...props}/>} />
              <Route path="/profile" name="Minha Conta" component={props => <DefaultLayout {...props}/>} />
              <Route path="/register" name="Registre-se" render={props => <Register {...props}/>} />              
              
              {/* Ordem Serviço */}
              <PrivateRoute path="/dashboard" name="Home" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/ordem-servico" name="Ordem de Serviço" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/movimentacao-os" name="Movimentação OS" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/adiantamento-os" name="Adiantamento OS" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-ordem-servico" name="Lista de OS" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-movimentacao-os" name="Lista de Movimentação OS" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-adiantamento-os" name="LIsta de Adiantamento OS" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-cliente" name="Lista de Clientes" component={(props) => <DefaultLayout {...props} />}/>
              
              {/* Clientes */}
              <PrivateRoute path="/clientes" name="Cliente" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/cliente-final" name="Cliente Final" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/grupo-empresarial" name="Grupo Empresarial" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/bandeira" name="Bandeira" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-cliente" name="Lista de Clientes" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-cliente-final" name="Lista de Clientes Finais" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-grupo-empresarial" name="Lista de Grupos Empresariais" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-bandeira" name="Lista de Bandeiras" component={(props) => <DefaultLayout {...props} />}/>

              {/* Técnicos */}
              <PrivateRoute path="/tecnico" name="Técnico" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/tipo-tecnico" name="Tipo Técnico" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/disponibilidade" name="Disponibilidade" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-tecnicos" name="Lista de Técnicos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-tipo-tecnicos" name="Lista de Tipos Técnico" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-disponibilidade" name="Lista de Disponibilidades" component={(props) => <DefaultLayout {...props} />}/>

              {/* Projetos */}
              <PrivateRoute path="/tipo-projeto" name="Tipo Projeto" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/ferramentas" name="Ferramenta" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-tipo-projeto" name="Lista de Tipos Projetos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-ferramentas" name="Lista de Ferramentas" component={(props) => <DefaultLayout {...props} />}/>

              {/* Dados Bancários */}
              <PrivateRoute path="/dados-bancarios" name="Dados Bancários" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/banco" name="Bancos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/tipo-conta" name="Tipo Conta" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-dados-bancarios" name="Lista de Dados Bancários" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-banco" name="Lista de Bancos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-tipo-conta" name="Lista de Tipos Contas" component={(props) => <DefaultLayout {...props} />}/>

              {/* Status */}
              <PrivateRoute path="/status-atendimento" name="Status Atendimento" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/status-adiantamento" name="Status Adiantamento" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/status-cobranca" name="Status Cobrança" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/status-pagamento" name="Status Pagamento" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-status-atendimento" name="Lista de Status Atendimento" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-status-adiantamento" name="Lista de Status Adiantamento" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-status-cobranca" name="Lista de Status Cobrança" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-status-pagamento" name="Lista de Status Pagamento" component={(props) => <DefaultLayout {...props} />}/>

              {/* Acesso */}
              <PrivateRoute path="/modulos" name="Módulo" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/paginas" name="Página" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/sub-paginas" name="Sub Página" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/funcao" name="Função" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/perfil-acesso" name="Perfil de Acesso" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/permissao-acesso" name="Permissão de Acesso" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/usuarios" name="Usuário" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/profile" name="Minha Conta" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-modulos" name="Lista de Módulos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-paginas" name="Lista de Páginas" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-sub-paginas" name="Lista de Sub Páginas" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-funcao" name="Lista de Funções" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-perfil-acesso" name="Lista de Perfis de Acessos" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-permissao-acesso" name="Lista de Permissões de Acesso" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/lista-usuarios" name="Lista de Usuários" component={(props) => <DefaultLayout {...props} />}/>
              
              {/* Relatórios */}
              <PrivateRoute path="/rel-projetoxsolicitacoes" name="Relatório de Projeto x Solicitações" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-projetoxcliente" name="Relatório de Projeto x Cliente" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-projetoxtecnico" name="Relatório de Projeto x Técnico" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-projetoxfaturado" name="Relatório de Projeto x Faturado" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-clientexfaturado" name="Relatório de Cliente x Faturado" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-tecnicoxfaturado" name="Relatório de Técnico x Faturado" component={(props) => <DefaultLayout {...props} />}/>
              <PrivateRoute path="/rel-custoxtecnico" name="Relatório de Custo x Técnico" component={(props) => <DefaultLayout {...props} />}/>
        
              <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
