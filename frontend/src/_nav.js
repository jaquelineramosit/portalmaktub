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
      url: '/ordem-servico',
      icon: 'icon-wrench',
    },
    {
      name: 'Movimentação de OS',
      url: '/movimentacao-os',
      icon: 'fa fa-arrows',
    },
    
    {
      name: 'Adiantamento de OS',
      url: '/adiantamento-os',
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
          url: '/clientes',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Filiais',
          url: '/filiais',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Bandeira',
          url: '/bandeira',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Parceiros',
          url: '/parceiros',
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
          url: '/metas',
          icon: 'icon-support',
        },
        {
          name: 'Tipos de Técnicos',
          url: '/metas-vendedores',
          icon: 'icon-support',
        },
        {
          name: 'Disponibilidade',
          url: '/disponibilidade',
          icon: 'icon-support',
        },
        {
          name: 'Dispon. Técnicos',
          url: '/disponibilidade-tecnicos',
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
          url: '/metas',
          icon: 'icon-note',
        },
        {
          name: 'Projeto x Técnico',
          url: '/metas-vendedores',
          icon: 'icon-note',
        },
        {
          name: 'Ferramentas',
          url: '/disponibilidade',
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
          url: '/pipes',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Bancos',
          url: '/pipes',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Tipo de Conta',
          url: '/fases-pipe',
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
        url: '/produtos',
        icon: 'fa fa-check-square-o',          
        },
        {
          name: 'Status Atendimento',
          url: '/distribuidores',
          icon: 'fa fa-check-square-o',          
        },        
        {
          name: 'Status Cobrança',
          url: '/marcas',
          icon: 'fa fa-check-square-o',
        },
        {
          name: 'Status Pagamento',
          url: '/marcas',
          icon: 'fa fa-check-square-o',
        },         
      ],
    },
    {
      name: 'Oportunidades',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Oportunidades',
          url: '/ordem-servico',
          icon: 'fa fa-user-circle',
        },
      ]  
    },
    {
      name: 'Acessos',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/perfil-acesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/permissao-acesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/paginas',
          icon: 'fa fa-window-maximize',
        },
        {
          name: 'Sub Páginas',
          url: '/paginas',
          icon: 'fa fa-window-restore',
        },
        {
          name: 'Funções',
          url: '/funcoes',
          icon: 'fa fa-code',
        },
      ],
    },
  ],
};
