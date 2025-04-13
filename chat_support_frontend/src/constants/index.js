import homeZodiacRaceGameListBanner from "@assets/images/zodiac-race-square.png";
// import homeLaglagGameListBanner from "@assets/images/home-laglag-gamelist-banner.png";
import homeDosLetraKareraBanner from "@assets/images/dos-letra-karera-banner-final.png";
import homeTresLetraKareraBanner from "@assets/images/tres-letra-square.png";
import welcomeBonusPromoBanner from "@assets/images/welcome-bonus-promo-banner.png";
import referEarnPromo from "@assets/images/refer-earn-promo.png";
import birthdayBentePromo from "@assets/images/birthday-bente-promo.png";
import bdayBannerPopup from "@assets/images/bday-banner-popup.png";
import welcomeBonusBannerPopup from "@assets/images/welcome-bonus-promo-banner.png";
import referEarnBannerPopup from "@assets/images/refer-earn-promo.png";



import AriesLogo from "@assets/images/zodiac-race-aries-logo.png";
import TaurusLogo from "@assets/images/zodiac-race-taurus-logo.png";
import GeminiLogo from "@assets/images/zodiac-race-gemini-logo.png";
import Cancerogo from "@assets/images/zodiac-race-cancer-logo.png";
import LeoLogo from "@assets/images/zodiac-race-leo-logo.png";
import VirgoLogo from "@assets/images/zodiac-race-virgo-logo.png";
import LibraLogo from "@assets/images/zodiac-race-libra-logo.png";
import ScorpioLogo from "@assets/images/zodiac-race-scorpio-logo.png";
import SagittariusLogo from "@assets/images/zodiac-race-sagittarius-logo.png";
import CapricornLogo from "@assets/images/zodiac-race-capricorn-logo.png";
import AquariusLogo from "@assets/images/zodiac-race-aquarius-logo.png";
import PiscesLogo from "@assets/images/zodiac-race-pisces-logo.png";
import dosLetraBg from "@assets/images/dos-letra-logo-banner-long.png";
import tresLetraBg from "@assets/images/home-tres-letra-karera-img.png";
import zodiacRaceBg from "@assets/images/zodiac-race-banner-long.png";
import checkCircleGreenIcon from "@assets/images/check-circle-green-icon.png";

export const BASE_URL = 'http://localhost:8001/api/v1';
export const SOCKET_URL = 'ws://localhost:8001/api';

export const DRAWER_WIDTH = 280;

export const VARIANT = {
  CONSTANT: "CONSTANT",
  TABLE: "TABLE",
  ROW: "ROW",
  BOX: "BOX",
};

export const LOCAL = "local";
export const REFERRAL_MASTERAGENT_TABLE = "REFERRAL_MASTERAGENT_TABLE";
export const USER_MANAGEMENT_TABLE = "USER_MANAGEMENT_TABLE";
export const KYC_ATTEMPTS_TABLE = "KYC_ATTEMPTS_TABLE";
export const USER_SESSIONS_TABLE = "USER_SESSIONS_TABLE";
export const USER_IN_GAME_TABLE = "USER_IN_GAME_TABLE";
export const LOGS_TABLE = "LOGS_TABLE";
export const GAME_OFFERING_TABLE = "GAME_OFFERING_TABLE";
export const REFERRAL_TABLE = "REFERRAL_TABLE";
export const REFERRAL_PLAYER_ACTIVITY_TABLE = "REFERRAL_PLAYER_ACTIVITY_TABLE";
export const REFERRAL_PLAYER_ACTIVITY_DAILY_TABLE =
  "REFERRAL_PLAYER_ACTIVITY_DAILY_TABLE";
export const REFERRAL_PLAYER_ACTIVITY_BYGAMES_TABLE =
  "REFERRAL_PLAYER_ACTIVITY_BYGAMES_TABLE";
export const REFERRAL_PLAYER_ACTIVITY_BY_DEP_TABLE =
  "REFERRAL_PLAYER_ACTIVITY_BY_DEP_TABLE";
