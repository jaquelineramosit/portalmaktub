import React from 'react';

// Dashboards
const Dashboard = React.lazy(() => import('./pages/Dashboards/Dashboard'));
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
const Profile = React.lazy(() => import('./pages/Acessos/Profile'));

// Configurações
const Clientes = React.lazy(() => import('./pages/Configuracoes/Clientes'));
const ClienteFinal = React.lazy(() => import('./pages/Configuracoes/ClienteFinal'));
const Bandeira = React.lazy(() => import('./pages/Configuracoes/Bandeira'));
const GrupoEmpresarial = React.lazy(() => import('./pages/Configuracoes/GrupoEmpresarial'));
const Tecnico = React.lazy(() => import('./pages/Configuracoes/Tecnico'));
const TipoTecnico = React.lazy(() => import('./pages/Configuracoes/TipoTecnico'));
const Disponibilidade = React.lazy(() => import('./pages/Configuracoes/Disponibilidade'));
const DisponibilidadeDeTecnico = React.lazy(() => import('./pages/Configuracoes/DisponibilidadeDeTecnico'));
const Tipoprojeto = React.lazy(() => import('./pages/Configuracoes/TipoProjeto'));
const ProjetoTecnico = React.lazy(() => import('./pages/Configuracoes/ProjetoTecnico'));
const Ferramentas = React.lazy(() => import('./pages/Configuracoes/Ferramentas'));
const DadosBancarios = React.lazy(() => import('./pages/Configuracoes/DadosBancarios'));
const Banco = React.lazy(() => import('./pages/Configuracoes/Banco'));
const TipoConta = React.lazy(() => import('./pages/Configuracoes/TipoConta'));
const StatusAdiantamento = React.lazy(() => import('./pages/Configuracoes/StatusAdiantamento'));
const StatusAtendimento = React.lazy(() => import('./pages/Configuracoes/StatusAtendimento'));
const StatusCobranca = React.lazy(() => import('./pages/Configuracoes/StatusCobranca'));
const StatusPagamento = React.lazy(() => import('./pages/Configuracoes/StatusPagamento'));


// Ordem de serviços
const OrdemServico = React.lazy(() => import('./pages/OrdemServico/OrdemServico'));
const Movimentacaoos = React.lazy(() => import('./pages/OrdemServico/Movimentacaoos'));
const Adiantamentoos = React.lazy(() => import('./pages/OrdemServico/Adiantamentoos'));


// Tabelas
const ListaCliente = React.lazy(() => import('./pages/Listas/ListaCliente'));
const ListaClienteFinal = React.lazy(() => import('./pages/Listas/ListaClienteFinal'));
const ListaBandeira = React.lazy(() => import('./pages/Listas/ListaBandeira'));
const ListaGrupoEmpresarial= React.lazy(() => import('./pages/Listas/ListaGrupoEmpresarial'));
const ListaTecnicos = React.lazy(() => import('./pages/Listas/ListaTecnicos'));
const ListaTipoTecnicos = React.lazy(() => import('./pages/Listas/ListaTipoTecnicos'));
const ListaDisponibilidade = React.lazy(() => import('./pages/Listas/ListaDisponibilidade'));
const ListaDisponibilidadeTecnico = React.lazy(() => import('./pages/Listas/ListaDisponibilidadeTecnico'));
const ListaTipoProjeto = React.lazy(() => import('./pages/Listas/ListaTipoProjeto'));
const ListaProjetoTecnico = React.lazy(() => import('./pages/Listas/ListaProjetoTecnico'));
const ListaFerramentas = React.lazy(() => import('./pages/Listas/ListaFerramentas'));
const ListaDadosBancarios = React.lazy(() => import('./pages/Listas/ListaDadosBancarios'));
const ListaBanco = React.lazy(() => import('./pages/Listas/ListaBanco'));
const ListaTipoConta = React.lazy(() => import('./pages/Listas/ListaTipoConta'));
const ListaStatusAdiantamento = React.lazy(() => import('./pages/Listas/ListaStatusAdiantamento'));
const ListaStatusAtendimento = React.lazy(() => import('./pages/Listas/ListaStatusAtendimento'));
const ListaStatusCobranca = React.lazy(() => import('./pages/Listas/ListaStatusCobranca'));
const ListaStatusPagamento = React.lazy(() => import('./pages/Listas/ListaStatusPagamento'));
const ListaOrdemServico = React.lazy(() => import('./pages/Listas/ListaOrdemServico'));
const ListaMovimentacaoOS = React.lazy(() => import('./pages/Listas/ListaMovimentacaoOS'));
const ListaAdiantamentoOS = React.lazy(() => import('./pages/Listas/ListaAdiantamentoOS'));
const ListaUsuarios = React.lazy(() => import('./pages/Listas/ListaUsuarios'));
const ListaPermissaoAcesso = React.lazy(() => import('./pages/Listas/ListaPermissaoAcesso'));
const ListaPerfisAcesso = React.lazy(() => import('./pages/Listas/ListaPerfisAcesso'));
const ListaModulo = React.lazy(() => import('./pages/Listas/ListaModulo'));
const ListaPagina = React.lazy(() => import('./pages/Listas/ListaPagina'));
const ListaSubPagina = React.lazy(() => import('./pages/Listas/ListaSubPagina'));
const ListaFuncao = React.lazy(() => import('./pages/Listas/ListaFuncao'));
const pageNum = 0;

