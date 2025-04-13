// Guide for adding or understand the FAQ collapsible data is at the bottom of this file

const color = {
  light_yellow: "#FFDC61",
  dark_cyan: "#00A24A",
  bright_red: "#E83F3F",
  pure_orange: "#FE8F00",
  light_blue: "#58B5FF",
  very_light_blue: "#7777FF",
};

const account_membership = {
  title: "Account Membership",
  themeColor: color.light_yellow, // should be in hex format
  children: [
    {
      title: "Paano mag-Register sa Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 1223,
      content: [
        { type: "header", content: "Here’s a step-by-step guide:" },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "Pumunta sa www.karera.live. Basahin ang government mandated provision pop-up, at i-click ang “ACCEPT” button. Then, i-click ang “Sign Up” sa upper right part ng iyong homescreen",
                highlighted: ["“Sign", "Up”"],
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your First Name, Last Name, Birthdate, Mobile Number, and Select your Gaming Site. Then, tick the checkbox at basahin ang government mandated provision pop-up, Terms & Conditions, and Privacy Policy. Click “ACCEPT” .",
                  highlighted: ["“ACCEPT”"],
              },
              {
                type: "body",
                content:
                  "Pagkatapos, i-click ang “Proceed”.",
              },  
              {
                type: "list",
                list: [
                  {
                    content:
                      "Siguraduhin na ang iyong personal details ay pareho sa iyong government-issued ID.",
                  },
                  {
                    content:
                      "Siguraduhin na ang iyong Mobile Number ay active to receive OTP codes for verification.",
                  },
                ],
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the correct One-Time-Pin (OTP) received via SMS. The verification code consists of six digits.  After i-enter ang code, click “Verify”.",
                highlighted: ["“Verify”."],
              },
              {
                type: "list",
                list: [
                  {
                    content:
                      "Kung hindi natanggap ang code, maaaring mag-resend ng OTP after one minute.",
                  },
                  {
                    content:
                      "After following all the steps, you will be redirected to the Sign In page.",
                  },
                ],
              },
            ],
            [
              {
                type: "body",
                content:
                  "Select the type of your valid document. Then, click “Next”.",
                highlighted: ["“Next”."],
              },
            ],
            [
              {
                type: "body",
                content:
                  "Take a photo of your valid document. Then, click “Upload”",
                  highlighted: ["“Upload”"],
              },
              {
                type: "body",
                content:
                  "Once you complete all the steps, you will be redirected to the homepage.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Paano mag-Sign In sa Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "A. Sign In via Mobile Number and One-Time-Pin (OTP)",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "Pumunta sa www.karera.live. Basahin ang government mandated provision pop-up, at i-click ang “ACCEPT” button. Then, i-click ang “Sign In” sa upper right part ng iyong homescreen.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your registered mobile number. Then, tick the checkbox at basahin ang government mandated provision pop-up, Terms & Conditions, and Privacy Policy. Click “ACCEPT” .",
              },
              {
                type: "body",
                content:
                  "Pagkatapos, i-click ang “Request OTP”",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the correct One-Time-Pin (OTP) received via SMS. The verification code consists of six digits. After i-enter ang code, click “Verify”.",
              },
              {
                type: "body",
                content:
                  "Kung hindi natanggap ang code, maaaring mag-resend ng OTP after one minute.",
              },
              {
                type: "body",
                content:
                  "Once you complete all the steps, you will be redirected to the homepage.",
              },
            ],
          ],
        },
        {
          type: "header",
          content: "B. Sign In via Mobile Number and Password",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "Pumunta sa www.karera.live. Basahin ang government mandated provision pop-up, at i-click ang “ACCEPT” button. Then, i-click ang “Sign In” sa upper right part ng iyong homescreen.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your registered mobile number and Password.Then, tick the checkbox at basahin ang government mandated provision pop-up, Terms & Conditions, and Privacy Policy. Click “ACCEPT” .",
              },
              {
                type: "body",
                content:
                  "Pagkatapos, i-click ang “Sign In”",
              },
              {
                type: "body",
                content:
                  "Once you complete all the steps, you will be redirected to the homepage.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Ano ang age requirement to play on Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content: "At Karera.Live, the age requirement is 21 years old.",
        },
        {
          type: "body",
          content:
            "Karera.Live is dedicated to promoting responsible gaming. By setting the minimum age at 21, sinisiguro namin na tanging mga adults (21 years old and above) lamang ang maaaring makapaglaro, para sa safe, responsible, and enjoyable gaming experience for all.",
        },
      ],
    },
    {
      title: "What devices can be used to access Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang Karera.Live ay maaaring ma-access using your mobile phone, including both Android and iOS devices, as well as on tablets and iPads.",
        },
        {
          type: "body",
          content:
            "Note: Hindi maaaring ma-acces and Karera.Live using desktops or laptops.",
          highlighted: "Note:",
        },
      ],
    },
    {
      title: "Available ba ang Karera.Live in other countries?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Sa ngayon, ang Karera.Live ay maaari lamang ma-access within the Philippines.",
        },
        {
          type: "body",
          content: "This is not currently available in other countries.",
        },
      ],
    },
    {
      title: "Maaari ba akong magkaroon ng multiple accounts?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Hindi pinapayagan ng Karera.Live ang pagkakaroon at paggamit ng multiple accounts.",
        },
        {
          type: "body",
          content:
            "Isang account lamang ang maaaring gawin at gamitin ng isang player using his or her mobile number and government-issued ID.",
        },
      ],
    },
    {
      title: "Maaari ba akong maglaro using my account on multiple devices?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Hindi rin pinapayagan ng Karera.Live ang paggamit ng multiple devices gamit ang isang account lamang.",
        },
        {
          type: "body",
          content:
            "Ang Karera.Live ay may ”One Player, One Device Policy”, na kung saan ang isang player na currently Signed In sa isang device, ay hindi na maaaring mag-Sign In pa sa different devices.",
        },
        {
          type: "body",
          content:
            "At kung mag-Sign In man ang player gamit ang ibang device, the currently Signed In account will be automatically Signed Out or removed.",
        },
      ],
    },
  ],
};

