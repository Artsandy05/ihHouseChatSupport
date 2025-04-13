import AriesLogo from "@assets/images/representative/aries_sign.png";
import TaurusLogo from "@assets/images/representative/taurus_sign.png";
import GeminiLogo from "@assets/images/representative/gemini_sign.png";
import CancerLogo from "@assets/images/representative/cancer_sign.png";
import LeoLogo from "@assets/images/representative/leo_sign.png";
import VirgoLogo from "@assets/images/representative/virgo_sign.png";
import LibraLogo from "@assets/images/representative/libra_sign.png";
import ScorpioLogo from "@assets/images/representative/scorpio_sign.png";
import SagittariusLogo from "@assets/images/representative/sagittarius_sign.png";
import CapricornLogo from "@assets/images/representative/capricorn_sign.png";
import AquariusLogo from "@assets/images/representative/aquarius_sign.png";
import PiscesLogo from "@assets/images/representative/pisces_sign.png";

import DosLetraLogoA from "@assets/images/dosLetraAOption.png";
import DosLetraLogoB from "@assets/images/dosLetraBOption.png";

import zodiacRaceBanner from "@assets/images/representative/zodiac-race-square.png";
import dosLetraKareraBanner from "@assets/images/representative/dos-letra-karera-banner-square.png";
import ZODIAC_RACE_BANNER_LONG from "@assets/images/representative/zodiac-race-logo-banner-long.png";
import DOS_LETRA_KARERA_BANNER_LONG from "@assets/images/representative/dos-letra-logo-banner-long.png";

export const ZodiacColorPalette = {
  aries_palette: "#A42227",
  taurus_palette: "#095330",
  gemini_palette: "#FFD91B",
  cancer_palette: "#1B1E6E",
  leo_palette: "#F58D1C",
  virgo_palette: "#75512D",
  libra_palette: "#D04D7D",
  scorpio_palette: "#202020",
  sagittarius_palette: "#4F2787",
  capricorn_palette: "#8B8B8B",
  aquarius_palette: "#2583AB",
  pisces_palette: "#5AAE84",
};

export const DosLetraColorPalette = {
  letter_a_palette: "linear-gradient(180.01deg, #FF2020 0.01%, #C80000 99.99%)",
  letter_b_palette: "linear-gradient(180deg, #00C0FA 0%, #015EEA 100%)",
};

export const dataZodiacBalls = [
  {
    id: 1,
    name: "Aries",
    total_bets: 1500,
    multiplier: 10.5,
    zodiac_logo: AriesLogo,
    background_color: ZodiacColorPalette.aries_palette,
  },
  {
    id: 2,
    name: "Taurus",
    total_bets: 1300,
    multiplier: 9.8,
    zodiac_logo: TaurusLogo,
    background_color: ZodiacColorPalette.taurus_palette,
  },
  {
    id: 3,
    name: "Gemini",
    total_bets: 1200,
    multiplier: 8.7,
    zodiac_logo: GeminiLogo,
    background_color: ZodiacColorPalette.gemini_palette,
  },
  {
    id: 4,
    name: "Cancer",
    total_bets: 1100,
    multiplier: 8.2,
    zodiac_logo: CancerLogo,
    background_color: ZodiacColorPalette.cancer_palette,
  },
  {
    id: 5,
    name: "Leo",
    total_bets: 1400,
    multiplier: 9.5,
    zodiac_logo: LeoLogo,
    background_color: ZodiacColorPalette.leo_palette,
  },
  {
    id: 6,
    name: "Virgo",
    total_bets: 1250,
    multiplier: 9.0,
    zodiac_logo: VirgoLogo,
    background_color: ZodiacColorPalette.virgo_palette,
  },
  {
    id: 7,
    name: "Libra",
    total_bets: 1150,
    multiplier: 8.6,
    zodiac_logo: LibraLogo,
    background_color: ZodiacColorPalette.libra_palette,
  },
  {
    id: 8,
    name: "Scorpio",
    total_bets: 1350,
    multiplier: 9.7,
    zodiac_logo: ScorpioLogo,
    background_color: ZodiacColorPalette.scorpio_palette,
  },
  {
    id: 9,
    name: "Sagittarius",
    total_bets: 1450,
    multiplier: 10.1,
    zodiac_logo: SagittariusLogo,
    background_color: ZodiacColorPalette.sagittarius_palette,
  },
  {
    id: 10,
    name: "Capricorn",
    total_bets: 1275,
    multiplier: 9.3,
    zodiac_logo: CapricornLogo,
    background_color: ZodiacColorPalette.capricorn_palette,
  },
  {
    id: 11,
    name: "Aquarius",
    total_bets: 1300,
    multiplier: 9.9,
    zodiac_logo: AquariusLogo,
    background_color: ZodiacColorPalette.aquarius_palette,
  },
  {
    id: 12,
    name: "Pisces",
    total_bets: 1180,
    multiplier: 8.8,
    zodiac_logo: PiscesLogo,
    background_color: ZodiacColorPalette.pisces_palette,
  },
];

