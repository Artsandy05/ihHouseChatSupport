import VIP from "@assets/badges/vip.svg";
import MasterGiver from "@assets/badges/master-giver.svg";
import FrontRunner from "@assets/badges/front-runner.svg";
import Loyalty from "@assets/badges/loyalty.svg";
import VIPFrame from "@assets/images/Karera-Live-VIP-Frame.svg";

const badges = [
  {
    img: {
      badge: VIP,
      exclusives: { avatar_frame: VIPFrame },  // Typed as an object
    },
    title: "VIP",
    color: "hsla(265, 55%, 34%, 1)",
    details: {
      body: "Players who have bet a total of ₱500,000+ within one month.",
      highlights: ["₱500,000+"],
    },
    chat: {
      duration: { count: 6, last: "months" },
      color: "hsla(265, 55%, 34%, 0.65)",
    },
    exclusives: [
      {
        name: "avatar_frame",
        label: "Exclusive Avatar Frame",
        duration: { count: 6, last: "months" },
        style: { img: {}, label: {} },  // Empty objects for now, can be filled later
      },
    ],
  },
  {
    img: { badge: FrontRunner },
    title: "Front-Runner",
    color: "hsla(23, 100%, 50%, 1)",
    details: {
      body: "Players who have played 300 rounds per week.",
      highlights: ["300", "rounds"],
    },
    chat: {
      duration: { count: 7, last: "days" },
      color: "hsla(23, 100%, 50%, .65)",
    },
  },
  {
    img: { badge: Loyalty },
    title: "Loyalty",
    color: "hsla(194, 100%, 50%, 1)",
    details: {
      body: "Players who open Karera Live daily, from Monday to Sunday.",
      highlights: ["Monday", "to", "Sunday."],
    },
    chat: {
      duration: { count: 7, last: "days" },
      color: "hsla(194, 100%, 50%, .65)",
    },
  },
  {
    img: { badge: MasterGiver },
    title: "Master Giver",
    color: "hsla(147, 100%, 32%, 1)",
    details: {
      body: "Top 10 generous givers who sent gifts to our awesome hosts.",
      highlights: ["Top", "10", "generous", "givers"],
    },
    chat: {
      duration: { count: 30, last: "days" },
      color: "hsla(147, 100%, 32%, .65)",
    },
  },
];

export { VIP, MasterGiver, FrontRunner, Loyalty, VIPFrame, badges };
