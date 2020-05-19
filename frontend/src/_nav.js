export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboardv1',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        // text: 'NEW',
      },
    },
    {
      title: true,
      name: 'ORDENS DE SERVIÇOS',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Ordem de Serviço',
      url: '/tab-ordemservico',
      icon: 'icon-wrench',
    },
    {
      name: 'Movimentação de OS',
      url: '/tab-movimentacaoso',
      icon: 'fa fa-arrows',
    },
    
    {
      name: 'Adiantamento de OS',
      url: '/tab-adiantamentoos',
      icon: 'fa fa-share-square-o',
    },
    {
      title: true,
      name: 'CONFIGURAÇÕES',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Clientes',
      icon: 'fa fa-handshake-o',
      children: [
        {
          name: 'Clientes',
          url: '/tab-cliente',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Filiais',
          url: '/tab-filiais',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Bandeira',
          url: '/tab-bandeira',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Parceiros',
          url: '/tab-parceiros',
          icon: 'fa fa-handshake-o',
        },        
      ],
    },
    {
      name: 'Técnicos',
      icon: 'icon-support',
      children: [
        {
          name: 'Técnicos',
          url: '/tab-tecnicos',
          icon: 'icon-support',
        },
        {
          name: 'Tipos de Técnicos',
          url: '/tab-tipotecnicos',
          icon: 'icon-support',
        },
        {
          name: 'Disponibilidade',
          url: '/tab-disponibilidade',
          icon: 'icon-support',
        },
        {
          name: 'Dispon. Técnicos',
          url: '/tab-disponibilidadetecnico',
          icon: 'icon-support',
        },                
      ],
    },
    {
      name: 'Projetos',
      icon: 'icon-note',
      children: [
        {
          name: 'Tipo de Projeto',
          url: '/tab-tipoprojeto',
          icon: 'icon-note',
        },
        {
          name: 'Projeto x Técnico',
          url: '/tab-projetotecnico',
          icon: 'icon-note',
        },
        {
          name: 'Ferramentas',
          url: '/tab-ferramentas',
          icon: 'icon-note',
        },                       
      ],
    },
    {
      name: 'Dados Bancários',
      icon: 'fa fa-credit-card-alt',
      children: [
        {
          name: 'Dados Bancários',
          url: '/tab-dadosbancarios',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Bancos',
          url: '/tab-banco',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Tipo de Conta',
          url: '/tab-tipoconta',
          icon: 'fa fa-credit-card-alt',
        },        
      ],
    },    
    {
      name: 'Status',      
      icon: 'fa fa-check-square-o',
      children: [
        {
        name: 'Status Adiantamento',
        url: '/tab-statusadiantamento',
        icon: 'fa fa-check-square-o',          
        },
        {
          name: 'Status Atendimento',
          url: '/tab-statusatendimento',
          icon: 'fa fa-check-square-o',          
        },        
        {
          name: 'Status Cobrança',
          url: '/tab-statuscobranca',
          icon: 'fa fa-check-square-o',
        },
        {
          name: 'Status Pagamento',
          url: '/tab-statuspagamento',
          icon: 'fa fa-check-square-o',
        },         
      ],
    },
    {
      name: 'Ordem de Serviço',      
      icon: 'icon-wrench',
      children: [
        {
          name: 'Ordem de Serviço',
<<<<<<< HEAD
          url: '/tab-ordemservico',
          icon: 'fa fa-user-circle',
=======
          url: '/ordem-servico',
          icon: 'icon-wrench',
>>>>>>> fc363dfb5ec491ecf3c5f0dedd5d60120f359e31
        },
      ]  
    },
    {
      name: 'Acessos',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/tab-usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/tab-perfisacesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/tab-permissaoacesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/tab-modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/tab-paginas',
          icon: 'fa fa-window-maximize',
        },
        {
          name: 'Sub Páginas',
          url: '/tab-subpaginas',
          icon: 'fa fa-window-restore',
        },
        {
          name: 'Funções',
          url: '/tab-funcoes',
          icon: 'fa fa-code',
        },
      ],
    },
  ],
};