const mobile_nummber = {
  title: "Mobile Number",
  themeColor: color.dark_cyan, // should be in hex format
  children: [
    {
      title: "Para saan ang Mobile Number?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang iyong Mobile Number ay gagamitin sa pag-Sign In ng iyong account. Ito rin ay dapat active to receive One-Time-Pin (OTP) for verification.",
        },
      ],
    },
    {
      title: "Can I change my Mobile Number?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content: "Yes, you can change your registered Mobile Number.",
        },
        {
          type: "header",
          content: "Follow these 4-easy steps to change your Mobile Number:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To change your mobile number, i-click ang iyong avatar or photo next to your balance. On the sidebar, i-select ang “Mobile Number”, at i-click ang “Generate OTP”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the One-Time-Pin (OTP) sent to your currently registered mobile number, at i-click ang “Submit”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "I-enter ang iyong New Mobile Number, at i-click ang “Generate OTP”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the One-Time-Pin (OTP) sent to your New Mobile Number, and click “Submit”.",
              },
            ],
          ],
        },
      ],
    },
    {
      title:
        "Paano kung wala na akong access to my old mobile number at gusto kong i-transfer ang lahat ng data at funds to my new account using my new mobile number?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Kung mawalan ka ng access sa iyong currently registered Mobile Number due to some valid reasons, you can email our customer support at support@karera.live or chat our friendly Karera.Live agent via our Live Chat Support page.",
        },
        {
          type: "body",
          content:
            "Bago ma-transfer ang lahat ng details at funds, magkakaroon lamang ng verification process for us to prove that you are the one who owns the specific account that you are claiming.",
        },
      ],
    },
  ],
};

const sign_pass = {
  title: "Sign In Password",
  themeColor: color.bright_red, // should be in hex format
  children: [
    {
      title: "Para saan ang Sign In Password?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Maaari mong gamitin ang iyong Password sa pag-Sign In. Ito rin ay dagdag security para sa iyong account.",
        },
      ],
    },
    {
      title: "Paano mag-set ng Sign In Password?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content: "Sundang lamang ang steps na ito:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To set your Sign In Password, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Sign In Password”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter and confirm your desired Sign In Password, at i-click ang “Create”.",
              },
            ],
          ],
        },
        {
          type: "header",
          content: "Your password must contain:",
        },
        {
          type: "list",
          list: [
            [
              {
                type: "body",
                content: "Between 8-16 characters",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) uppercase letter (A-Z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) lowercase letter (a-z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) number (0-9)",
              },
            ],
            [
              {
                type: "body",
                content:
                  "At least (1) special character (e.g., !, @, #, $, %, ^, &, *)",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Paano mag-change ng Sign In Password?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To change your Sign In Password, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Sign In Password”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "First, i-enter ang iyong Current Sign In Password. Then, enter and confirm your desired New Sign In Password, at i-click ang “Change”.",
              },
            ],
          ],
        },
        {
          type: "header",
          content: "Your password must contain:",
        },
        {
          type: "list",
          list: [
            [
              {
                type: "body",
                content: "Between 8-16 characters",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) uppercase letter (A-Z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) lowercase letter (a-z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) number (0-9)",
              },
            ],
            [
              {
                type: "body",
                content:
                  "At least (1) special character (e.g., !, @, #, $, %, ^, &, *)",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Paano mag-reset ng Sign In Password?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "To reset your password, sundan lamang ito:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To reset your Sign In Password, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Sign In Password”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "I-click ang “Forgot Password?” below the “Change” button.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your registered Mobile Number. Then, i-click ang “Request OTP”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the One-Time-Pin (OTP) sent to your Mobile Number, and click “Verify”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter and confirm your desired Sign In Password, at i-click ang “Reset”.",
              },
            ],
          ],
        },
        {
          type: "header",
          content: "Your password must contain:",
        },
        {
          type: "list",
          list: [
            [
              {
                type: "body",
                content: "Between 8-16 characters",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) uppercase letter (A-Z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) lowercase letter (a-z)",
              },
            ],
            [
              {
                type: "body",
                content: "At least (1) number (0-9)",
              },
            ],
            [
              {
                type: "body",
                content:
                  "At least (1) special character (e.g., !, @, #, $, %, ^, &, *)",
              },
            ],
          ],
        },
      ],
    },
  ],
};

const wallet_pin = {
  title: "Wallet PIN",
  themeColor: color.pure_orange, // should be in hex format
  children: [
    {
      title: "Para saan ang Wallet PIN?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Your Wallet PIN will be used for secure withdrawal transactions.",
        },
      ],
    },
    {
      title: "Paano mag-set ng Wallet PIN?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Sundan lamang ang steps na ito:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To set your Wallet PIN, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Create Wallet PIN”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Nominate your 4-digit Wallet PIN, at i-click ang “Create”.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Paano mag-change ng Wallet PIN?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To change your Wallet PIN, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Change Wallet PIN”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "I-enter ang iyong Old Wallet PIN, at i-click ang “Change”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Nominate your New 4-digit Wallet PIN. Then, i-click ang “Change”.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Paano mag-reset ng Wallet PIN?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "To reset your Wallet PIN, sundan ang steps na ito:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To reset your Wallet PIN, i-click ang iyong avatar or photo next to your wallet balance. On the sidebar, i-select ang “Change Wallet PIN”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "I-click ang “Forgot Wallet PIN?” below the “Change” button.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your registered Mobile Number. Then, i-click ang “Generate OTP”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter the One-Time-Pin (OTP) sent to your Mobile Number, and click “Submit”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Nominate your New 4-digit Wallet PIN, at i-click ang “Create”.",
              },
            ],
          ],
        },
      ],
    },
  ],
};

const transaction_history = {
  title: "Transaction History",
  themeColor: color.light_blue, // should be in hex format
  children: [
    {
      title: "Saan ko makikita ang lahat ng transactions ko?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "To view your transaction history or receipts, i-click ang “Wallet” sa footer menu. Then, i-tap ang transaction icon (blue receipt) sa upper right corner ng iyong wallet screen.",
        },
        {
          type: "body",
          content:
            "Makikita sa transaction history ang lahat ng iyong deposit, withdrawal, bets, and winning transactions.",
        },
      ],
    },
    {
      title: "Can I download my transactions or receipts?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content: "Yes. Maaaring i-download ang lahat ng iyong transactions.",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "I-click ang “Wallet” sa footer menu. Then, i-tap ang transaction icon (blue receipt) sa upper right corner ng iyong wallet screen.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "To download a single transaction receipt, i-click ang specific transaction and tap “Download Receipt”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "To download multiple transactions, i-click ang download transaction (white receipt with green arrow) icon sa upper right corner ng iyong transaction list screen.",
              },
              {
                type: "body",
                content:
                  "You can filter it by choosing a date range, and/or filter transactions based on status and/or game.",
              },
              {
                type: "body",
                content: "Then, i-click ang “Submit Request”.",
              },
            ],
          ],
        },
      ],
    },
  ],
};

