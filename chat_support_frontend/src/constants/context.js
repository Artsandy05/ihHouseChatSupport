

export const INITIAL_SIDEBAR = {
  sidebarItems: [
    {
      label: "DASHBOARD",
      active: true,
      path: "/admin/dashboard",
    },
    {
      label: "USER_MANAGEMENT",
      active: false,
      path: "/admin/user-management",
      items: [
        {label: 'USER_MANAGEMENT_PER_SITE', active: false, path: '/admin/user-management/sites' },
        {label: 'USER_MANAGEMENT_PER_GAME', active: false, path: '/admin/user-management/games' },
      ]
    },
    {
      label: "TRANSACTIONS",
      active: false,
      path: "/admin/transactions",
    },
    {
      label: "REFERRALS",
      active: false,
      path: "/admin/referrals",
    },
    {
      label: "LOGS",
      active: false,
      path: "/admin/logs",
    },
    {
      label: "GAME_OFFERING",
      active: false,
      path: "/admin/game-offering",
    },
  ],
};

export const INITIAL_BOTTOM_MENUS_MOBILE = {
  bottomMenusMobileItems: [
    {
      label: "HOME",
      active: true,
      path: "/home",
    },
    {
      label: "WALLET",
      active: false,
      path: "/wallet",
    },
    {
      label: "GAMES",
      active: false,
      path: "/games",
    },
    {
      label: "PROMOS",
      active: false,
      path: "/promos",
    },
    {
      label: "MORE",
      active: false,
      path: "/more",
    },
  ],
  bottomMenusMobileForAgentsItems: [
    {
      label: "DASHBOARD",
      active: true,
      path: "/admin/dashboard",
    },
    {
      label: "COMMISSION",
      active: false,
      path: "/admin/commission",
    },
    {
      label: "WALLET",
      active: false,
      path: "/admin/wallet",
    },
    {
      label: "NETWORK",
      active: false,
      path: "/admin/network",
    },
  ],
};

export const INITIAL_USER = {
  auth: {
    govtPicture: "",
  },
};