export const dataLetraDosBalls = [
  {
    id: 'A',
    name: "Letra A",
    total_bets: 150450.0,
    multiplier: 75.2,
    zodiac_logo: DosLetraLogoA,
    background_color: DosLetraColorPalette.letter_a_palette,
  },
  {
    id: 'B',
    name: "Letra B",
    total_bets: 132200.0,
    multiplier: 24.8,
    zodiac_logo: DosLetraLogoB,
    background_color: DosLetraColorPalette.letter_b_palette,
  },
];

export const dataGameSelectionItems = [
  {
    id: 1,
    name: "Zodiac Race",
    image_url: zodiacRaceBanner,
    overlay: ZODIAC_RACE_BANNER_LONG,
    is_active: true,
    redirect: "/operator/representative/main-betting?game_id=1",
  },
  {
    id: 2,
    name: "Dos Letra Karera",
    image_url: dosLetraKareraBanner,
    overlay: DOS_LETRA_KARERA_BANNER_LONG,
    is_active: true,
    redirect: "/operator/representative/main-betting?game_id=2",
  },
];

export const amountMenu = [
  {
    amount: 10,
  },
  {
    amount: 20,
  },
  {
    amount: 50,
  },
  {
    amount: 100,
  },
  {
    amount: 200,
  },
  {
    amount: 500,
  },
  {
    amount: 1000,
  },
  {
    amount: 5000,
  },
  {
    amount: 10000,
  },
];

export const dataTableSample = [
  {
    id: 1,
    zodiac_ball_name: "Aries",
    zodiac_ball_logo: AriesLogo,
    qty: 3,
    total_bet: 1234.0,
  },
  {
    id: 2,
    zodiac_ball_name: "Taurus",
    zodiac_ball_logo: TaurusLogo,
    qty: 6,
    total_bet: 3234.0,
  },
  {
    id: 3,
    zodiac_ball_name: "Gemini",
    zodiac_ball_logo: GeminiLogo,
    qty: 4,
    total_bet: 1500.0,
  },
  {
    id: 4,
    zodiac_ball_name: "Cancer",
    zodiac_ball_logo: CancerLogo,
    qty: 2,
    total_bet: 987.0,
  },
  {
    id: 5,
    zodiac_ball_name: "Leo",
    zodiac_ball_logo: LeoLogo,
    qty: 5,
    total_bet: 1500.0,
  },
  {
    id: 6,
    zodiac_ball_name: "Virgo",
    zodiac_ball_logo: VirgoLogo,
    qty: 7,
    total_bet: 2200.0,
  },
  {
    id: 7,
    zodiac_ball_name: "Libra",
    zodiac_ball_logo: LibraLogo,
    qty: 3,
    total_bet: 1150.0,
  },
  {
    id: 8,
    zodiac_ball_name: "Scorpio",
    zodiac_ball_logo: ScorpioLogo,
    qty: 5,
    total_bet: 1800.0,
  },
  {
    id: 9,
    zodiac_ball_name: "Sagittarius",
    zodiac_ball_logo: SagittariusLogo,
    qty: 8,
    total_bet: 2100.0,
  },
  {
    id: 10,
    zodiac_ball_name: "Capricorn",
    zodiac_ball_logo: CapricornLogo,
    qty: 2,
    total_bet: 234.0,
  },
  {
    id: 11,
    zodiac_ball_name: "Aquarius",
    zodiac_ball_logo: AquariusLogo,
    qty: 4,
    total_bet: 1300.0,
  },
  {
    id: 12,
    zodiac_ball_name: "Pisces",
    zodiac_ball_logo: PiscesLogo,
    qty: 3,
    total_bet: 105000.0,
  },
];

export const dataTableSubTotal = {
  game_id: 1234,
  ticket_number: "ABC12345",
  total_number_of_bets: 12,
  total_amount: 1000000.0,
};