const deposit_withdrawal = {
  title: "Deposit and Withdrawal",
  themeColor: color.very_light_blue, // should be in hex format
  children: [
    {
      title: "Ano ang available payment methods?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "For now, ang available payment partner ni Karera.Live ay ang QRPh.",
        },
        {
          type: "body",
          content:
            "Maaring gamitin ang lahat ng available banks and e-wallets under QRPh.",
        },
        {
          type: "header",
          content: "Ito ang ilan sa mga partner banks and e-wallets ni QRPh:",
        },
        {
          type: "list",
          list: [
            {
              type: "body",
              content:
                "Asia United Bank Corp.",
            },
            {
              type: "body",
              content:
                "BDO Unibank/Network Bank",
            },
            {
              type: "body",
              content:
                "BPI Savings/Family Bank",
            },
            {
              type: "body",
              content:
                "GrabPay",
            },
            {
              type: "body",
              content:
                "G-Xchange Inc (GCash)",
            },
            {
              type: "body",
              content:
                "Maya Bank",
            },
            {
              type: "body",
              content:
                "Metropolitan Bank and Trust Company",
            },
            {
              type: "body",
              content:
                "PayMaya Philippines",
            },
            {
              type: "body",
              content:
                "Philippine National Bank",
            },
            {
              type: "body",
              content:
                "Diskartech",
            },
            {
              type: "body",
              content:
                "Security Bank",
            },
            {
              type: "body",
              content:
                "ShopeePay",
            },
            {
              type: "body",
              content:
                "Union Bank of the Philippines",
            },
          ],
        },
      ],
    },
    {
      title: "How to Deposit?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "To deposit, follow these easy steps:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To deposit to your account, press the encircled yellow “+” icon beside your wallet balance. Or i-click ang “Wallet” on the footer menu.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Select QRPh as the payment method. Then, mamili sa pre-selected deposit amount or i-enter ang desired deposit amount.",
              },
              {
                type: "body",
                content:
                  "Note: For first-time deposits, the minimum deposit amount is P500.",
              },
              {
                type: "body",
                content: "Then, tick the checkbox, and click “Deposit”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Review your Deposit details. Then, i-click ang “Confirm” to proceed.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "You can scan or download the QRPh code to process your deposit.",
              },
              {
                type: "body",
                content:
                  "Note: The QRPh Code is valid for 5 minutes only. Kung nag-expire and QRPh Code, maaaring mag-transact muli to generate a new QRPh Code.",
                highlighted: ["Note:"],
              },
              {
                type: "body",
                content:
                  "To check the supported banks/e-Wallets of QRPh, i-click ang “Bank or e-Wallet”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Mag-login sa iyong bank or e-Wallet account. I-upload or i-scan ang QRPh Code to Pay the deposit amount.",
              },
              {
                type: "body",
                content:
                  "Once na successful ang transaction sa iyong bank or e-Wallet, the deposit amount will be automatically added to your Karera.Live wallet balance.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Ano ang minimum at maximum deposit amount?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "For first-time depositors, ang required minimum deposit amount ay P500.",
        },
        {
          type: "body",
          content:
            "For succeeding deposits, ang minimum deposit amount ay P100.",
        },
        {
          type: "body",
          content:
            "Ang maximum deposit amount ay P50,000 per transaction.",
        },
      ],
    },
    {
      title: "How to Withdraw?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "To withdraw, follow these easy steps:",
        },
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To withdraw from your account, press the encircled yellow “+” icon beside your wallet balance. Or i-click ang “Wallet” on the footer menu. Then, i-click ang “Withdraw”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Select QRPh as the payment method. Then, mamili sa pre-selected withdrawal amount or i-enter ang desired withdrawal amount.",
              },
              {
                type: "body",
                content: "Then, tick the checkbox, and click “Withdraw”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Enter your 4-digit Wallet PIN.",
              },
            ],
            [
              {
                type: "body",
                content: "Review your withdrawal details. Then, i-click ang “Confirm” to proceed.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "You can scan or download the QRPh code to process your withdrawal.",
              },
              {
                type: "body",
                content:
                  "Note: The QRPh Code is valid for 5 minutes only. Kung nag-expire and QRPh Code, maaaring mag-transact muli to  generate a new QRPh Code.",
                highlighted: ["Note:"],
              },
              {
                type: "body",
                content:
                  "To check the supported banks/e-Wallets of QRPh, i-click ang “Bank or e-Wallets”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Mag-login sa iyong bank or e-Wallet account. I-upload or i-scan ang QRPh Code to process your withdrawal.",
              },
              {
                type: "body",
                content:
                  "Once na successful ang transaction sa iyong bank or e-Wallet, the withdrawal amount will be credited to your bank or e-Wallet.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Ano ang minimum withdrawal amount?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content: "Ang minimum withdrawal amount ay P200.",
        },
        {
          type: "body",
          content: "Ang maximum withdrawal amount ay P50,000 per transaction.",
        },
      ],
    },
    {
      title: "May fee ba ang deposit at withdrawal transactions?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Sa Karera.Live, walang transaction or service fee na sisingilin to any of your transactions.",
        },
      ],
    },
    {
      title: "Can I transfer funds to a different player account?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Hindi maaaring mag-transfer ng funds ang isang player sa isa pang account.",
        },
      ],
    },
    {
      title: "How are my winnings credited to my account and is there any fee?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Walang service or crediting fee na ibabawas si Karera.Live sa iyong winnings.",
        },
        {
          type: "body",
          content:
            "The whole winning amount will be automatically added to your Karera.Live wallet.",
        },
        {
          type: "body",
          content: "All winnings are credited in real-time.",
        },
      ],
    },
  ],
};

