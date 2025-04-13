import { ROLES } from ".";

export const PRIVATE_ONLY_ROUTES = [
    {
      path: "/admin",
      children: [
        {
          path: "/dashboard",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.AUDITOR.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/commission",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/network",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/user-management/:type?/:id?",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.VERIFIER.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AUDITOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name,
          ],
        },
        {
          path: "/profile",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/kyc",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/mobile",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/passcode",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/password",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/logs",
          role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name],
        },
        {
          path: "/notification",
          role: [
            ROLES.SUPERADMIN.name,
            ROLES.ADMINISTRATOR.name,
            ROLES.VERIFIER.name,
            ROLES.SUPERAGENT.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
            ROLES.OPERATOR.name,
            ROLES.SUPERVISOR.name,
            ROLES.ACCOUNTING.name,
            ROLES.TREASURY.name
          ],
        },
        {
          path: "/referrals",
          role: [ROLES.SUPERAGENT.name, ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/transactions",
          role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name, ROLES.AUDITOR.name, ROLES.TREASURY.name, ROLES.ACCOUNTING.name],
        },
        {
          path: "/grossgaming-revenue",
          role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name, ROLES.AUDITOR.name, ROLES.TREASURY.name, ROLES.ACCOUNTING.name],
        },
        {
          path: "/game-offering",
          role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name, ROLES.AUDITOR.name],
        },
        {
          path: "/csr-monitoring",
          role: [ROLES.SUPERADMIN.name, ROLES.SUPERVISOR.name, ROLES.ADMINISTRATOR.name],
        },
        {
          path: "/wallet",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/agent/transactions",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/agent/network",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/agent/network/players",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
          path: "/agent/network/representatives",
          role: [ROLES.MASTERAGENT.name, ROLES.AGENT.name],
        },
        {
            path: "/logout",
            role: [
                ROLES.SUPERADMIN.name,
                ROLES.ADMINISTRATOR.name,
                ROLES.VERIFIER.name,
                ROLES.SUPERAGENT.name,
                ROLES.MASTERAGENT.name,
                ROLES.AGENT.name,
                ROLES.OPERATOR.name,
                ROLES.SUPERVISOR.name,
                ROLES.ACCOUNTING.name,
                ROLES.AUDITOR.name,
            ], 
          },
      ],
    },
];

export const GAME_ONLY_ROUTES = [
    {
      path: "/game",
      children: [
        {
          path: "/transactions",
          role: [
            ROLES.PLAYER.name
          ], 
        },
        {
          path: "/kyc",
          role: [
            ROLES.PLAYER.name
          ],
        },
        {
          path: "/kyc/initialize",
          role: [
            ROLES.PLAYER.name
          ],
        },
        {
          path: "/kyc/results",
          role: [
            ROLES.PLAYER.name
          ],
        },
        {
          path: "/zodiac",
          role: [
            ROLES.PLAYER.name,
            ROLES.MODERATOR.name,
            ROLES.CSR.name
          ],
        },
        {
          path: "/dos-letra",
          role: [
            ROLES.PLAYER.name,
            ROLES.MODERATOR.name,
            ROLES.CSR.name
          ], 
        },
        {
          path: "/wallet",
          role: [
            ROLES.PLAYER.name,
          ],
        },
        {
          path: "/promos",
          role: [ROLES.PLAYER.name],
        },
        {
          path: "/notification",
          role: [
            ROLES.PLAYER.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
          ],  
        },
        {
          path: "/profile/:mobile?",
          role: [
            ROLES.PLAYER.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
          ],
        },
        {
          path: "/passcode",
          role: [
            ROLES.PLAYER.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
          ],
        },
        {
          path: "/password",
          role: [
            ROLES.PLAYER.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
          ],
        },
        {
          path: "/mobile",
          role: [
            ROLES.PLAYER.name,
            ROLES.MASTERAGENT.name,
            ROLES.AGENT.name,
          ],
        },
        {
          path: "/chat-support",
          role: [
            ROLES.PLAYER.name,
            ROLES.CSR.name,
          ], 
        },
        {
          path: "/live-chat-support",
          role: [  
            ROLES.PLAYER.name,
            ROLES.CSR.name,
          ], 
        },
        {
          path: "/live-chat-support-lobby",
          role: [
            ROLES.PLAYER.name,
            ROLES.CSR.name,
          ],  
        },
        {
          path: "/live-chat-support-lobby-player",
          role: [
            ROLES.PLAYER.name,
            ROLES.CSR.name,
          ], 
        },
        {
          path: "/terms-and-conditions",
          role: [
            ROLES.PLAYER.name,
          ], 
        },
        {
          path: "/privacy-policy",
          role: [
            ROLES.PLAYER.name,
          ], 
        },
        {
          path: "/about-us",
          role: [
            ROLES.PLAYER.name,
          ], 
        },
        {
          path: "/faqs",
          role: [
            ROLES.PLAYER.name,
          ], 
        },
        {
          path: "/moderator",
          role: [
            ROLES.MODERATOR.name
          ],
        },
        {
          path: "/logout",
          role: [
            ROLES.PLAYER.name,
            ROLES.MODERATOR.name
          ], 
        },
      ],
    },
];

export const OPERATOR_ONLY_ROUTES = [
    {
      path: "/operator",
      children: [
        // {
        //   path: "/cashier",
        //   role: [
        //     ROLES.CASHIER.name,
        //   ],  
        // },
        // {
        //   path: "/cashier/lobby",
        //   role: [ROLES.CASHIER.name],
        // },
        {
          path: "/cashier/transactions",
          role: [ROLES.CASHIER.name],
        },
        {
          path: "/moderator-homepage",
          role: [ROLES.MODERATOR.name],
        },
        {
          path: "/csr-page",
          role: [ROLES.CSR.name],
        },
        {
          path: "/representative",
          role: [ROLES.PLAYER.name],
        },
        {
          path: "/representative/game-selection",
          role: [ROLES.PLAYER.name],  
        },
        {
          path: "/representative/main-betting",
          role: [ROLES.PLAYER.name],  
        },
        {
          path: "/representative/transactions",
          role: [ROLES.PLAYER.name],
        },
        {
          path: "/moderator",
          role: [
            ROLES.MODERATOR.name
          ],
        },
        {
          path: "/mod-dos-letra",
          role: [
            ROLES.MODERATOR.name
          ],
        },
        {
          path: "/studio-dos",
          role: [
            ROLES.HOST_MONITORING.name
          ],
        },
        {
          path: "/logout",
          role: [
            ROLES.AGENT.name,
            ROLES.MODERATOR.name
          ], 
        },
      ],
    },
];