export const REFERRAL_PLAYER_ACTIVITY_BY_WITHDRAW_TABLE =
  "REFERRAL_PLAYER_ACTIVITY_BY_WITHDRAW_TABLE";

export const NOTIFICATION_TABLE = "NOTIFICATION_TABLE";
export const TRANSACTIONS_TABLE = "TRANSACTIONS_TABLE";
export const CSR_MONITORING_LIST_TABLE = "CSR_MONITORING_LIST_TABLE"
export const CSR_MONITORING_LOGS_TABLE = "CSR_MONITORING_LOGS_TABLE"

export const CASH_IN_OUT_TABLE = "CASH_IN_OUT_TABLE";
export const GROSSGAMINGREVENUE_TABLE = "GROSSGAMINGREVENUE_TABLE";
export const TRANSACTIONS_EXPORT_EXCEL = "TRANSACTIONS_EXPORT_EXCEL";
export const MERCHANT_EXPORT_EXCEL = "MERCHANT_EXPORT_EXCEL";
export const TRANSACTIONS_EXPORT_CSV = "TRANSACTIONS_EXPORT_CSV";
export const USER_MANAGEMENT_EXPORT_EXCEL = "USER_MANAGEMENT_EXPORT_EXCEL";
export const USER_MANAGEMENT_EXPORT_CSV = "USER_MANAGEMENT_EXPORT_CSV";
export const REFERRAL_PLAYER_ACTIVITY = "REFERRAL_PLAYER_ACTIVITY";
export const COMMISSION_TABLE = "COMMISSION_TABLE";
export const COMMISSION_PER_BET_TABLE = "COMMISSION_PER_BET_TABLE";
export const COMMISSION_AGENT_PLAYER_TABLE = "COMMISSION_AGENT_PLAYER_TABLE";

export const NETWORK_DASHBOARD = "NETWORK_DASHBOARD"
export const NETWORK_PLAYER = "NETWORK_PLAYER"
export const NETWORK_REPRESENTATIVES = "NETWORK_REPRESENTATIVES"

export const IMAGE_URL_USER = `${BASE_URL}/admin/images/profile-pictures`;
export const CHAT_SUPPORT_IMAGE_URL = `${BASE_URL}/admin/images/chatImages`;
export const IMAGE_URL_GOVT = `${BASE_URL}/admin/images/govt-pictures`;

export const TERMS_AND_CONDITION_MAIN_CONTENT =
  "TERMS_AND_CONDITION_MAIN_CONTENT";
export const IN_MODAL = "IN_MODAL";
export const NOT_IN_MODAL = "NOT_IN_MODAL";
export const TERMS_AND_CONDITION_CONTENT = "TERMS_AND_CONDITION_CONTENT";
export const RESPONSIBLE_GAMING = "RESPONSIBLE_GAMING";
export const PRIVATE_PRIVACY = "PRIVATE_PRIVACY";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_FORGOT_PW_SUCCESS = "AUTH_FORGOT_PW_SUCCESS";
export const RESET_FORGOT_PW_SUCCESS = "RESET_FORGOT_PW_SUCCESS";
export const AUTH_LOGIN_SUCCESS_PW = "AUTH_LOGIN_SUCCESS_PW";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const KYC = "KYC";
export const USER_PROFILE = "USER_PROFILE";

export const NEW_PASSWORD = "NEW_PASSWORD";
export const NEW_PASSCODE = "NEW_PASSCODE";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const PASSWORD = "PASSWORD";
export const USERNAME = "USERNAME";
export const CONFIRM_PASSWORD = "CONFIRM_PASSWORD";
export const PHONE = "PHONE";
export const OPERATOR_LOGIN = "OPERATOR_LOGIN";
export const REQUEST_MOBILE = "REQUEST_MOBILE";
export const VALIDATE_OTP_MOBILE = "VALIDATE_OTP_MOBILE";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const VALIDATE_OTP = "VALIDATE_OTP";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const BET_WINNER = "BET_WINNER";
export const NEW_GAME = "NEW_GAME";
export const TRANSACTIONS_MODAL = "TRANSACTIONS_MODAL";
export const FILTER_MODAL = "FILTER_MODAL";
export const QRPH = "QRPH";
export const PAYMAYA = "PAYMAYA";
export const KARERA_LIVE = "KARERA_LIVE";
export const QRCODE = "QRCODE";
export const GCASH = "GCASH";