const kyc = {
  title: "electronic Know Your Customer (eKYC) Process",
  themeColor: color.light_yellow, // should be in hex format
  children: [
    {
      title: "Ano ang eKYC?",
      lastUpdate: "December 18, 2024", 
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang electronic Know Your Customer or eKYC process ay isang automated at mandatory process na ginagamit ng mga financial institutions sa pag-confirm at pag-verify ng identity ng kanilang mga customers.",
        },
      ],
    },
    {
      title: "Bakit mahalaga ang eKYC? ",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Importance of eKYC:",
        },
        {
          type: "list",
          list: [
            {
              type: "body",
              content:
                "Upang maiwasan ang mga  illegal activities tulad ng money laundering at fraud.",
            },
            {
              type: "body",
              content:
                "Upang palakasin ang security ng mga financial transactions.",
            },
            {
              type: "body",
              content:
                "Upang makatulong sa mga financial institutions sa pagsunod sa mga legal at regulatory requirements ng gobyerno at mga ahensiya nito.",
            },
            {
              type: "body",
              content:
                "Upang ma-protektahan ang kanilang mga customer laban sa identity theft at fraud.",
            },
          ],
        },
      ],
    },
    {
      title: "Pwede bang hindi na dumaan sa eKYC process ang isang player?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Hindi. Dahil lahat ng registered players ng Karera.Live ay required na dumaan sa electronic Know Your Customer process upang ma-verify ang kanilang identity.",
        },
        {
          type: "body",
          content:
            "Note: Players who will not complete the electronic Know Your Customer or eKYC process within (3) three days of registration to Karera.Live will be automatically deactivated. At hindi na nila maaaring gamitin ang kanilang account.",
          highlighted: ["Note:"],
        },
        {
          type: "body",
          content:
            "For account re-activation, maaaring mag-email sa support@karera.live or mag-chat sa aming 24/7 Live Agent. I-click lamang ang “More” sa footer menu ng iyong homescreen at piliin ang “Customer Support”, then i-click ang “Live Customer Support”",
          highlighted: ["Note:"],
        },
        {
          type: "body",
          content:
            "Footer Menu > More > Customer Support > Live Chat Support",
        },
      ],
    },
    {
      title: "Paano gawin ang eKYC?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "steps",
          steps: [
            [
              {
                type: "body",
                content:
                  "To verify your account, i-click ang iyong avatar or photo next to your wallet balance.",
              },
              {
                type: "body",
                content:
                  "Then, click “eKYC Setting”",
                  highlighted: ["“eKYC Setting”"],
              },
              {
                type: "body",
                content:
                  "NOTE: Only verified users can withdraw from their wallet.",
                  highlighted: ["NOTE:"],
              },
            ],
            [
              {
                type: "body",
                content:
                  "To start the verification process, tap “Start”.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Choose the type of valid document that you have.",
              },
              {
                type: "body",
                content:
                  "Then, i-click ang “Next”.",
                  highlighted: ["“Next”."],
              },
            ],
            [
              {
                type: "body",
                content:
                  "Click “Allow” to use your phone camera. Take a photo of your valid document.",
                  highlighted: ["“Allow”"],
              },
              {
                type: "body",
                content:
                  "NOTE: Make sure na ang photo ng iyong valid document ay malinaw at hindi putol o blurred.",
                  highlighted: ["NOTE:"],
              },
            ],
            [
              {
                type: "body",
                content:
                  "To proceed, i-click the “Go to Scan” button to scan your face.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "Allow to use your camera and start scanning your face for facial verification.",
              },
            ],
            [
              {
                type: "body",
                content:
                  "I-verify ang information galing sa iyong valid document.",
              },
              {
                type: "body",
                content:
                  "Click “Confirm”.",
                  highlighted: ["“Confirm”."],
              },
              {
                type: "body",
                content:
                  "Hintayin lamang ang approval ng iyong eKYC verification request within 24-72 hours.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Anu-ano ang mga acceptable IDs or documents para sa eKYC?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Here are the acceptable Valid IDs:",
        },
        {
          type: "list",
          list: [
            {
              type: "body",
              content:
                "UMID (Unified Multi-Purpose identity card)",
            },
            {
              type: "body",
              content:
                "TIN (Taxpayer Identification Number) – Old Version",
            },
            {
              type: "body",
              content:
                "TIN – New Version",
            },
            {
              type: "body",
              content:
                "Driving License",
            },
            {
              type: "body",
              content:
                "PhilHealth ID",
            },
            {
              type: "body",
              content:
                "SSS (Social Security System) ID",
            },
            {
              type: "body",
              content:
                "Postal ID",
            },
            {
              type: "body",
              content:
                "PRC ID",
            },
            {
              type: "body",
              content:
                "Voter's ID",
            },
            {
              type: "body",
              content:
                "Identification System ID",
            },
            {
              type: "body",
              content:
                "Passport – Old Version",
            },
            {
              type: "body",
              content:
                "Passport – New Version",
            },
            {
              type: "body",
              content:
                "Printed PhilSysID",
            },
            {
              type: "body",
              content:
                "Employment Permit",
            },
            {
              type: "body",
              content:
                "Alien Registration Card",
            },
          ],
        },
      ],
    },
  ],
};

const zodiac = {
  title: "Zodiac Race",
  themeColor: color.dark_cyan, // should be in hex format
  children: [
    {
      title: "Ano ang Zodiac Race?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang Zodiac Race ay isang exciting live betting game that evolves on twelve (12) Zodiac Balls such as Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, at Pisces",
        },
        {
          type: "body",
          content:
            "At ito lang naman ang very first live betting Zodiac Race game sa Pilipinas!",
        },
      ],
    },
    {
      title: "How to Play and Win at Zodiac Race?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Sundin lamang ang steps na ito:",
        },
        {
          type: "header",
          content: "STEP 1 Choose Your Balls",
        },
        {
          type: "body",
          content:
            "When the 60-second betting period begins, maaari nang mag-Bet to one or more Zodiac Balls.",
        },
        {
          type: "header",
          content: "STEP 2 Place Your Bets",
        },
        {
          type: "body",
          content:
            "To confirm your bet, simply click the “CONFIRM” button. Once the countdown timer expires, hindi na maaaring tumaya.",
        },

        {
          type: "body",
          content:
            "Tandaan, walang maximum bet limit, but the minimum bet amount is P5.",
        },
        {
          type: "header",
          content: "STEP 3 Race Begins",
        },
        {
          type: "body",
          content:
            "Once “CLOSED” na ang betting status, the Game Master will press the button on the race track to start the game.",
        },

        {
          type: "body",
          content:
            "Ang lahat ng Zodiac Balls ay sabay-sabay na gugulong sa race track and will encounter detours on the way to the finish line.",
        },
        {
          type: "header",
          content: "STEP 4 Win or Lose",
        },
        {
          type: "body",
          content:
            "Ang naunang Zodiac Ball na nakarating sa finish line ang siyang panalo.",
        },

        {
          type: "body",
          content:
            "Ipapakita ng Game Master ang nanalong Zodiac Ball sa screen, na magbibigay-daan sa mga manlalaro na makita kung nanalo sila o hindi.",
        },
        {
          type: "body",
          content:
            "Ang winning amount ni player will be depending on the odds and will automatically added sa kanyang Karera.Live wallet.",
        },

        {
          type: "body",
          content:
            "Ang resulta ng payout ay maaaring makita sa transaction history.",
        },
      ],
    },
  ],
};

