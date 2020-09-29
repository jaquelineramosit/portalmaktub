export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
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
        attributes: {}      // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    // {
    //   name: 'Mensagens',
    //   url: '/teste-mensagens',
    //   icon: 'fa fa-comment',
    // },
    {
      name: 'Ordem de Serviço',
      url: '/lista-ordem-servico',
      icon: 'icon-wrench',
    },
    {
      name: 'Movimentação de OS',
      url: '/lista-movimentacao-os',
      icon: 'fa fa-arrows',
    },

    {
      name: 'Adiantamento de OS',
      url: '/lista-adiantamento-os',
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
      name: 'Cadastro Clientes',
      icon: 'fa fa-handshake-o',
      children: [
        {
          name: 'Clientes',
          url: '/lista-cliente',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Cliente Final',
          url: '/lista-cliente-final',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Bandeira',
          url: '/lista-bandeira',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Grupo Empresarial',
          url: '/lista-grupo-empresarial',
          icon: 'fa fa-handshake-o',
        },
      ],
    },
    {
      name: 'Cadastro Técnicos',
      icon: 'icon-support',
      children: [
        {
          name: 'Técnicos',
          url: '/lista-tecnicos',
          icon: 'icon-support',
        },
        {
          name: 'Tipos de Técnicos',
          url: '/lista-tipo-tecnicos',
          icon: 'icon-support',
        },
        {
          name: 'Disponibilidade',
          url: '/lista-disponibilidade',
          icon: 'icon-support',
        },
      ],
    },
    {
      name: 'Cadastro Projetos',
      icon: 'icon-note',
      children: [
        {
          name: 'Tipo de Projeto',
          url: '/lista-tipo-projeto',
          icon: 'icon-note',
        },
        {
          name: 'Ferramentas',
          url: '/lista-ferramentas',
          icon: 'icon-note',
        },
      ],
    },
    {
      name: 'Cadastros Bancários',
      icon: 'fa fa-credit-card-alt',
      children: [
        {
          name: 'Dados Bancários',
          url: '/lista-dados-bancarios',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Bancos',
          url: '/lista-banco',
          icon: 'fa fa-credit-card-alt',
        },
        {
          name: 'Tipo de Conta',
          url: '/lista-tipo-conta',
          icon: 'fa fa-credit-card-alt',
        },
      ],
    },
    {
      name: 'Cadastro de Status',
      icon: 'fa fa-check-square-o',
      children: [
        {
        name: 'Status Adiantamento',
        url: '/lista-status-adiantamento',
        icon: 'fa fa-check-square-o',
        },
        {
          name: 'Status Atendimento',
          url: '/lista-status-atendimento',
          icon: 'fa fa-check-square-o',
        },
        {
          name: 'Status Cobrança',
          url: '/lista-status-cobranca',
          icon: 'fa fa-check-square-o',
        },
        {
          name: 'Status Pagamento',
          url: '/lista-status-pagamento',
          icon: 'fa fa-check-square-o',
        },
      ],
    },
    {
      name: 'Acessos',
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/lista-usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/lista-perfis-acesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/lista-permissao-acesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/lista-modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/lista-paginas',
          icon: 'fa fa-window-maximize',
        },
        {
          name: 'Sub Páginas',
          url: '/lista-sub-paginas',
          icon: 'fa fa-window-restore',
        },
        {
          name: 'Funções',
          url: '/lista-funcoes',
          icon: 'fa fa-code',
        },
        {
         },

      ],
    },
    {
      title: true,
      name: 'Relatórios',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Relatórios',
      icon: 'fa fa-bar-chart',
      children: [
        {
          name: 'Projeto x Solicitações',
          url: '/rel-projetoxsolicitacoes',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Projeto x Cliente',
          url: '/rel-projetoxcliente',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Projeto x Técnico',
          url: '/rel-projetoxtecnico',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Projeto x Faturado',
          url: '/rel-projetoxfaturado',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Cliente x Faturado',
          url: '/rel-clientexfaturado',
          icon: 'fa fa-bar-chart',
        },

        {
          name: 'Técnico x Faturado',
          url: '/rel-tecnicoxfaturado',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Custo x Técnico',
          url: '/rel-custoxtecnico',
          icon: 'fa fa-bar-chart',
        },

      ],
    },
  ],
};