//Relatórios
const Relprojetosolicitacoes = React.lazy(() => import('./pages/Relatórios/Relatorio ProjetoxSolicitacoes'));
const Relprojetocliente = React.lazy(() => import('./pages/Relatórios/Relatorio ProjetoxCliente'));
const Relprojetotecnico = React.lazy(() => import('./pages/Relatórios/Relatorio ProjetoxTecnico'));
const Relprojetofaturado = React.lazy(() => import('./pages/Relatórios/Relatorio ProjetoxFaturado'));
const Relclientefaturado = React.lazy(() => import('./pages/Relatórios/Relatorio ClientexFaturado'));
const Reltecnicofaturado = React.lazy(() => import('./pages/Relatórios/Relatorio TecnicoxFaturado'));
const Relcustotecnico = React.lazy(() => import('./pages/Relatórios/Relatorio CustoxTecnico'));

const Collapse = React.lazy(() => import('./pages/Configuracoes/Collapse'));
const TesteMultiSelect = React.lazy(() => import('./pages/testeMultiSelect'));
const TesteMensagens = React.lazy(() => import('./pages/testeMensagens'));
const TesteToast = React.lazy(() => import('./pages/testeToast'));
const TesteReactSelect = React.lazy(() => import('./pages/testeReactSelect'));