const dos_letra = {
  title: "Dos Letra Karera",
  themeColor: color.bright_red, // should be in hex format
  children: [
    {
      title: "Ano ang Dos Letra Karera?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang Dos Letra Karera ay isa ring live betting game ng Karera.Live that involves (2) Letra Balls – Letra A and Letra B.",
        },
      ],
    },
    {
      title: "How to Play and Win at Dos Letra Karera?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Follow these easy steps",
        },
        {
          type: "header",
          content: "STEP 1 Choose Your Balls",
        },
        {
          type: "body",
          content:
            "When the 60-second betting period begins, maaari nang mag-Bet to one or more Letra Balls.",
        },
        {
          type: "header",
          content: "STEP 2 Place Your Bets",
        },
        {
          type: "body",
          content:
            "To confirm your bet, simply click the “CONFIRM” button. Once the countdown timer expires, hindi na maaaring tumaya.",
        },

        {
          type: "body",
          content:
            "Tandaan, walang maximum bet limit, but the minimum bet amount is P5.",
        },
        {
          type: "header",
          content: "STEP 3 Race Begins",
        },
        {
          type: "body",
          content:
            "Once “CLOSED” na ang betting status, the Game Master will press the button on the race track to start the game.",
        },

        {
          type: "body",
          content:
            "Ang dalawang Letra Balls ay sabay na gugulong sa race track and will encounter detours on the way to the finish line.",
        },
        {
          type: "header",
          content: "STEP 4 Win or Lose",
        },
        {
          type: "body",
          content:
            "Ang naunang Letra Ball na nakarating sa finish line ang siyang panalo.",
        },

        {
          type: "body",
          content:
            "Ipapakita ng Game Master ang nanalong Letra Ball sa screen, na magbibigay-daan sa mga manlalaro na makita kung nanalo sila o hindi.",
        },
        {
          type: "body",
          content:
            "Ang winning amount ni player will be depending on the odds and will automatically added sa kanyang Karera.Live wallet.",
        },

        {
          type: "body",
          content:
            "Ang resulta ng payout ay maaaring makita sa transaction history.",
        },
      ],
    },
  ],
};

const tres_letra = {
  title: "Tres Letra Karera", // FOR THE UPCOMING TRES LETRA
  themeColor: color.bright_red, // should be in hex format
  children: [
    {
      title: "Ano ang Dos Letra Karera?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Ang Dos Letra Karera ay isa ring live betting game ng Karera.Live that involves (2) Letra Balls – Letra A and Letra B.",
        },
      ],
    },
    {
      title: "How to Play and Win at Dos Letra Karera?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "header",
          content: "Follow these easy steps",
        },
        {
          type: "header",
          content: "STEP 1 Choose Your Balls",
        },
        {
          type: "body",
          content:
            "When the 60-second betting period begins, maaari nang mag-Bet to one or more Letra Balls.",
        },
        {
          type: "header",
          content: "STEP 2 Place Your Bets",
        },
        {
          type: "body",
          content:
            "To confirm your bet, simply click the “CONFIRM” button. Once the countdown timer expires, hindi na maaaring tumaya.",
        },

        {
          type: "body",
          content:
            "Tandaan, walang maximum bet limit, but the minimum bet amount is P5.",
        },
        {
          type: "header",
          content: "STEP 3 Race Begins",
        },
        {
          type: "body",
          content:
            "Once “CLOSED” na ang betting status, the Game Master will press the button on the race track to start the game.",
        },

        {
          type: "body",
          content:
            "Ang dalawang Letra Balls ay sabay na gugulong sa race track and will encounter detours on the way to the finish line.",
        },
        {
          type: "header",
          content: "STEP 4 Win or Lose",
        },
        {
          type: "body",
          content:
            "Ang naunang Letra Ball na nakarating sa finish line ang siyang panalo.",
        },

        {
          type: "body",
          content:
            "Ipapakita ng Game Master ang nanalong Letra Ball sa screen, na magbibigay-daan sa mga manlalaro na makita kung nanalo sila o hindi.",
        },
        {
          type: "body",
          content:
            "Ang winning amount ni player will be depending on the odds and will automatically added sa kanyang Karera.Live wallet.",
        },

        {
          type: "body",
          content:
            "Ang resulta ng payout ay maaaring makita sa transaction history.",
        },
      ],
    },
  ],
};

const promotion = {
  title: "Promotions",
  themeColor: color.pure_orange,
  children: [
    {
      title: "Where can I find the latest Promos?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Para makita ang latest promos, i-click lang ang “Promotions” sa footer menu sa iyong homescreen.",
        },
        {
          type: "body",
          content:
            "At kung ikaw ay qualified, makikita mo ang list of current promos na maari mong i-claim.",
        },
      ],
    },
    {
      title: "Paano i-claim ang specific promo?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Each promo has its own Mechanics, kung saan makikita ang mga requirements or criteria bago ma-claim promo.",
        },
        {
          type: "body",
          content:
            "At kung ikaw ay qualified na to claim a specific promo, maaari nang i-click ang “CLICK TO CLAIM THIS OFFER” button ng promo na nais mong i-claim.",
        },
      ],
    },
  ],
};

const legality_safety = {
  title: "Legality and Safety",
  themeColor: color.light_blue,
  children: [
    {
      title: "Legit and safe ba ang Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 1499,
      content: [
        {
          type: "body",
          content:
            "Siguradong LEGAL and SAFE to play here at Karera.Live dahil ito ay Licensed by the Philippine Amusement and Gaming Corporation (PAGCOR). Ang Karera.Live ay nag-comply sa lahat ng legal requirements for a secure operation.",
        },
        {
          type: "body",
          content:
            "We also make sure na secure din ang iyong payment transactions in coordination with our payment partner - QRPh.",
        },
        {
          type: "body",
          content:
            "With its PAGCOR license, enjoyable specialty live betting games, secure payments, and great customer service, Karera.Live is a reliable and legit choice for online betting in the Philippines.",
        },
      ],
    },
  ],
};

const customer_support = {
  title: "Customer Support",
  themeColor: color.very_light_blue,
  children: [
    {
      title: "Saan maaaring kontakin ang inyong Customer Support?",
      lastUpdate: "December 18, 2024",
      totalLikes: 999,
      content: [
        {
          type: "body",
          content:
            "Our friendly 24/7 customer support team is always ready to help.",
        },
        {
          type: "body",
          content: "Maaaring mag-email sa support@karera.live.",
        },
        {
          type: "body",
          content:
            "Or mag-chat sa aming 24/7 Live Agent. I-click lamang ang “More” sa footer menu ng iyong homescreen at piliin ang “Customer Support”, then i-click ang “Live Customer Support”",
        },
        {
          type: "header",
          content: "Footer Menu > More > Customer Support > Live Chat Support",
        },
      ],
    },
  ],
};

