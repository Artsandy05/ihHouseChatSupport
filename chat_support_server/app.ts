import fastifyCors from "@fastify/cors";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import { options } from "./config/swagger-config";
import { Main } from "./src/main";
import auditRoutes from "./routes/auditRoutes";
import publicRoutes from "./routes/public";
import { startCronJob } from './utils/cronjobs';
import inHouseGames from "./routes/inHouseGames";
import { JWT } from "@fastify/jwt";
import inHouseChatSupport from "./routes/inHouseChatSupport";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
  interface FastifyRequest {
    jwt: JWT;
    authenticate: any;
  }
}

const fastifySession = require("@fastify/session");
const fastifyCookie = require("@fastify/cookie");
const path = require("node:path");
const fastifyJwt = require("@fastify/jwt");
const fastifyAuth = require("@fastify/auth");

const fastify = require("fastify")({
  logger: true,
  trustProxy: true
});

// Basic registrations
fastify.register(fastifyCookie);
fastify.register(fastifySession, { secret: process.env.SECRET_SESSION_KEY });
fastify.register(fastifyJwt, { secret: process.env.SECRET_KEY });
fastify.register(fastifyAuth);
fastify.register(require("@fastify/swagger"), {});
fastify.register(require("@fastify/swagger-ui"), options);
fastify.register(require("@fastify/multipart"));

// Simplified CORS - allow all origins and methods
fastify.register(fastifyCors, {
  origin: true,  // Reflects the request origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
});

// Start cron jobs
startCronJob();

// Static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public/uploads/images"),
  prefix: `${process.env.PREFIX}/admin/images`, 
});

// Routes
fastify.register(authRoutes, { prefix: `${process.env.PREFIX}/auth` });
fastify.register(publicRoutes, { prefix: `${process.env.PREFIX}/` });
fastify.register(protectedRoutes, { prefix: `${process.env.PREFIX}/admin` });
fastify.register(auditRoutes, { prefix: `${process.env.PREFIX}/audit` });
fastify.register(inHouseGames, { prefix: `${process.env.PREFIX}/in-house-games` });
fastify.register(inHouseChatSupport, { prefix: `${process.env.PREFIX}/in-house-chat-support` });

// Test endpoint
fastify.get(`${process.env.PREFIX}/test`, (req, res) => {
  res.send("test");
});

// Token test endpoint
fastify.post('/test-token', async (req, reply) => {
  const token = fastify.jwt.sign({ client: 'kingfisher' });
  return { token };
});

// Restart endpoint (for development)
fastify.get(`${process.env.PREFIX}/restart`, (req, res) => {
  res.send("Restart Game Successful");
  Main.getInstance().restart();
  console.log("Restart Game");
});

export default fastify;