export const CHANGE_COMMISSION = "CHANGE_COMMISSION";
export const CHANGE_COMMISSION_CONFIRMATION = "CHANGE_COMMISSION_CONFIRMATION";
export const CANCEL_COMMISSION_CONFIRMATION = "CANCEL_COMMISSION_CONFIRMATION";
export const CHANGE_COMMISSION_SUCESS = "CHANGE_COMMISSION_SUCESS";
export const REDEEM_VOUCHER_SUCESS = "REDEEM_VOUCHER_SUCESS";

export const CANCEL_COMMISSION_SUCESS = "CANCEL_COMMISSION_SUCESS";

export const APPROVE_NOTIFICATION_CONFIRMATION =
  "APPROVE_NOTIFICATION_CONFIRMATION";
export const DECLINE_NOTIFICATION_CONFIRMATION =
  "DECLINE_NOTIFICATION_CONFIRMATION";
export const APPROVE_DECLINE_NOTIFICATION_SUCCESS =
  "APPROVE_DECLINE_NOTIFICATION_SUCCESS";
export const ERROR_NOTIFICATION_SUCCESS = "ERROR_NOTIFICATION_SUCCESS";

export const ALL = "all";
export const DAILY = "daily";
export const GAMEID = "gameid";
export const BYGAMES = "bygames";
export const BYBETS = "bybets";
export const BYWINS = "bywins";
export const BYDEPOSITS = "bydeposits";
export const BYWITHDRAW = "bywithdraws";
export const SITES = "sites";
export const GAMES = "games";

export const DEPOSIT = "deposit";
export const DEPOSIT_SUCCESS = "deposit_success";
export const WITHDRAW_SUCCESS = "withdraw_success";
export const WITHDRAW = "withdraw";
export const SENDCREDITS = "sendcredits";
export const DEDUCTCREDITS = "deductcredits";
export const UNCLAIMED = "unclaimed";
export const CLAIMED = "claimed";
export const ADD_CARD = "add_card";
export const QR_CODE = "qr_code";
export const TRANSACTION_BANKS = "transaction_banks";
export const TAKE_PICTURE = "take_picture";
export const UPLOAD_PICTURE = "upload_picture";
export const CAMERA_FRONT = "camera_front";
export const CAMERA_BACK = "camera_back";
export const PIN_CODE = "pin_code";
export const WITHDRAW_NOT_AVAILABLE = "withdraw_not_available";
export const WITHDRAWAL = "withdrawal";
export const WONPRIZE = "wonprize";
export const LOSEBET = "losebet";
export const BET = "bet";
export const INITIAL = "initial";
export const PENDING = "pending";
export const FAILURE = "failure";
export const FOR_APPROVAL = "forapproval";
export const NOT_STARTED = "notstarted";
export const DONE = "done";
export const SUCCESS = "success";
export const INFO = "info";
export const MOBILE = "mobile";
export const DESKTOP = "desktop";
export const DEACTIVATE = "deactivate";
export const RESTORE = "restore";
export const AGENT = "agent";
export const MASTERAGENT = "masteragent";
export const PLAYER = "player";
export const MASTERAGENT_PLAYER = "masterAgentPlayer";
export const AGENT_PLAYER = "AgentPlayer";
export const IDLE = "idle";
export const PM_GCASH = "pm_gcash";
export const PM_QRCODE = "pm_qrcode";
export const MAIN_MENU = "main_menu";
export const UPDATE_INFO_MENU = "update_info_menu";
export const QRCODE_MENU = "qrcode_menu";

