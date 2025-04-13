import homeTresLetraKarera from "@assets/images/home-tres-letra-karera-img.png";

import homeZodiacRaceGameListBanner from "@assets/images/zodiac-race-square.png";

import homeDosRaceGameListBannerDisabled from "@assets/images/dos-race-square-disabled.png";

import homeDosLetraKareraBanner from "@assets/images/dos-letra-karera-banner-final.png";
import homeTresLetraKareraBanner from "@assets/images/home-tres-letra-karera-banner.png";
import homeZodiacrareBanner from "@assets/images/home-banner-1.jpg";

import zodiacGamesHeaderIntructions from "@assets/images/zodiac-games-header-intructions.png";

import zodiacRaceBg from "@assets/images/zodiac-race-banner-long.png";
import dosLetraBg from "@assets/images/dos-letra-logo-banner-long.png";
import tresLetraBg from "@assets/images/home-tres-letra-karera-img.png";

import { GAMES_NAME } from ".";

export const GAMES_INFO = {
  [GAMES_NAME.ZODIAC]: {
    banner: homeZodiacRaceGameListBanner,
    bannerDisabled: homeZodiacRaceGameListBanner,
    bg: zodiacRaceBg,
    bgPreview: homeZodiacrareBanner,
    bgPreviewIcon: zodiacGamesHeaderIntructions,
    bgPreviewButton: `linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)`,
    labelPreview: "Zodiac Race",
    descPreview: "Let’s try your luck in this game!"
  },
  [GAMES_NAME.TRES_LETRA_KARERA]: {
    banner: homeTresLetraKareraBanner,
    bannerDisabled: homeTresLetraKareraBanner,
    bg: tresLetraBg,
    bgPreview: homeTresLetraKarera,
    bgPreviewIcon: homeTresLetraKareraBanner,
    bgPreviewButton: `linear-gradient(180.01deg, #FFD027 0.01%, #FF6807 99.99%);`,
    labelPreview: "Tres Letra Karera",
    descPreview: "Try this exciting game and win!"
  },
};

export const GAMES_DATA = [
  {
    id: 1,
    name: "ZODIAC",
    label: "Zodiac Race",
    banner: homeZodiacRaceGameListBanner,
  },
  {
    id: 2,
    name: "DOS_LETRA_KARERA",
    label: "Dos Letra Karera",
    banner: homeDosLetraKareraBanner,
  },
  {
    id: 3,
    name: "TRES_LETRA_KARERA",
    label: "Tres Letra Karera",
    banner: homeTresLetraKareraBanner,
  },
];
