import sidebarMenuProfile from "../assets/images/sidebar-menu-profile.png";
import sidebarMenuKYC from "../assets/images/sidebar-menu-kyc.png";
import sidebarMenuPhone from "../assets/images/sidebar-menu-phone.png";
import lockIcon from "../assets/images/lock-icon.png";
import passwordIcon from "../assets/images/password-icon.png";
import bankAccountsIcon from "../assets/images/bank-accounts-icon.png";

export const sidebarItemsMobile = [
  {
    link: "/game/profile",
    label: "Profile",
    sideBarName: "PROFILE",
    icon: sidebarMenuProfile,
  },
  {
    link: "/game/kyc",
    label: "eKYC Process",
    sideBarName: "KYC",
    icon: sidebarMenuKYC,
  },
  {
    link: "/game/mobile",
    label: "Change Mobile No.",
    sideBarName: "MOBILE_NUMBER",
    icon: sidebarMenuPhone,
  },
  // {
  //   link: "/game/mobile",
  //   label: "Bank Accounts",
  //   sideBarName: "BANK ACCOUNTS",
  //   icon: bankAccountsIcon,
  // },
  {
    link: "/game/passcode",
    label: "Create Wallet Passcode",
    sideBarName: "PASSCODE",
    icon: lockIcon,
  },
  {
    link: "/game/password",
    label: "Sign In Password",
    sideBarName: "PASSWORD",
    icon: passwordIcon,
  },
];

export const adminSidebarItems = [
  {
    link: "/admin/profile",
    label: "Profile",
    sideBarName: "PROFILE",
    icon: sidebarMenuProfile,
  },
  {
    link: "/admin/kyc",
    label: "eKYC Process",
    sideBarName: "KYC",
    icon: sidebarMenuKYC,
  },
  {
    link: "/admin/mobile",
    label: "Change Mobile No.",
    sideBarName: "MOBILE_NUMBER",
    icon: sidebarMenuPhone,
  },
  // {
  //   link: "/admin/mobile",
  //   label: "Bank Accounts",
  //   sideBarName: "BANK ACCOUNTS",
  //   icon: bankAccountsIcon,
  // },
  {
    link: "/admin/passcode",
    label: "Create Wallet Passcode",
    sideBarName: "PASSCODE",
    icon: lockIcon,
  },
  {
    link: "/admin/password",
    label: "Sign In Password",
    sideBarName: "PASSWORD",
    icon: passwordIcon,
  },
]