export const COMPLETED = "completed";
export const FAILED = "failed";
export const FAIL = "fail";
export const GAME = "game";
export const ADMIN = "admin";
export const OPERATOR = "operator";
export const LOGIN = "login";
export const WELCOME = "welcome";
export const REFERRAL = "referral";
export const PROMO = "promo";
export const SEND_GIFT = "sendgift";
export const DEDUCT = "deduct";
export const LOAD = "load";
export const REFUND = "refund";
export const SETTLEMENT = "settlement";

export const VOUCHER = "voucher";
export const PROMO_DETAILS = "promo_details";
export const PROMO_VOUCHER = "promo_voucher";
export const TRANSACTIONS = "transactions";
export const USER_MANAGEMENT = "user-management";

export const INPUT = "input";
export const SELECT = "select";
export const DATE = "date";

export const FILTER = {
  DATE: "createdDate",
  STATUS: "status",
};

export const ACTIVE = "active";
export const DEACTIVATED = "deactivated";

export const ADD_USER = "ADD USER";
export const DELETE_USER = "DELETE_USER";
export const DEACTIVATE_USER = "DEACTIVATE_USER";
export const RESTORE_USER = "RESTORE_USER";
export const WELCOME_BONUS_PROMO = "WELCOME_BONUS_PROMO";
export const REFER_EARN_PROMO = "REFER_EARN_PROMO";
export const BITHRDAY_BENTE_PROMO = "BITHRDAY_BENTE_PROMO";
export const KARERALIVE300 = "KARERALIVE300";


export const USER_MANAGEMENT_NOTIFY = `A new update has been made`;

export const USER_MANAGEMENT_MODALS = {
  ADD_USER: { name: "ADD_USER", title: "ADD USER" },
  FILTER_USER: { name: "FILTER_USER", title: "FILTER USER" },
  EXPORT_EXCEL_USER: { name: "EXPORT_EXCEL_USER", title: "EXPORT EXCEL USER" },
  PROFILE: { name: "PROFILE", title: "PROFILE" },
  EDIT_PROFILE: { name: "EDIT_PROFILE", title: "EDIT PROFILE" },
  PROFILE_PICTURE: { name: "PROFILE_PICTURE", title: "PROFILE PICTURE" },
  ADD_CREDITS: { name: "ADD_CREDITS", title: "ADD CREDITS" },
  DEDUCT_CREDITS: { name: "DEDUCT_CREDITS", title: "DEDUCT CREDITS" },
  USER_SESSIONS: { name: "USER_SESSIONS", title: "VIEW USER SESSIONS" },
  USER_DEACTIVATION: {
    name: "USER_DEACTIVATION",
    title: "REASON FOR USER DEACTIVATION",
  },
  USER_RESTORE: { name: "USER_RESTORE", title: "REASON FOR USER DEACTIVATION" },
};

export const GAME_OFFERING_MODALS = {
  EDIT_GAME_OFFERING: {
    name: "EDIT_GAME_OFFERING",
    title: "EDIT GAME OFFERING",
  },
  USER_IN_GAME: {
    name: "USER_IN_GAME",
    title: "USER IN GAME",
  },
};



export const ROLES_SELECT_OPTIONS = [
  { name: "superadmin", label: "Super Admin" },
  { name: "admin", label: "Admin" },
  { name: "verifier", label: "Verifier" },
  { name: "superagent", label: "Super Agent" },
  { name: "masteragent", label: "Master Agent" },
  { name: "agent", label: "Agent" },
  { name: "operator", label: "Operator" },
  { name: "supervisor", label: "Supervisor" },
  { name: "moderator", label: "Moderator" },
  { name: "accounting", label: "Accounting" },
  { name: "player", label: "Player" },
  { name: "host", label: "Host" },
  { name: "csr", label: "CSR" },
  { name: "auditor", label: "Auditor" },
  { name: "cashier", label: "Cashier" },
  { name: "treasury", label: "Treasury" },
  { name: "host_monitoring", label: "Host Monitoring" },
];

export const GENDER_SELECT_OPTIONS = [
  { name: "1", label: "Male" },
  { name: "2", label: "Female" },
];

