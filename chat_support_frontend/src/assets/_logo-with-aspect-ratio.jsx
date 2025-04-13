import KARERA_LIVE_WRAP from "@assets/images/karera-live-logo-wrap.svg";
import KARERA_LIVE_INLINE from "@assets/images/karera-live-logo-nowrap.svg";
import PAGCOR_21_W from "@assets/images/pagcor-w.svg";
import PAGCOR_21_B from "@assets/images/pagcor-b.svg";



export const LOGO_INLINE = ({ width, height, style }) => (
  <img
    src={KARERA_LIVE_INLINE}
    alt="karera-live-inling"
    style={{
      width: width ?? "100%",
      height: height ?? "auto",
      aspectRatio: "4.4 / 1",
      ...(style ?? {}),
    }}
  />
);

export const LOGO_WRAP = ({ width, height, style }) => (
  <img
    src={KARERA_LIVE_WRAP}
    alt="karera-live-inling"
    style={{
      width: width ?? "100%",
      height: height ?? "auto",
      aspectRatio: "1.8 / 1",
      ...(style ?? {}),
    }}
  />
);

export const PAGCOR_21 = ({ width, height, style, variant }) => (
  <img
    src={variant == "white" ? PAGCOR_21_W : PAGCOR_21_B }
    alt="karera-live-inling"
    style={{
      width: width ?? "100%",
      height: height ?? "auto",
      aspectRatio: "2.1 / 1",
      ...(style ?? {}),
    }}
  />
);
