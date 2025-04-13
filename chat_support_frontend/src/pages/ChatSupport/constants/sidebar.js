import permissions from "./permission";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GamesIcon from '@mui/icons-material/Games';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



export const sidebarItems = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    sideBarName: "DASHBOARD",
    icon: DashboardIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.ADMINISTRATOR,
      permissions.MASTERAGENT,
      permissions.AGENT,
      permissions.VERIFIER,
      permissions.OPERATOR,
      permissions.SUPERVISOR,
    ],
  },
  // {
  //   link: "/grafana/dashboard",
  //   label: "Dashboard",
  //   sideBarName: "DASHBOARD",
  //   icon: DashboardIcon,
  //   permission: [
  //     permissions.SUPERADMIN,
  //   ],
  // },
  {
    link: "/admin/user-management",
    label: "User Management",
    sideBarName: "USER_MANAGEMENT",
    icon: ManageAccountsIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.ADMINISTRATOR,
      permissions.VERIFIER,
      permissions.OPERATOR,
      permissions.SUPERVISOR,
      permissions.AUDITOR,
      permissions.ACCOUNTING,
      permissions.TREASURY,
    ],
    items: [
      {
        link: '/admin/user-management/sites',
        label: 'Sites',
        sideBarName: 'USER_MANAGEMENT_PER_SITE',
        icon: AddLocationIcon,
        permission: [
            permissions.SUPERADMIN,
            permissions.ADMINISTRATOR,
            permissions.AUDITOR,
        ],
      },
      {
        link: '/admin/user-management/games',
        label: 'Games',
        sideBarName: 'USER_MANAGEMENT_PER_GAME',
        icon: GamesIcon,
        permission: [
            permissions.SUPERADMIN,
            permissions.ADMINISTRATOR,
            permissions.AUDITOR,
        ],
      },
    ],
  },
  {
    link: "/admin/transactions",
    label: "Transaction Report",
    sideBarName: "TRANSACTIONS",
    icon: PaidIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.AUDITOR,
      permissions.ACCOUNTING,
      permissions.TREASURY,
    ],
  },
  {
    link: "/admin/grossgaming-revenue",
    label: "Gross Gaming Revenue",
    sideBarName: "GGR",
    icon: PaidIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.AUDITOR,
      permissions.ACCOUNTING,
      permissions.TREASURY,
    ],
  },
  {
    link: "/admin/referrals",
    label: "Referrals",
    sideBarName: "REFERRALS",
    icon: PeopleIcon,
    permission: [
      // permissions.SUPERAGENT,
      // permissions.MASTERAGENT,
      // permissions.AGENT,
    ],
  },
  {
    link: "/admin/logs",
    label: "Logs",
    sideBarName: "LOGS",
    icon: TextSnippetIcon,
    permission: [
      permissions.SUPERADMIN,
    ],
  },
  {
    link: "/admin/game-offering",
    label: "Game Offering",
    sideBarName: "GAME_OFFERING",
    icon: TextSnippetIcon,
    permission: [
      permissions.SUPERADMIN,
    ],
  },
  {
    link: "/admin/csr-monitoring",
    label: "CSR Monitoring",
    sideBarName: "CSR_MONITORING",
    icon: AccessTimeIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.SUPERVISOR,
      permissions.ADMINISTRATOR,
    ],
  },
];