const troubleshooting = {
  title: "Troubleshooting Guide",
  themeColor: color.light_yellow,
  children: [
    {
      title: "How to troubleshoot technical issues when accessing Karera.Live?",
      lastUpdate: "December 18, 2024",
      totalLikes: 0,
      content: [
        {
          type: "body",
          content:
            "Kung may issue sa display ng live streaming video or game, subukan ang “Clear cache” or Clear browsing history” sa iyong ginagamit na browser like Safari, Google Chrome, etc.",
        },
        {
          type: "body",
          content:
            "Maaari rin na ang problema ay sa bagal ng iyong data or internet connection. Try to off your data or internet connection, and then re-connect after 15 seconds.",
        },
        {
          type: "body",
          content:
            "Maaari rin na ang iyong ginagamit na device ay outdated or hindi kayang mag-display ng live streaming video.",
        },
        {
          type: "body",
          content:
            "Tignan ang minimum technical requirements sa pag-access ng Karera.Live.",
        },
        {
          type: "header",
          content: "Recommended Device",
        },
        {
          type: "list",
          listStyle: "latin-roman",
          list: [
            { type: "body", content: "Android Phone (Android 5.0 and up)" },
            { type: "body", content: "Iphone (iOS 10 and up)" },
            { type: "body", content: "Ipad (iOS 10 and up)" },
            { type: "body", content: "Tablet (Android 5.0 and up)" },
          ],
        },
        {
          type: "header",
          content: "Internet Connection",
        },
        {
          type: "list",
          listStyle: "latin-roman",
          list: [
            { type: "body", content: "Mobile Data (4G, LTE, or 5G)" },
            { type: "body", content: "Wi-Fi " },
          ],
        },
        {
          type: "header",
          content:
            "At least (1) active and verified bank or e-wallet account under the registered player’s name.",
        },
      ],
    },
  ],
};

export const ABOUT_US = [
  {
    content:
      "Karera.Live is a live game show presentation of track racing balls with variety of ball games. The live show is conducted according to its game mechanics. It is a competitive event where rolling balls are raced against each other along a track. The goal is to see which ball reaches the finish line first. These races are highly entertaining, with the balls rolling down various types of tracks that may include obstacles, ramps, loops, and tunnels.",
    highlighted: ["Karera.Live"],
  },
  {
    content:
      "Rolling balls like the marble race have become particularly popular as a form of online entertainment, with many YouTube channels and social media creators organizing elaborate ball races, sometimes featuring intricate courses and commentary to make the experience more exciting. Some races even have themed events, teams of balls with different colors or designs, and fan bases who cheer for their favorite teams.",
  },
];

export const PRIVACY_POLICY = [
  { content: "Effective Date: December 10, 2024" },
  {
    content:
      'At KARERA.LIVE, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform, which includes our website, mobile application, and related services (collectively referred to as the "Platform"). By using the Platform, you consent to the data practices described in this Privacy Policy.',
  },
  {
    content:
      "1. Information We Collect\nWe collect information to provide and improve our services. The types of information we collect include:\na) Personal Information\nWhen you register to Karera.Live, interact with our Platform, we may collect the following personal information:\nName\nMobile Number\nEmail address\nDate of birth (to verify age)\nPayment information (e.g., Gcash, Maya, Credit/Debit card details)\nAccount username and password\nIdentification Card\nSelfie picture\nUpdated picture",
  },
  {
    content:
      "b) Usage Data\nWe collect non-personally identifiable data about how you use the Platform, including:\nDevice information (e.g., device type, operating system, unique device identifiers)\nIP address\nBrowser type and version\nPages visited, time spent on the Platform, and other usage metrics\nGame statistics (e.g., achievements, scores, in-game activity)",
  },
  {
    content:
      "c) Cookies and Tracking Technologies\nWe use cookies and other tracking technologies (e.g., web beacons, pixels) to enhance your experience and collect data about your usage of the Platform. Cookies help us:\nRemember your preferences.\nAnalyze trends and usage patterns.\nImprove the functionality and performance of the Platform.\nYou can control the use of cookies through your browser settings, but disabling cookies may affect your ability to use certain features of the Platform.",
  },
  {
    content:
      "2. How We Use Your Information\nWe use the information we collect to:\nProvide, operate, and maintain the Platform.\nProcess transactions and manage your account.\nPersonalize your experience (e.g., suggesting games or features based on preferences).\nCommunicate with you, including sending updates, promotions, and support-related messages.\nImprove the quality and performance of the Platform.\nDetect, prevent, and address technical issues, fraud, or security breaches.\nComply with legal obligations and enforce our Terms of Service.",
  },
  {
    content:
      "3. How We Share Your Information\nWe do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:\nService Providers: We may share your information with trusted third-party companies who help us operate the Platform, such as payment processors, hosting providers, and analytics services. These service providers are obligated to handle your data securely and only for the purposes of providing services on our behalf.\nLegal Compliance: We may disclose your information if required by law or to protect our legal rights, comply with legal processes, or respond to requests from public authorities.\nBusiness Transfers: If we merge with, acquire, or are acquired by another company, your information may be transferred as part of the business transaction. We will notify you if this occurs and how it impacts your data.",
  },
  {
    content: `4. Data Security\nWe take data security seriously and implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.`,
  },
  {
    content: `5. Your Rights and Choices\nYou have the following rights regarding your personal information:\nAccess: You can request access to the personal information we hold about you.\nCorrection: You can update or correct inaccurate or incomplete information.\nDeletion: You can request the deletion of your personal data, subject to certain exceptions (e.g., for legal compliance).\nOpt-Out of Communications: You can opt-out of receiving promotional emails or newsletters from us by clicking the "unsubscribe" link in the emails or by contacting us directly.\nCookies: You can manage cookie preferences in your browser settings.\nIf you wish to exercise any of these rights or have questions about your personal data, please contact us at contact@karera.live`,
  },
  {
    content:
      "6. Data Retention\nWe retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. If you close your account, we will retain certain information as required by law or for legitimate business purposes (e.g., fraud prevention or dispute resolution).",
  },
  {
    content:
      "7. Children’s Privacy\nOur Platform is not intended for children under the age of TWENTY-ONE (21), and we do not knowingly collect personal information from children. If you believe we have inadvertently collected false information, please contact us at contact@karera.live",
  },
  {
    content:
      "8. International Data Transfers\nIf you access the Platform from outside the Philippines, please note that your personal information may be transferred to and processed in a country other than your own. By using the Platform, you consent to the transfer of your data to countries with different data protection laws.",
  },
  {
    content:
      "9. Changes to This Privacy Policy\nWe may update this Privacy Policy from time to time. Any changes will be effective upon posting on the Platform. We will notify you of significant changes, but we encourage you to review this policy periodically for the latest information on our privacy practices.",
  },
  {
    content:
      "10. Contact Us\nIf you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:\nGLOBALX DIGITAL CORPORATION\nUnit 901, i-Land Bay Plaza\nDiosdado Macapagal Avenue, MOA Complex, Pasay City\nEmail: contact@karera.live",
  },
];

