import React from 'react';

// Dashboards
const Dashboard = React.lazy(() => import('./pages/Dashboards/Dashboardv1/Dashboard'));
const Dashboardv2 = React.lazy(() => import('./pages/Dashboards/Dashboardv2/index'));
const Dashboardv3 = React.lazy(() => import('./pages/Dashboards/Dashboardv3/index'));

// Acessos
const Logon = React.lazy(() => import('./pages/Acessos/Logon'));
const Modulo = React.lazy(() => import('./pages/Acessos/Modulo'));
const Pagina = React.lazy(() => import('./pages/Acessos/Pagina'));
const SubPagina = React.lazy(() => import('./pages/Acessos/SubPagina'));
const Password = React.lazy(() => import('./pages/Acessos/Password'));
const PerfilAcesso = React.lazy(() => import('./pages/Acessos/PerfilAcesso'));
const PermissaoAcesso = React.lazy(() => import('./pages/Acessos/PermissaoAcesso'));
const Register = React.lazy(() => import('./pages/Acessos/Register'));
const Funcao = React.lazy(() => import('./pages/Acessos/Funcao'));
const Usuario = React.lazy(() => import('./pages/Acessos/Usuario'));


// Configurações
const Clientes = React.lazy(() => import('./pages/Configuracoes/Clientes'));
const Filiais = React.lazy(() => import('./pages/Configuracoes/Filiais'));
const Bandeira = React.lazy(() => import('./pages/Configuracoes/Bandeira'));
const Parceiros = React.lazy(() => import('./pages/Configuracoes/Parceiros'));
const Tecnico = React.lazy(() => import('./pages/Configuracoes/Tecnico'));
const Tipotecnico = React.lazy(() => import('./pages/Configuracoes/Tipotecnico'));
const Disponibilidade = React.lazy(() => import('./pages/Configuracoes/Disponibilidade'));
const Disponibilidadetecnico = React.lazy(() => import('./pages/Configuracoes/Disponibilidadetecnico'));
const Tipoprojeto = React.lazy(() => import('./pages/Configuracoes/Tipoprojeto'));
const Projetotecnico = React.lazy(() => import('./pages/Configuracoes/Projetotecnico'));
const Ferramentas = React.lazy(() => import('./pages/Configuracoes/Ferramentas'));
const Dadosbancarios = React.lazy(() => import('./pages/Configuracoes/Dadosbancarios'));
const Banco = React.lazy(() => import('./pages/Configuracoes/Banco'));
const Tipoconta = React.lazy(() => import('./pages/Configuracoes/Tipoconta'));
const Statusadiantamento = React.lazy(() => import('./pages/Configuracoes/Statusadiantamento'));
const Statusatendimento = React.lazy(() => import('./pages/Configuracoes/Statusatendimento'));
const Statuscobranca = React.lazy(() => import('./pages/Configuracoes/Statuscobranca'));
const Statuspagamento = React.lazy(() => import('./pages/Configuracoes/Statuspagamento'));


// Ordem de serviços
const OrdemServico = React.lazy(() => import('./pages/OrdemServico/Cadastro'));
const Movimentacaoos = React.lazy(() => import('./pages/OrdemServico/Movimentacaoos'));
const Adiantamentoos = React.lazy(() => import('./pages/OrdemServico/Adiantamentoos'));


