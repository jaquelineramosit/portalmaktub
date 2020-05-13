import React from 'react';

// Dashboards
const Dashboard = React.lazy(() => import('./pages/Dashboards/Dashboardv1/Dashboard'));
const Dashboardv2 = React.lazy(() => import('./pages/Dashboards/Dashboardv2/index'));
const Dashboardv3 = React.lazy(() => import('./pages/Dashboards/Dashboardv3/index'));

// Acessos
const Logon = React.lazy(() => import('./pages/Acessos/Logon'));
const Modulo = React.lazy(() => import('./pages/Acessos/Modulo'));
const Pagina = React.lazy(() => import('./pages/Acessos/Pagina'));
const Password = React.lazy(() => import('./pages/Acessos/Password'));
const PerfilAcesso = React.lazy(() => import('./pages/Acessos/PerfilAcesso'));
const PermissaoAcesso = React.lazy(() => import('./pages/Acessos/PermissaoAcesso'));
const Register = React.lazy(() => import('./pages/Acessos/Register'));
const Usuario = React.lazy(() => import('./pages/Acessos/Usuario'));


// Configurações
const Clientes = React.lazy(() => import('./pages/Configuracoes/Clientes'));
const Filiais = React.lazy(() => import('./pages/Configuracoes/Filiais'));
const Contatos = React.lazy(() => import('./pages/Configuracoes/Contatos'));
const Departamentos = React.lazy(() => import('./pages/Configuracoes/Departamentos'));
const Distribuidores = React.lazy(() => import('./pages/Configuracoes/Distribuidores'));
const ExpectativasFechamento = React.lazy(() => import('./pages/Configuracoes/ExpectativasFechamento'));
const FasesPipe = React.lazy(() => import('./pages/Configuracoes/FasesPipe'));
const Marcas = React.lazy(() => import('./pages/Configuracoes/Marcas'));
const Metas = React.lazy(() => import('./pages/Configuracoes/Metas'));
const MetasVendedores = React.lazy(() => import('./pages/Configuracoes/MetasVendedores'));
const MotivosPerda = React.lazy(() => import('./pages/Configuracoes/MotivosPerda'));
const Paises = React.lazy(() => import('./pages/Configuracoes/Paises'));
const Pipes = React.lazy(() => import('./pages/Configuracoes/Pipes'));
const Produtos = React.lazy(() => import('./pages/Configuracoes/Produtos'));
const SegmentosMercado = React.lazy(() => import('./pages/Configuracoes/SegmentosMercado'));
const TiposAtividade = React.lazy(() => import('./pages/Configuracoes/TiposAtividade'));
const OrdemServic = React.lazy(() => import('./pages/OrdemServico/Cadastro'));


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
  { path: '/perfis-acesso', name: 'Perfis de Acesso', component: PerfilAcesso },
  { path: '/permissao-acesso', name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/register', name: 'Register', component: Register },
  { path: '/usuarios', name: 'Usuários', component: Usuario },



  //Configuração
  { path: '/filiais', name: 'Filiais', component: Filiais },
  { path: '/clientes', name: 'Clientes', component: Clientes },
  { path: '/contatos', name: 'Contatos', component: Contatos },
  { path: '/departamentos', name: 'Departamentos', component: Departamentos },
  { path: '/distribuidores', name: 'Distribuidores', component: Distribuidores },
  { path: '/expectativas-fechamento', name: 'Expectativas de Fechamento', component: ExpectativasFechamento },
  { path: '/fases-pipe', name: 'Fases do Pipe', component: FasesPipe },
  { path: '/marcas', name: 'Marcas', component: Marcas },
  { path: '/metas', name: 'Metas', component: Metas },
  { path: '/metas-vendedores', name: 'Metas de Vendedores', component: MetasVendedores },
  { path: '/motivos-perda', name: 'Motivos de Perda', component: MotivosPerda },
  { path: '/paises', name: 'Países', component: Paises },
  { path: '/pipes', name: 'Pipes', component: Pipes },
  { path: '/produtos', name: 'Produtos', component: Produtos },
  { path: '/segmentos-mercado', name: 'Segmentos de Mercado', component: SegmentosMercado },
  { path: '/tipos-atividade', name: 'Tipos de Atividade', component: TiposAtividade },
  


  //Ordem de serviço

  { path: '/ordem-servico', name: 'Ordem de Serviço', component: OrdemServic },
  
];

export default routes;
