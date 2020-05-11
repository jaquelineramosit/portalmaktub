const express = require('express');

// Acessos
const LogonController = require('./controllers/Acessos/LogonController');
const UsuarioController = require('./controllers/Acessos/UsuarioController');
const ModuloController = require('./controllers/Acessos/ModuloController');
const PaginaController = require('./controllers/Acessos/PaginaController');
const SubPaginaController = require('./controllers/Acessos/SubPaginaController');
const FuncaoController = require('./controllers/Acessos/FuncaoController');
const PerfilAcessoController = require('./controllers/Acessos/PerfilAcessoController');
const PermissaoAcessoController = require('./controllers/Acessos/PermissaoAcessoController');
const RegisterController = require('./controllers/Acessos/RegisterController');

//Atividades
const OrdemServicoController = require('./controllers/OrdemServico/OrdemServicoController');
const MovimentacaoOsController = require('./controllers/OrdemServico/MovimentacaoOsController');
const AdiantamentoOsController = require('./controllers/OrdemServico/AdiantamentoOsController');

//Configurações
const BancoController = require('./controllers/Configuracao/BancoController');
const BandeiraController = require('./controllers/Configuracao/BandeiraController');
const ClienteController = require('./controllers/Configuracao/ClienteController');
const DadosBancariosController = require('./controllers/Configuracao/DadosBancariosController');
const DisponibilidadeController = require('./controllers/Configuracao/DisponibilidadeController');
const DisponTecnicoController = require('./controllers/Configuracao/DisponTecnicoController');
const FerramentaController = require('./controllers/Configuracao/FerramentaController');
const FerramentaOSController = require('./controllers/Configuracao/FerramentaOSController');
const FilialController = require('./controllers/Configuracao/FilialController');
const ParceiroController = require('./controllers/Configuracao/ParceiroController');
const ProjetoTecnicoController = require('./controllers/Configuracao/ProjetoTecnicoController');
const StatusAdiantamentoController = require('./controllers/Configuracao/StatusAdiantamentoController');
const StatusAtendimentoController = require('./controllers/Configuracao/StatusAtendimentoController');
const StatusCobrancaController = require('./controllers/Configuracao/StatusCobrancaController');
const StatusPagamentoController = require('./controllers/Configuracao/StatusPagamentoController');
const TecnicoController = require('./controllers/Configuracao/TecnicoController');
const TipoContaController = require('./controllers/Configuracao/TipoContaController');
const TipoProjetoController = require('./controllers/Configuracao/TipoProjetoController');
const TipoTecnicoController = require('./controllers/Configuracao/TipoTecnicoController');

// //Dashboards
// const Dashboardv1Controller = require('./controllers/Dashboards/Dashboardv1Controller');
// const Dashboardv2Controller = require('./controllers/Dashboards/Dashboardv2Controller');
// const Dashboardv3Controller = require('./controllers/Dashboards/Dashboardv3Controller');

const routes = express.Router();

// Acessos
routes.post('/logon', LogonController.create);

routes.get('/usuarios', UsuarioController.getAll);
routes.get('/usuarios/:id', UsuarioController.getById);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);

routes.get('/modulos', ModuloController.getAll);
routes.get('/modulos/:id', ModuloController.getById);
routes.post('/modulos', ModuloController.create);
routes.put('/modulos/:id', ModuloController.update);

routes.get('/paginas', PaginaController.getAll);
routes.get('/paginas/:id', PaginaController.getById);
routes.post('/paginas', PaginaController.create);
routes.put('/paginas/:id', PaginaController.update);

routes.get('/sub-paginas', SubPaginaController.getAll);
routes.get('/sub-paginas/:id', SubPaginaController.getById);
routes.post('/sub-paginas', SubPaginaController.create);
routes.put('/sub-paginas/:id', SubPaginaController.update);

routes.get('/funcao', FuncaoController.getAll);
routes.get('/funcao/:id', FuncaoController.getById);
routes.post('/funcao', FuncaoController.create);
routes.put('/funcao/:id', FuncaoController.update);