const routes = [
  
  // Dashboards
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboardv2', name: 'Dashboardv2', component: Dashboardv2 },
  { path: '/dashboardv3', name: 'Dashboardv3', component: Dashboardv3 },
  
  // Acessos
  { path: '/logon', name: 'Logon', component: Logon },
  { path: '/modulos', exact:true, name: 'Módulos', component: Modulo },
  { path: '/modulos/:id', name: 'Módulos', component: Modulo },
  { path: '/paginas', exact:true, name: 'Páginas', component: Pagina },
  { path: '/paginas/:id', name: 'Páginas', component: Pagina },
  { path: '/sub-paginas', exact:true, name: 'Sub Páginas', component: SubPagina },  
  { path: '/sub-paginas/:id', name: 'Sub Páginas', component: SubPagina },    
  { path: '/perfis-acesso', exact:true, name: 'Perfil de Acesso', component: PerfilAcesso },
  { path: '/perfis-acesso/:id', name: 'Perfil de Acesso', component: PerfilAcesso },
  { path: '/permissao-acesso', exact:true, name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/permissao-acesso/:id', name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/register', name: 'Register', component: Register },
  { path: '/funcao', exact:true, name: 'Função', component: Funcao },
  { path: '/funcao/:id', name: 'Função', component: Funcao },
  { path: '/usuarios', exact:true, name: 'Usuários', component: Usuario },
  { path: '/usuarios/:id', name: 'Usuários', component: Usuario },
  { path: '/profile', name: 'Minha Conta', component: Profile },


  //Configuração
  { path: '/cliente-final', exact:true, name: 'Cliente Final', component: ClienteFinal },
  { path: '/cliente-final/:id', name: 'Cliente Final', component: ClienteFinal },
  { path: '/clientes',exact:true, name: 'Clientes', component: Clientes },
  { path: '/clientes/:id', name: 'Clientes', component: Clientes },
  { path: '/bandeira', exact:true, name: 'Bandeira', component: Bandeira },
  { path: '/bandeira/:id', name: 'Bandeira', component: Bandeira },
  { path: '/grupo-empresarial', exact:true, name: 'Grupo Empresarial', component: GrupoEmpresarial },
  { path: '/grupo-empresarial/:id', name: 'Grupo Empresarial', component: GrupoEmpresarial },
  { path: '/tecnico', exact:true, name: 'Tecnico', component: Tecnico },
  { path: '/tecnico/:id', name: 'Tecnico', component: Tecnico },
  { path: '/tipo-tecnico', exact:true, name: 'Tipo do Tecnico', component: TipoTecnico },
  { path: '/tipo-tecnico/:id', name: 'Tipo do Tecnico', component: TipoTecnico },
  { path: '/disponibilidade', exact:true, name: 'disponibilidade', component: Disponibilidade },
  { path: '/disponibilidade/:id', name: 'disponibilidade', component: Disponibilidade },
  { path: '/disponibilidade-tecnico', exact:true, name: 'Disponibilidade do tecnico', component: DisponibilidadeDeTecnico },
  { path: '/disponibilidade-tecnico/:id', name: 'Disponibilidade do tecnico', component: DisponibilidadeDeTecnico },
  { path: '/tipo-projeto', exact:true, name: 'Tipo de Projeto', component: Tipoprojeto },
  { path: '/tipo-projeto/:id', name: 'Tipo de Projeto', component: Tipoprojeto },
  { path: '/projeto-tecnico', exact:true, name: 'Projeto X Tecnico', component: ProjetoTecnico },
  { path: '/projeto-tecnico/:id', name: 'Projeto X Tecnico', component: ProjetoTecnico },
  { path: '/ferramentas', exact:true, name: 'Ferramentas', component: Ferramentas },
  { path: '/ferramentas/:id', name: 'Ferramentas', component: Ferramentas },
  { path: '/dados-bancarios', exact:true, name: 'Dados Bancarios', component: DadosBancarios },
  { path: '/dados-bancarios/:id', name: 'Dados Bancarios', component: DadosBancarios },
  { path: '/banco', exact:true,  name: 'Banco', component: Banco },
  { path: '/banco/:id', name: 'Banco', component: Banco },
  { path: '/tipo-conta', exact:true, name: 'Tipo de Conta', component: TipoConta },
  { path: '/tipo-conta/:id', name: 'Tipo de Conta', component: TipoConta },
  { path: '/status-adiantamento', exact:true, name: 'Status de adiantamento', component: StatusAdiantamento },
  { path: '/status-adiantamento/:id', name: 'Status de adiantamento', component: StatusAdiantamento },
  { path: '/status-atendimento', exact:true, name: 'Status de atendimento', component: StatusAtendimento },
  { path: '/status-atendimento/:id', name: 'Status de atendimento', component: StatusAtendimento },
  { path: '/status-cobranca', exact:true, name: 'Status de Cobranca', component: StatusCobranca },
  { path: '/status-cobranca/:id', name: 'Status de Cobranca', component: StatusCobranca },
  { path: '/status-pagamento', exact:true, name: 'Status de pagamento', component: StatusPagamento },
  { path: '/status-pagamento/:id', name: 'Status de pagamento', component: StatusPagamento },
  

  //Ordem de serviço

  { path: '/ordem-servico', exact:true, name: 'Ordem de Serviço', component: OrdemServico },
  { path: '/ordem-servico/:id', name: 'Ordem de Serviço', component: OrdemServico },
  { path: '/movimentacao-os', exact:true, name: 'Movimentacao de OS', component: Movimentacaoos },
  { path: '/movimentacao-os/:id', name: 'Movimentacao de OS', component: Movimentacaoos },
  { path: '/adiantamento-os', exact:true, name: 'Adiantamento de OS', component: Adiantamentoos },
  { path: '/adiantamento-os/:id', name: 'Adiantamento de OS', component: Adiantamentoos },
  
  //Listas
  { path: '/lista-cliente', name: 'Lista de Clientes', component: ListaCliente },
  { path: '/lista-cliente-final', name: 'Lista de Cliente Final', component: ListaClienteFinal },
  { path: '/lista-bandeira', name: 'Lista de Bandeiras', component: ListaBandeira },
  { path: '/lista-grupo-empresarial', name: 'Lista de Grupos Empresariais', component: ListaGrupoEmpresarial},
  { path: '/lista-tecnicos', name: 'Lista de Técnicos', component: ListaTecnicos},
  { path: '/lista-tipo-tecnicos', name: 'Lista de tipo de Técnicos', component: ListaTipoTecnicos},
  { path: '/lista-disponibilidade', name: 'Lista de Disponibilidade', component: ListaDisponibilidade},
  { path: '/lista-disponibilidade-tecnico', name: 'Lista de Disponibilidade de Técnico', component: ListaDisponibilidadeTecnico},
  { path: '/lista-tipo-projeto', name: 'Lista de tipo de Projeto', component: ListaTipoProjeto},
  { path: '/lista-projeto-tecnico', name: 'Lista de Projeto X Técnico', component: ListaProjetoTecnico},
  { path: '/lista-ferramentas', name: 'Lista de Disponibilidade de Técnico', component: ListaFerramentas},
  { path: '/lista-dados-bancarios', name: 'Lista de Dados Bancários', component: ListaDadosBancarios},
  { path: '/lista-banco', name: 'Lista de Banco', component: ListaBanco},
  { path: '/lista-tipo-conta', name: 'Lista de Tipo de Conta', component: ListaTipoConta},
  { path: '/lista-status-adiantamento', name: 'Lista de Status de Adiantamento', component: ListaStatusAdiantamento},
  { path: '/lista-status-atendimento', name: 'Lista de  Status de Atendimento', component: ListaStatusAtendimento},
  { path: '/lista-status-cobranca', name: 'Lista de Status de Cobrança', component: ListaStatusCobranca},
  { path: '/lista-status-pagamento', name: 'Lista de Status de pagamento', component: ListaStatusPagamento},
  { path: '/lista-ordem-servico', queryParams : { page: pageNum }, exact: true, name: 'Lista de Ordem de Serviço ', component: ListaOrdemServico},
  { path: '/lista-movimentacao-os', name: 'Lista de Movimentação de OS', component: ListaMovimentacaoOS},
  { path: '/lista-adiantamento-os', name: 'Lista de Adiantamento de OS', component: ListaAdiantamentoOS},
  { path: '/lista-usuarios', name: 'Lista de Usuários', component: ListaUsuarios},
  { path: '/lista-permissao-acesso', name: 'Lista de Permissão de Acesso', component: ListaPermissaoAcesso},
  { path: '/lista-perfis-acesso', name: 'Lista de Perfil de Acesso', component: ListaPerfisAcesso},
  { path: '/lista-modulos', name: 'Lista de Módulos', component: ListaModulo},
  { path: '/lista-paginas', name: 'Lista de Páginas', component: ListaPagina},
  { path: '/lista-sub-paginas', name: 'Lista de Sub Páginas', component: ListaSubPagina},
  { path: '/lista-funcoes', name: 'Lista de Funções', component: ListaFuncao},

  //Relatórios
  { path: '/rel-projetoxsolicitacoes', name: 'Relatório de Projeto x Solicitações ', component: Relprojetosolicitacoes},
  { path: '/rel-projetoxcliente', name: 'Relatório de Projeto x Cliente ', component: Relprojetocliente},
  { path: '/rel-projetoxtecnico', name: 'Relatório de Projeto x Técnico ', component: Relprojetotecnico},
  { path: '/rel-projetoxfaturado', name: 'Relatório de Projeto x Faturado ', component: Relprojetofaturado},
  { path: '/rel-clientexfaturado', name: 'Relatório de Cliente x Faturado ', component: Relclientefaturado},
  { path: '/rel-tecnicoxfaturado', name: 'Relatório de Técnico x Faturado ', component: Reltecnicofaturado},
  { path: '/rel-custoxtecnico', name: 'Relatório de Custo x Técnico ', component: Relcustotecnico},

  { path: '/collapse', name: 'Collapse', component: Collapse },
  { path: '/teste-mult-select', name: 'Teste Multi Select', component: TesteMultiSelect },
  { path: '/teste-mensagens', exact:true, name: 'Teste Mensagens', component: TesteMensagens },
  { path: '/teste-toast',  name: 'Teste Toast', component: TesteToast },
  { path: '/teste-react-select',  name: 'Teste React Select', component: TesteReactSelect },

]
export default routes;
