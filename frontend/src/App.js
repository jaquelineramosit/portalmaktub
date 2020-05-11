import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Carregando...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Logon = React.lazy(() => import('./pages/Acessos/Logon'));
const Register = React.lazy(() => import('./pages/Acessos/Register'));


class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/logon" name="Página de Logon" render={props => <Logon {...props}/>} />
              <Route exact path="/register" name="Registre-se" render={props => <Register {...props}/>} />              
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