// Tabelas
const Tabcliente = React.lazy(() => import('./pages/Tabelas/Tabcliente'));
const Tabfiliais = React.lazy(() => import('./pages/Tabelas/Tabfiliais'));
const Tabbandeira = React.lazy(() => import('./pages/Tabelas/Tabbandeira'));
const Tabparceiros = React.lazy(() => import('./pages/Tabelas/Tabparceiros'));
const Tabtecnicos = React.lazy(() => import('./pages/Tabelas/Tabtecnicos'));
const Tabtipotecnicos = React.lazy(() => import('./pages/Tabelas/Tabtipotecnicos'));
const Tabdisponibilidade = React.lazy(() => import('./pages/Tabelas/Tabdisponibilidade'));
const Tabdisponibilidadetecnico = React.lazy(() => import('./pages/Tabelas/Tabdisponibilidadetecnico'));
const Tabtipoprojeto = React.lazy(() => import('./pages/Tabelas/Tabtipoprojeto'));
const Tabprojetotecnico = React.lazy(() => import('./pages/Tabelas/Tabprojetotecnico'));
const Tabferramentas = React.lazy(() => import('./pages/Tabelas/Tabferramentas'));
const Tabdadosbancarios = React.lazy(() => import('./pages/Tabelas/Tabdadosbancarios'));
const Tabbanco = React.lazy(() => import('./pages/Tabelas/Tabbanco'));
const Tabtipoconta = React.lazy(() => import('./pages/Tabelas/Tabtipoconta'));
const Tabstatusadiantamento = React.lazy(() => import('./pages/Tabelas/Tabstatusadiantamento'));
const Tabstatusatendimento = React.lazy(() => import('./pages/Tabelas/Tabstatusatendimento'));
const Tabstatuscobranca = React.lazy(() => import('./pages/Tabelas/Tabstatuscobranca'));
const Tabstatuspagamento = React.lazy(() => import('./pages/Tabelas/Tabstatuspagamento'));
const Tabordemservico = React.lazy(() => import('./pages/Tabelas/Tabordemservico'));
const Tabmovimentacaoso = React.lazy(() => import('./pages/Tabelas/Tabmovimentacaoso'));
const Tabadiantamentoos = React.lazy(() => import('./pages/Tabelas/Tabadiantamentoos'));
const Tabusuarios = React.lazy(() => import('./pages/Tabelas/Tabusuarios'));
const Tabpermissaoacesso = React.lazy(() => import('./pages/Tabelas/Tabpermissaoacesso'));
const Tabperfisacesso = React.lazy(() => import('./pages/Tabelas/Tabperfisacesso'));
const Tabmodulos = React.lazy(() => import('./pages/Tabelas/Tabmodulos'));
const Tabpaginas = React.lazy(() => import('./pages/Tabelas/Tabpaginas'));
const Tabsubpagina = React.lazy(() => import('./pages/Tabelas/Tabsubpagina'));
const Tabfuncoes = React.lazy(() => import('./pages/Tabelas/Tabfuncoes'));