export const TERMS_AND_CONDITIONS = [
  {
    content: "I. Member’s Basic Information",
  },
  {
    content:
      'To become a Karera.Live Member, new players may register through online registration. Mandatory information of the player and one (1) valid government-issued Identification (ID) Card must be presented. Only persons twenty-one (21) years of age and above and not among the banned personalities as provided under the Memorandum Circular No. 6, series of 2016, of The Office Of The President, shall strictly be allowed to register and avail of the services of a remote gaming platform.',
  },
  {
    content: "II. Communications Opt In",
  },
  {
    content:
      "To improve your experience with us, Karera.Live may send you communication materials, including but not limited to administrative and law-mandated announcements, projects, campaigns, or promotional materials.",
    list: [
      "º E-mail",
      "º SMS",
      "º Phone Calls",
      "º Social Media (Facebook, Instagram, Twitter, and the like)",
    ],
  },
  {
    content: "III. Collection and Privacy Statement",
  },
  {
    content: "Karera.Live collects your personal information as a requirement of the Philippine Amusement and Gaming Corporation (PAGCOR) and for the purpose of providing you with our services. Other than PAGCOR, our company needs to share your information with vital suppliers, third-party service providers, related companies, and subsidiaries to provide you with our services, administration of your account, accounting, market study promotions, play tracking, profiling and loyalty points, promotional games, release of prizes and such other allied services.",
  },
  {
    content:
      "In processing your personal information our company adheres to a strict privacy policy in accordance with Republic Act No. 10173 or the Data Privacy Act of 2012.",
    list: [
      "1. In addition to the above-mentioned purposes, our company collects personal information, which will be used to facilitate the transaction, track and administer your account, and improve efficiency in providing you with our products and services.",
      "2. Our company shall keep the Member’s information strictly confidential. The information you give us will not be sold, shared to subsidiaries, third party service providers, suppliers, related companies or made available to the public, except in line with the disclosed purposes, in the course of our ordinary business, or when authorized by and in accordance with Philippine law or any valid order of the court or government agencies.",
      "3. Our Company applies strict security measures and uses automated systems to make sure that the Data Privacy standards for confidentiality, integrity and availability of your personal data are met. Our employees are trained to handle your personal data and we have internal controls in place to avoid and handle personal data breach.",
      "4. Our Company is governed by the laws of the Republic of the Philippines. For all intents and purposes, the storage location of all personal data collected is in the Philippines.",
      "5. Your information shall be kept in our system for as long as your account is active and for a period of at least one (1) year from your last visit.",
      "6. For any complaints, which includes but is not limited to the handling, correction, or request for deletion of your personal information, you may email at cs@Karera.live",
    ],
  },
  {
    content:
      "IV. Terms and Conditions for Membership",
  },
  {
    content:
      "Karera.Live is open to qualified individuals twenty-one (21) years old and above. Pursuant to Presidential Decree 1869, as amended by Republic Act 9487, persons under 21 years of age or students of any school, college, or university in the Philippines are not allowed to play in this gaming establishment. Pursuant to Malacañang Memorandum Circular No. 8, the following are not allowed to enter, stay, and/or play in the gaming establishment/platform.",
    list: [
      "1. Government officials and employees connected directly with the operation of the government or any of its agencies; and",
      "2. Members of the Philippine National Police (PNP) and Armed Forces of the Philippines (AFP).",
      "3. Persons under 21 years of age or students of any school, college, or university in the Philippines.",
      "4. PAGCOR officials and employees;",
      "5. Unregistered players;",
      "6. Banned individuals;",
      "7. Spouse, common-law partner, children, parents of officials and persons mentioned in items (1), (2), and (4) above.",
      "8. Persons included to the National Database of Restricted Persons;",
      "9. Gaming Employment License (GEL) holders; and",
      "10. Financiers/Loan Sharks and the like.",
      "Karera.Live has the right to deny application or terminate the membership of any individual who violates the terms and conditions of the membership or provides false or inaccurate information during the membership registration.",
    ],
  },
  {
    content:
      "Member’s Affirmation and Consent",
    list: [
      "I am 21 years of age or older, I have read and understood Terms and Conditions of membership and agree to abide by them, as amended from time to time and declare that the details in this application are true and correct.",
      "I acknowledge and agree to be bound by, and undertake to comply with, the house rules, regulations, and policies issued by the Philippine Amusement and Gaming Corporation concerning the operations and management of this establishment.",
      "I also read and understood the company’s Collection and Privacy Statement, and I freely give my informed consent to the collection and the uses of my personal information. I understand that withdrawal of this consent will result in the deactivation of my membership.",
      "I am required to complete the Know Your Customer requirements prior to my first withdrawal or within seven days, whichever comes first.",
      "I am aware that funding, withdrawal, and/or transfers from and to a payment/banking solution other than my registered account may cause suspension, termination of my account, subject to further verification of Karera.Live.",
      "I may make transactions to a 3rd party, such as GCash, Paymaya etc. through Karera.Live Remote Gaming Platform. By using the services, I agree that Karera.Live may use all information, including personal and billing information, provided by me to Karera.Live in the course of using the Services (“Payment Instructions”). I acknowledge and agree that it is my sole responsibility to ensure that all my funding and withdrawal transactions are correct, complete, and accurate in all respect and I understand that time is required to process my account instructions. The account instructions provided by me will be treated as final and executory. Further, by providing Karera.Live with my account instructions, I agree to deposit/withdraw or allow Karera.Live to deduct from my account all fees and charges associated with my fund instructions.",
      "Standard Processing Periods for Deposit and Withdrawal Transactions:",
      "On delayed deposits and withdrawals due to third-party payment provider’s scheduled preventive maintenance – Account will be monitored within 24 hours.",
      "If the amount has not been reflected in the player’s account, player is requested to report back to Karera.Live to ensure that funds will be credited back into the player’s account.",
      "The standard processing period for deposit and withdrawal transactions through third-party payment provider’s amounting to Php1 to Php50,000 is One (1) to Three (3) business days.",
      "The standard processing period for deposit and withdrawal transaction through third-party payment provider’s amounting to Php50,000 to Php500,000 is Three (3) to Five (5) business days.",
      "While the standard processing period for deposit and withdrawal transaction through third-party payment provider’s amounting to Php500,000 and above is Five (5) to Ten (10) business days.",
      "Karera.Live is not responsible for any delays caused by circumstances beyond its control, such as, those arising from transactions with third party payment providers and vendors.", 
    ],
  },
  {
    content:
      "Karera.Live has No Liability",
  },
  {
    content:
      "I acknowledge and agree that no liability shall be attached to Karera.Live if the latter is unable to complete any funding instructions initiated by me for any reason beyond Karera Live’ control, including, but not limited to, the following:",
    list: [
      "I. If, through no fault of Karera.Live, my Account does not contain sufficient funds or if the deposit or withdrawal would exceed the transactional limit set for my Account;",
      "II. Karera.Live payment processing centre is not working properly or is under system maintenance and I am aware or have been advised by Karera.Live about the malfunction or system downtime or maintenance before I execute the fund transfer instructions",
      "III. I have not provided Karera.Live with the correct account information, or information that I provided becomes incorrect; and/or",
      "IV. Circumstances beyond Karera.Live’ control (such as, but not limited to, fire, flood, system breakdown, technical bugs or malfunction, and/or types of players; or interference from an outside force), even if foreseeable or foreseen, that may prevent the proper execution of the transfer instructions and Karera.Live have taken reasonable precautions to avoid those circumstances.",
    ],
  },
  
  {
    content:
      "Account Suspension may be implemented by Karera.Live due to the following reasons:",
    list: [
      "a. National Database for Restricted Persons – persons banned from gaming",
      "b. Multiple accounts – only one (1) remote gaming platform account shall be allowed per player per remote gaming platform.",
      "c. Promo and Chips Abuser – engaged in activities that are in breach of our promotional guidelines.",
      "d. Underage and Banned Personalities – only persons twenty-one (21) years of age and above and not among banned personalities",
      "e. Other transactions that may be deemed suspicious and subject to further investigation upon the sole and exclusive discretion of Karera.Live.",
      "f. Use of bot software is not permitted and, if the player is found to have used such software, it will be considered cheating, and the player may be sanctioned accordingly.",
    ],
  },
  {
    content:
      "Anti-Money Laundering (AML) Compliance Provision",
  },
  {
    content:
      "1. Compliance with AML Laws:",
      list: [
        "a. The User acknowledges and agrees that Karera.Live, the operator of this remote gaming platform (hereinafter referred to as \"the Platform\"), is committed to full compliance with all applicable AML laws and regulations, including but not limited to the Anti-Money Laundering Act (the \"AML Act\").",
      ]
  },
  {
    content:
      "2. Customer Verification and Reporting:",
      list: [
        "a. By using the Platform, the User consents to and understands that Karera.Live may perform customer verification checks and maintain records of User transactions in accordance with AML requirements. b. The User agrees to report any suspicious or potentially AML-related activities or transactions to Karera.Live as soon as such activities are identified.",
      ]
  },
  {
    content:
      "3. Record-Keeping:",
      list: [
        "a. Karera.Live shall maintain accurate records of User transactions, personal information, and AML compliance efforts as required by law. Such records may be retained for a specified period in accordance with AML regulations.",
      ]
  },
  {
    content:
      "4. Termination of Accounts:",
      list: [
        "a. The User acknowledges that Karera.Live reserves the right to suspend, terminate, or restrict access to the Platform for any User found to be involved in, or reasonably suspected of being involved in, money laundering or other illicit financial activities. Karera.Live may, but shall not have the obligation to, inform you prior to suspending, terminating or restricting the access pursuant to this clause. You acknowledge the authority of Karera.Live to suspend, terminate or restrict the Access and accordingly, you shall hold Karera.Live free and harmless against any and all consequences of such suspension, termination or restriction, or any loss or damage which you may suffer as a result thereof.",
      ]
  },
  {
    content:
      "5. Cooperation with Investigations:",
      list: [
        "a. The User agrees to cooperate with Karera.Live, law enforcement agencies, and relevant authorities in the event of an AML investigation or inquiry related to their activities on the Platform.",
      ]
  },
  {
    content:
      "6. Penalties for Non-Compliance:",
      list: [
        "a. The User acknowledges that non-compliance with AML laws and regulations may result in legal penalties and could lead to the suspension, termination, or restriction of their account on the Platform.",
      ]
  },
  {
    content:
      "7. Amendments to AML Requirements:",
      list: [
        "a. The User agrees that Karera.Live may, at its discretion, amend its AML requirements to align with changes in AML laws and regulations. Users are expected to adhere to these changes promptly.",
      ]
  },
  {
    content:
      "These Terms of Use are subject to changes, revisions, updates, and amendments from time to time without the need of prior notice or consent of the user.",
  },
];