routes.get('/perfis-acesso', PerfilAcessoController.getAll);
routes.get('/perfis-acesso/:id', PerfilAcessoController.getById);
routes.post('/perfis-acesso', PerfilAcessoController.create);
routes.put('/perfis-acesso/:id', PerfilAcessoController.update);

routes.get('/permissao-acesso', PermissaoAcessoController.getAll);
routes.get('/permissao-acesso/:id', PermissaoAcessoController.getById);
routes.post('/permissao-acesso', PermissaoAcessoController.create);
routes.put('/permissao-acesso/:id', PermissaoAcessoController.update);

routes.get('/register', RegisterController.getAll);
routes.get('/register/:id', RegisterController.getById);
routes.post('/register', RegisterController.create);
routes.put('/register/:id', RegisterController.update);

// Ordem de Servico
routes.get('/ordem-servico', OrdemServicoController.getAll);
routes.get('/ordem-servico/:id', OrdemServicoController.getById);
routes.post('/ordem-servico', OrdemServicoController.create);
routes.put('/ordem-servico/:id', OrdemServicoController.update);

routes.get('/movimentacao-os', MovimentacaoOsController.getAll);
routes.get('/movimentacao-os/:id', MovimentacaoOsController.getById);
routes.post('/movimentacao-os', MovimentacaoOsController.create);
routes.put('/movimentacao-os/:id', MovimentacaoOsController.update);

routes.get('/adiantamento-os', AdiantamentoOsController.getAll);
routes.get('/adiantamento-os/:id', AdiantamentoOsController.getById);
routes.post('/adiantamento-os', AdiantamentoOsController.create);
routes.put('/adiantamento-os/:id', AdiantamentoOsController.update);

// Configuração
routes.get('/banco', BancoController.getAll);
routes.get('/banco/:id', BancoController.getById);
routes.post('/banco', BancoController.create);
routes.put('/banco/:id', BancoController.update);

routes.get('/bandeira', BandeiraController.getAll);
routes.get('/bandeira/:id', BandeiraController.getById);
routes.post('/bandeira', BandeiraController.create);
routes.put('/bandeira/:id', BandeiraController.update);

routes.get('/clientes', ClienteController.getAll);
routes.get('/clientes/:id', ClienteController.getById);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);

routes.get('/dados-bancarios', DadosBancariosController.getAll);
routes.get('/dados-bancarios/:id', DadosBancariosController.getById);
routes.post('/dados-bancarios', DadosBancariosController.create);
routes.put('/dados-bancarios/:id', DadosBancariosController.update);

routes.get('/disponibilidade', DisponibilidadeController.getAll);
routes.get('/disponibilidade/:id', DisponibilidadeController.getById);
routes.post('/disponibilidade', DisponibilidadeController.create);
routes.put('/disponibilidade/:id', DisponibilidadeController.update);

routes.get('/disponibilidade-tecnico', DisponTecnicoController.getAll);
routes.get('/disponibilidade-tecnico/:id', DisponTecnicoController.getById);
routes.post('/disponibilidade-tecnico', DisponTecnicoController.create);
routes.put('/disponibilidade-tecnico/:id', DisponTecnicoController.update);

routes.get('/filiais', FilialController.getAll);
routes.get('/filiais/:id', FilialController.getById);
routes.post('/filiais', FilialController.create);
routes.put('/filiais/:id', FilialController.update);

routes.get('/ferramentas', FerramentaController.getAll);
routes.get('/ferramentas/:id', FerramentaController.getById);
routes.post('/ferramentas', FerramentaController.create);
routes.put('/ferramentas/:id', FerramentaController.update);

routes.get('/ferramentas-os', FerramentaOSController.getAll);
routes.get('/ferramentas-os/:id', FerramentaOSController.getById);
routes.post('/ferramentas-os', FerramentaOSController.create);
routes.put('/ferramentas-os/:id', FerramentaOSController.update);

