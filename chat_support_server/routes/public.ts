import User from "../models/User";
import Session from "../models/Session";
import userRoutes from "./user";
import logsRoutes from "./logs";
import gameRoutes from "./game";
import notificationRoutes from "./notifications";
import addressRoutes from "./address";
import referralsRoutes from "./referrals";
import transactionsRoutes from "./transactions";
import gamesAuthRoutes from "./gamesAuth";
import commissionRoutes from "./commission";
import promosRoutes from "./promos";
import gamesRoutes from "./games";
import statisticRoutes from "./statisticRoutes";
import liveChat from "../src/live_chat/liveChat";
import chatSupportRoutes from "./chatSupport";

async function publicRoutes(fastify: any) {
    gamesRoutes(fastify);
    promosRoutes(fastify);
    statisticRoutes(fastify);
    liveChat(fastify);
    chatSupportRoutes(fastify);
}

export default publicRoutes;