export const FAQ_LIST = [
  account_membership,
  mobile_nummber,
  sign_pass,
  wallet_pin,
  transaction_history,
  deposit_withdrawal,
  kyc,
  zodiac,
  dos_letra,
  promotion,
  legality_safety,
  customer_support,
  troubleshooting,
];

/*

{
title: "Parent Title",
themeColor: "this is for the borderleft and background"
children: [ // sub array
{
  title: "Paano mag-reset ng Sign In Password?",
  lastUpdate: "November 15, 2024",
  themeColor: "#E83F3F", // should be in hex format
  totalLikes: 0,
  content: [ // sub array content
    {
      type: "header: bold string, body: normal string,
      content: "content string, <p> text align is justify" // used for body and header
      highlighted: word[]
    },
    {
      type: "list"
      list: commonChild[][] | commonChild[],
    },
    {
      type: "steps"
      steps: commonChild[][],
    }
  ]
}
]}

children = { // for sub array
  title: "Paano mag-reset ng Sign In Password?",
  lastUpdate: "November 15, 2024",
  themeColor: "#E83F3F", // should be in hex format
  totalLikes: 0,
  content: []
}


commonChild = {
  type: "header: bold string, body: normal string",
  content: "content string, <p> text align is justify", // used for body and header
  highlighted: word[] // including the period, comma ,... etc which attached to the word
}
*/