routes.get('/parceiro', ParceiroController.getAll);
routes.get('/parceiro/:id', ParceiroController.getById);
routes.post('/parceiro', ParceiroController.create);
routes.put('/parceiro/:id', ParceiroController.update);

routes.get('/tipo-projeto', TipoProjetoController.getAll);
routes.get('/tipo-projeto/:id', TipoProjetoController.getById);
routes.post('/tipo-projeto', TipoProjetoController.create);
routes.put('/tipo-projeto/:id', TipoProjetoController.update);

routes.get('/projeto-tecnico', ProjetoTecnicoController.getAll);
routes.get('/projeto-tecnico/:id', ProjetoTecnicoController.getById);
routes.post('/projeto-tecnico', ProjetoTecnicoController.create);
routes.put('/projeto-tecnico/:id', ProjetoTecnicoController.update);

routes.get('/status-adiantamento', StatusAdiantamentoController.getAll);
routes.get('/status-adiantamento/:id', StatusAdiantamentoController.getById);
routes.post('/status-adiantamento', StatusAdiantamentoController.create);
routes.put('/status-adiantamento/:id', StatusAdiantamentoController.update);

routes.get('/status-atendimento', StatusAtendimentoController.getAll);
routes.get('/status-atendimento/:id', StatusAtendimentoController.getById);
routes.post('/status-atendimento', StatusAtendimentoController.create);
routes.put('/status-atendimento/:id', StatusAtendimentoController.update);

routes.get('/status-cobranca', StatusCobrancaController.getAll);
routes.get('/status-cobranca/:id', StatusCobrancaController.getById);
routes.post('/status-cobranca', StatusCobrancaController.create);
routes.put('/status-cobranca/:id', StatusCobrancaController.update);

routes.get('/status-pagamento', StatusPagamentoController.getAll);
routes.get('/status-pagamento/:id', StatusPagamentoController.getById);
routes.post('/status-pagamento', StatusPagamentoController.create);
routes.put('/status-pagamento/:id', StatusPagamentoController.update);

routes.get('/tecnico', TecnicoController.getAll);
routes.get('/tecnico/:id', TecnicoController.getById);
routes.post('/tecnico', TecnicoController.create);
routes.put('/tecnico/:id', TecnicoController.update);

routes.get('/tipo-conta', TipoContaController.getAll);
routes.get('/tipo-conta/:id', TipoContaController.getById);
routes.post('/tipo-conta', TipoContaController.create);
routes.put('/tipo-conta/:id', TipoContaController.update);

routes.get('/tipo-projeto', TipoProjetoController.getAll);
routes.get('/tipo-projeto/:id', TipoProjetoController.getById);
routes.post('/tipo-projeto', TipoProjetoController.create);
routes.put('/tipo-projeto/:id', TipoProjetoController.update);

routes.get('/tipo-tecnico', TipoTecnicoController.getAll);
routes.get('/tipo-tecnico/:id', TipoTecnicoController.getById);
routes.post('/tipo-tecnico', TipoTecnicoController.create);
routes.put('/tipo-tecnico/:id', TipoTecnicoController.update);

//Dashboards
// routes.get('/dashboardv1', Dashboardv1Controller.getAll);
// routes.get('/dashboardv1/:id', Dashboardv1Controller.getById);
// routes.post('/dashboardv1', Dashboardv1Controller.create);
// routes.put('/dashboardv1/:id', Dashboardv1Controller.update);

// routes.get('/dashboardv2', Dashboardv2Controller.getAll);
// routes.get('/dashboardv2/:id', Dashboardv2Controller.getById);
// routes.post('/dashboardv2', Dashboardv2Controller.create);
// routes.put('/dashboardv2/:id', Dashboardv2Controller.update);

// routes.get('/dashboardv3', Dashboardv3Controller.getAll);
// routes.get('/dashboardv3/:id', Dashboardv3Controller.getById);
// routes.post('/dashboardv3', Dashboardv3Controller.create);
// routes.put('/dashboardv3/:id', Dashboardv3Controller.update);


module.exports = routes;