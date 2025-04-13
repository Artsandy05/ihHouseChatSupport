import HomeFooterMenu from "../assets/images/home-footer-menu.png";
import WalletFooterMenu from "../assets/images/wallet-footer-menu.png";
import GamesFooterMenu from "../assets/images/games-footer-menu.png";
import PromosFooterMenu from "../assets/images/promos-footer-menu.png";
import MoreFooterMenu from "../assets/images/more-footer-menu.png";
import DashboardFooterMenu from "../assets/images/dashboard-black-icon.png";
import CommissionFooterMenu from "../assets/images/comission-black-icon.png";
import WalletCommissionFooterMenu from "../assets/images/wallet-black-icon.png";
import AgentNetwork from "../assets/images/network-black-icon.png";


export const BOTTOM_MENUS_MOBILE = [
  {
    link: "/home",
    name: "home",
    label: "Home",
    bottomMenuMobileName: "HOME",
    icon: HomeFooterMenu,
  },
  {
    link: "/game/wallet",
    name: "wallet",
    label: "Wallet",
    bottomMenuMobileName: "WALLET",
    icon: WalletFooterMenu,
  },
  {
    link: "/games",
    name: "games",
    label: "Games",
    bottomMenuMobileName: "GAMES",
    icon: GamesFooterMenu,
  },
  {
    link: "/promos",
    name: "promos",
    label: "Promos",
    bottomMenuMobileName: "PROMO",
    icon: PromosFooterMenu,
  },
  {
    link: "/more",
    name: "more",
    label: "More",
    bottomMenuMobileName: "MORE",
    icon: MoreFooterMenu,
  },
];

export const BOTTOM_MENUS_FOR_AGENTS_MOBILE = [
  {
    link: "/admin/dashboard",
    name: "dashboard",
    label: "Dashboard",
    bottomMenuMobileName: "DASHBOARD",
    icon: DashboardFooterMenu,
  },
  {
    link: "/admin/commission",
    name: "commission",
    label: "Commission",
    bottomMenuMobileName: "COMMISSION",
    icon: CommissionFooterMenu,
  },
  {
    link: "/admin/wallet",
    name: "wallet",
    label: "Wallet",
    bottomMenuMobileName: "WALLET",
    icon: WalletCommissionFooterMenu,
  },
  {
    link: "/admin/network",
    name: "Network",
    label: "Network",
    bottomMenuMobileName: "NETWORK",
    icon: AgentNetwork,
  },
];