const routes = [



  // Dashboards
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboardv1', name: 'Dashboard', component: Dashboard },
  { path: '/dashboardv2', name: 'Dashboardv2', component: Dashboardv2 },
  { path: '/dashboardv3', name: 'Dashboardv3', component: Dashboardv3 },
  
  // Acessos
  { path: '/logon', name: 'Logon', component: Logon },
  { path: '/modulos', name: 'Módulos', component: Modulo },
  { path: '/paginas', name: 'Páginas', component: Pagina },
  { path: '/sub-paginas', name: 'Sub Páginas', component: SubPagina },   
  { path: '/perfis-acesso', name: 'Perfil de Acesso', component: PerfilAcesso },
  { path: '/permissao-acesso', name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/register', name: 'Register', component: Register },
  { path: '/funcao', name: 'Função', component: Funcao },
  { path: '/usuarios', name: 'Usuários', component: Usuario },



  //Configuração
  { path: '/filiais', name: 'Filiais', component: Filiais },
  { path: '/clientes', name: 'Clientes', component: Clientes },
  { path: '/bandeira', name: 'Bandeira', component: Bandeira },
  { path: '/parceiros', name: 'Parceiros', component: Parceiros },
  { path: '/tecnico', name: 'Tecnico', component: Tecnico },
  { path: '/tipo-tecnico', name: 'Tipo do Tecnico', component: Tipotecnico },
  { path: '/disponibilidade', name: 'disponibilidade', component: Disponibilidade },
  { path: '/disponibilidade-tecnico', name: 'Disponibilidade do tecnico', component: Disponibilidadetecnico },
  { path: '/tipo-projeto', name: 'Tipo de Projeto', component: Tipoprojeto },
  { path: '/projeto-tecnico', name: 'Projeto X Tecnico', component: Projetotecnico },
  { path: '/ferramentas', name: 'Ferramentas', component: Ferramentas },
  { path: '/dados-bancarios', name: 'Dados bancarios', component: Dadosbancarios },
  { path: '/banco', name: 'Banco', component: Banco },
  { path: '/tipo-conta', name: 'Tipo de Conta', component: Tipoconta },
  { path: '/status-adiantamento', name: 'Status de adiantamento', component: Statusadiantamento },
  { path: '/status-atendimento', name: 'Status de atendimento', component: Statusatendimento },
  { path: '/status-cobranca', name: 'Status de Cobranca', component: Statuscobranca },
  { path: '/status-pagamento', name: 'Status de pagamento', component: Statuspagamento },
  
  



  //Ordem de serviço

  { path: '/ordem-servico', name: 'Ordem de Serviço', component: OrdemServico },
  { path: '/movimentacao-os', name: 'Movimentacao de OS', component: Movimentacaoos },
  { path: '/adiantamento-os', name: 'Adiantamento de OS', component: Adiantamentoos },
  
  //Tabelas
{ path: '/tab-cliente', name: 'Lista de Clientes', component: Tabcliente },
{ path: '/tab-filiais', name: 'Lista de Filiais', component: Tabfiliais },
{ path: '/tab-bandeira', name: 'Lista de Bandeiras', component: Tabbandeira },
{ path: '/tab-parceiros', name: 'Lista de parceiros', component: Tabparceiros},
{ path: '/tab-tecnicos', name: 'Lista de Técnicos', component: Tabtecnicos},
{ path: '/tab-tipotecnicos', name: 'Lista de tipo de Técnicos', component: Tabtipotecnicos},
{ path: '/tab-disponibilidade', name: 'Lista de Disponibilidade', component: Tabdisponibilidade},
{ path: '/tab-disponibilidadetecnico', name: 'Lista de Disponibilidade de Técnico', component: Tabdisponibilidadetecnico},
{ path: '/tab-tipoprojeto', name: 'Lista de tipo de Projeto', component: Tabtipoprojeto},
{ path: '/tab-projetotecnico', name: 'Lista de Projeto X Técnico', component: Tabprojetotecnico},
{ path: '/tab-ferramentas', name: 'Lista de Disponibilidade de Técnico', component: Tabferramentas},
{ path: '/tab-dadosbancarios', name: 'Lista de Dados Bancários', component: Tabdadosbancarios},
{ path: '/tab-banco', name: 'Lista de Banco', component: Tabbanco},
{ path: '/tab-tipoconta', name: 'Lista de Tipo de Conta', component: Tabtipoconta},
{ path: '/tab-statusadiantamento', name: 'Lista de Status de Adiantamento', component: Tabstatusadiantamento},
{ path: '/tab-statusatendimento', name: 'Lista de  Status de Atendimento', component: Tabstatusatendimento},
{ path: '/tab-statuscobranca', name: 'Lista de Status de Cobrança', component: Tabstatuscobranca},
{ path: '/tab-statuspagamento', name: 'Lista de Status de pagamento', component: Tabstatuspagamento},
{ path: '/tab-ordemservico', name: 'Lista de Ordem de Serviço ', component: Tabordemservico},
{ path: '/tab-movimentacaoso', name: 'Lista de Movimentação de OS', component: Tabmovimentacaoso},
{ path: '/tab-adiantamentoos', name: 'Lista de Adiantamento de OS', component: Tabadiantamentoos},
{ path: '/tab-usuarios', name: 'Lista de Usuários', component: Tabusuarios},
{ path: '/tab-permissaoacesso', name: 'Lista de Permissão de Acesso', component: Tabpermissaoacesso},
{ path: '/tab-perfisacesso', name: 'Lista de Perfil de Acesso', component: Tabperfisacesso},
{ path: '/tab-modulos', name: 'Lista de Módulos', component: Tabmodulos},
{ path: '/tab-paginas', name: 'Lista de Páginas', component: Tabpaginas},
{ path: '/tab-subpaginas', name: 'Lista de Sub Páginas', component: Tabsubpagina},
{ path: '/tab-funcoes', name: 'Lista de Funções', component: Tabfuncoes},


];


export default routes;