export const STATUS_SELECT_OPTIONS = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "deactivated", label: "Deactivated" },
];

export const TRANSACTION_TYPE = [
  { name: "deposit", label: "Deposit" },
  { name: "withdrawal", label: "Withdraw" },
  // { name: "bet", label: "Bet" },
  { name: "wonprize", label: "Won Prize" },
  { name: "losebet", label: "Lose Bet" },
  { name: "load", label: "Load" },
  { name: "promo", label: "Promo" },
  { name: "deduct", label: "Deduct" },
  { name: "sendGift", label: "Send Gift" },
 
];

export const TRANSACTION_STATUS = [
  { name: "INITIAL", label: "Initial" },
  { name: "SUCCESS", label: "Success" },
  { name: "FAILED", label: "Failed" },
];

const ROLES = {
  SUPERADMIN: {
    name: "superadmin",
    label: "Super Admin",
    bgColor: "#379f86",
    color: "#ffffff",
  },
  ADMINISTRATOR: {
    name: "admin",
    label: "Admin",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  VERIFIER: {
    name: "verifier",
    label: "Verifier",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  SUPERAGENT: {
    name: "superagent",
    label: "Super Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  MASTERAGENT: {
    name: "masteragent",
    label: "Master Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  AGENT: {
    name: "agent",
    label: "Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  OPERATOR: {
    name: "operator",
    label: "Operator",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  SUPERVISOR: {
    name: "supervisor",
    label: "Supervisor",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  MODERATOR: {
    name: "moderator",
    label: "Moderator",
    bgColor: "#222d39",
    color: "#ffffff",
  },
  ACCOUNTING: {
    name: "accounting",
    label: "Accounting",
    bgColor: "#ecd50a",
    color: "#ffffff",
  },
  PLAYER: {
    name: "player",
    label: "Player",
    bgColor: "#7F00FF",
    color: "#ffffff",
  },
  HOST: {
    name: "host",
    label: "Host",
    bgColor: "#FF5733",
    color: "#ffffff",
  },
  CSR: {
    name: "csr",
    label: "CSR",
    bgColor: "#33FF57",
    color: "#ffffff",
  },
  AUDITOR: {
    name: "auditor",
    label: "Auditor",
    bgColor: "#FF5733",
    color: "#ffffff",
  },
  CASHIER: {
    name: "cashier",
    label: "Cashier",
    bgColor: "#FF8C00", // Example: Orange color
    color: "#ffffff", // White text color
  },
  TREASURY: {
    name: "treasury",
    label: "Treasury",
    bgColor: "#006400", 
    color: "#ffffff", 
  },
  HOST_MONITORING: {
    name: "host_monitoring",
    label: "Host Monitoring",
    bgColor: "#8B0000",
    color: "#ffffff", 
  }
};

export const OPERATOR_ROLES_LIST = ["OPERATOR", "MODERATOR", "CSR", "CASHIER"];

export const GAMES_NAME = {
  ZODIAC: "ZODIAC",
  DOS_LETRA_KARERA: "DOS_LETRA_KARERA",
  TRES_LETRA_KARERA: "TRES_LETRA_KARERA",
};

export const PROMOS_BANNER = {
  [WELCOME_BONUS_PROMO]: {
    imgName:welcomeBonusPromoBanner,
    imgNamePopUp: welcomeBonusBannerPopup,
    bgColor: "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
    bgColorDisabled: "#E0E0E0",
    color: "#1A1A1A",
    headerTitle: `Here’s your ₱20 
    Welcome Bonus!`,
    subText: `Check how to claim your bonus!`,
    buttonProp: {
      background: "linear-gradient(180deg, #FFEA00 0%, #FFC600 100%)",
      borderRadius: "30px",
      fontWeight: 600,
      fontSize: "20px",
      letterSpacing: "0.15px",
      color: "#1A1A1A",
      "&:hover": {
        background: "linear-gradient(180deg, #FFEA00 0%, #FFC600 100%)",
      },
    },
  },
  [REFER_EARN_PROMO]:  {
    imgName:referEarnPromo,
    imgNamePopUp: referEarnBannerPopup,
    bgColor: "linear-gradient(180deg, hsla(273, 73%, 42%, 1) 0%, hsla(262, 63%, 38%, 1) 100%)",
    color: "#FFFFFF",
    bgColorDisabled: "#E0E0E0",
    headerTitle: `Refer & Earn! 
    Get ₱20 Promo!`,
    subText: `Check this Referral Promo.`,
    buttonProp: {
      background: "linear-gradient(360deg, #731DB9 0%, #52249F 100%)",
      borderRadius: "30px",
      fontWeight: 600,
      fontSize: "20px",
      letterSpacing: "0.15px",
      color: "#FFF",
      "&:hover": {
        background: "linear-gradient(360deg, #731DB9 0%, #52249F 100%)",
      },
    },
  },
  [BITHRDAY_BENTE_PROMO]:   {
    imgName:birthdayBentePromo,
    imgNamePopUp: bdayBannerPopup,
    bgColor: "linear-gradient(180deg, hsla(47, 100%, 58%, 1) 0%, hsla(23, 100%, 51%, 1) 100%)",
    color: "#FFFFFF",
    bgColorDisabled: "#E0E0E0",
    headerTitle: `Birthday mo ngayon? 
    May bonus kami sa’yo!`,
    subText: `Claim your Birthday Bonus today!`,
    buttonProp: {
      background: "linear-gradient(180.01deg, #FFD027 0.01%, #FF6807 99.99%)",
      borderRadius: "30px",
      fontWeight: 600,
      fontSize: "20px",
      letterSpacing: "0.15px",
      color: "#FFFFFF",
      "&:hover": {
        background: "linear-gradient(180.01deg, #FFD027 0.01%, #FF6807 99.99%)",
      },
    },
  }
}

export const VOUCHER_ROW = {
  [KARERALIVE300]: {
    description:`Redeem your ₱300 gift credits`,
  },
}

export const SITE_DATA = [
  {
    id: 1,
    label: "SITE A",
  },
];

export const TRANSACTION_TYPE_SELECT = [
  { name: "deposit", label: "Deposit" },
  { name: "withdrawal", label: "Withdrawal" },
  { name: "bet", label: "Bet" },
  { name: "wonprize", label: "Won Prize" },
  { name: "losebet", label: "Lose Bet" },
  { name: "load", label: "Load" },
  { name: "promo", label: "Promo" },
  { name: "deduct", label: "Deduct" },
  { name: "sendGift", label: "Send Gift" },
];

export const MERCHANT_TRANSACTION_TYPE_SELECT = [
  { name: "deposit", label: "Deposit" },
  { name: "withdrawal", label: "Withdrawal" },
];

export const MERCHANT_TEMPORARY_STATUS_SELECT = [
  { name: "INITIAL", label: "Initial" },
  { name: "SUCCESS", label: "Success" },
];

export const TRANSACTION_STATUS_SELECT = [
  { name: "SUCCESS", label: "Success" },
  { name: "INITIAL", label: "Initial" },
  { name: "FAILED", label: "Failed" },
];

export const TRANSACTION_PLAYER_TYPE_SELECT = [
  { name: "1", label: "Direct" },
  { name: "0", label: "Indirect" },
];

export const ROLES_REFERRALS_SELECT = [
  { name: ROLES.MASTERAGENT.name, label: ROLES.MASTERAGENT.label },
  { name: ROLES.AGENT.name, label: ROLES.AGENT.label },
  { name: ROLES.PLAYER.name, label: ROLES.PLAYER.label },
];

export const KYC_STATUS_SELECT = [
  { name: "notstarted", label: "Not Started" },
  { name: "forapproval", label: "For Approval" },
  { name: "pending", label: "Pending" },
  { name: "done", label: "Done" },
];


export const ISACTIVE_SELECT = [
  { name: "active", label: "Active" },
  { name: "inactive", label: "Inactive" },
];

export const LOG_TYPE_SELECT = [
  { name: "login", label: "Login" },
  { name: "logout", label: "Logout" },
  { name: "active", label: "Active" },
  { name: "inactive", label: "Inactive" },
];

export const ZODIACS = {
  ARIES: "aries",
  CANCER: "cancer",
  LIBRA: "libra",
  CAPRICORN: "capricorn",
  TAURUS: "taurus",
  LEO: "leo",
  SCORPIO: "scorpio",
  AQUARIUS: "aquarius",
  GEMINI: "gemini",
  VIRGO: "virgo",
  SAGITTARIUS: "sagittarius",
  PISCES: "pisces",
};

export const GAME_MATCH_STATUS = {
  INITIAL: {
    name: "initial",
    label: "INITIAL",
  },
  OPEN: {
    name: "open",
    label: "OPEN",
  },
  LASTCALL: {
    name: "lastcall",
    label: "LASTCALL",
  },
  CLOSED: {
    name: "closed",
    label: "CLOSED",
  },
  WINNERS: {
    name: "winners",
    label: "WINNERS",
  },
  ROLLING: {
    name: "rolling",
    label: "ROLLING",
  },
};

export const ZODIACS_BET_PRICE = {
  ["10"]: "10",
  ["20"]: "20",
  ["50"]: "50",
  ["100"]: "100",
  ["500"]: "500",
  ["ALLIN"]: "ALLIN",
};

export const CREDITS_MODALS = {
  ADD_CREDITS: { name: "ADD_CREDITS", title: "ADD CREDITS" },
};

export const PAGES = {
  USER_MANAGEMENT: { name: "user-management" },
  PROFILE: { name: "profile" },
  CREDITS: { name: "credits" },
  REFERRALS: { name: "referrals" },
};

export const LEFT_SIDEBAR_MOBILE = {
  PROFILE: {
    name: "PROFILE",
    label: "Profile",
  },
  KYC: {
    name: "KYC",
    label: "KYC",
  },
  MOBILE_NUMBER: {
    name: "MOBILE_NUMBER",
    label: "Mobile Number",
  },
  FAQS: {
    name: "FAQS",
    label: "Faqs",
  },
  SUPPORTS: {
    name: "SUPPORTS",
    label: "Supports",
  },
};

const GENDER = {
  MALE: {
    name: "male",
    label: "Male",
    value: 1,
  },
  FEMALE: {
    name: "female",
    label: "Female",
    value: 2,
  },
};

const ACTION_STATUS = {
  NEW: {
    name: "new",
    label: "New",
    color: "white",
    bgColor: "orange",
  },
  FOR_APPROVAL: {
    name: "forapproval",
    label: "For Approval",
    color: "black",
    bgColor: "yellow",
  },
  FOR_DEACTIVE: {
    name: "fordeactive",
    label: "For Disappproval",
    color: "black",
    bgColor: "#ff9999",
  },
  DEACTIVE: {
    name: "deactive",
    label: "Disapproved",
    color: "white",
    bgColor: "red",
  },
  PENDING: {
    name: "pending",
    label: "Pending",
    color: "black",
    bgColor: "yellow",
  },
  DENIED: {
    name: "denied",
    label: "Denied",
    color: "white",
    bgColor: "black",
  },
  APPROVED: {
    name: "approved",
    label: "Approved",
    color: "white",
    bgColor: "green",
  },
};

const GOVTIDS = {
  NONE: {
    name: "0",
    label: "",
  },
  UMID: {
    name: "1",
    label: "UMID ID",
    docType: "00630000001"
  },
  TIN: {
    name: "2",
    label: "TIN NEW VERSION ID",
    docType: "00630000036"
  },
  DRIVERSLICENSE: {
    name: "3",
    label: "Driver's License ID",
    docType: "00630000004"
  },
  PHILHEALTH: {
    name: "4",
    label: "PhilHealth ID",
    docType: "00630000024"
  },
  SSS: {
    name: "5",
    label: "SSS ID",
    docType: "00630000020"
  },
  POSTAL: {
    name: "6",
    label: "Postal ID",
    docType: "00630000016"
  },
  PRC: {
    name: "7",
    label: "PRC ID",
    docType: "00630000017"
  },
  VOTER: {
    name: "8",
    label: "Voter's ID",
    docType: "00630000022"
  },
  IDSYS: {
    name: "9",
    label: "Identification System ID",
    docType: "00630000033"
  },
  PASSPORT: {
    name: "10",
    label: "Passport - New Version",
    docType: "00630000032"
  },
  PHILSYS: {
    name: "11",
    label: "Printed PhilSysID",
    docType: "00630000034"
  },
  EMPPERMIT: {
    name: "12",
    label: "Employment Permit",
    docType: "00630000037"
  },
  ALIENT_REG_CARD: {
    name: "13",
    label: "Alien Registration Card",
    docType: "00630000038"
  },
};

export const govTypeSelect = [
  { code: "0", name: "Select Gov't ID", docType: "" },
  { code: "1", name: "UMID ID", docType: "00630000001" },
  { code: "2", name: "TIN ID", docType: "00630000002" },
  { code: "3", name: "Driver's License ID", docType: "00630000004" },
  // { code: "4", name: "PhilHealth ID", docType: "00630000024" },
  { code: "5", name: "SSS ID", docType: "00630000020" },
  { code: "6", name: "Postal ID", docType: "00630000016" },
  { code: "7", name: "PRC ID", docType: "00630000017" },
  { code: "8", name: "Voter's ID", docType: "00630000022" },
  { code: "9", name: "Identification System ID", docType: "00630000033" },
  { code: "10", name: "Passport", docType: "00630000032" },
  // { code: "11", name: "Printed PhilSysID", docType: "00630000034" },
  // { code: "12", name: "Employment Permit", docType: "00630000037" },
  // { code: "13", name: "Alien Registration Card", docType: "00630000038" },
];

const NATIONALITIES = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan and Barbudan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian and Herzegovinian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese (Congo)",
  "Congolese (DRC)",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirati (United Arab Emirates)",
  "English",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guinea-Bissauan",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mosotho",
  "Motswana (Botswana)",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerien",
  "Nigerian",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Vanuatuan",
  "Vatican",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];

export const zodiacNameWithLogoPath = [
  { name: "Aries", icon: AriesLogo },
  { name: "Taurus", icon: TaurusLogo },
  { name: "Gemini", icon: GeminiLogo },
  { name: "Cancer", icon: Cancerogo },
  { name: "Leo", icon: LeoLogo },
  { name: "Virgo", icon: VirgoLogo },
  { name: "Libra", icon: LibraLogo },
  { name: "Scorpio", icon: ScorpioLogo },
  { name: "Sagittarius", icon: SagittariusLogo },
  { name: "Capricorn", icon: CapricornLogo },
  { name: "Aquarius", icon: AquariusLogo },
  { name: "Pisces", icon: PiscesLogo },
];

export const banksAndEWallets = [
  { name: "G-Xchange, Inc. (GCash)", icon: checkCircleGreenIcon },
  { name: "GrabPay", icon: checkCircleGreenIcon },
  { name: "Maya Philippines, Inc.", icon: checkCircleGreenIcon },
  { name: "ShopeePay Philippines, Inc.", icon: checkCircleGreenIcon },
  { name: "Asia United Bank Corporation", icon: checkCircleGreenIcon },
  { name: "Bank of the Philippine Islands", icon: checkCircleGreenIcon },
  { name: "BDO Unibank, Inc.", icon: checkCircleGreenIcon },
  { name: "Metropolitan Bank and Trust Co.", icon: checkCircleGreenIcon },
  { name: "Security Bank Corporation", icon: checkCircleGreenIcon },
  { name: "Union Bank of the Philippines", icon: checkCircleGreenIcon },
];

export { ROLES, GOVTIDS, GENDER, NATIONALITIES, ACTION_STATUS };
