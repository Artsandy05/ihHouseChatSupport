// src/routes/kingfisher.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import createEncryptor from '../utils/createEncryptor';

const IN_HOUSE_GAME = {
  baseUrl: 'https://kingfisher.com/api',
  endpoints: {
    walletBalance: '/get-wallet-balance',
    userDetails: '/get-user-details',
    updateWallet: '/update-wallet-balance',
    createRound: '/create-round-result',
    createSales: '/create-sales',
    updateSales: '/update-sales'
  },
  apiKey: process.env.IN_HOUSE_GAME_KEY || 'default-key-in-dev' // Set this in your .env
};

const encryptor = createEncryptor(process.env.ENCRYPTION_SECRET);

interface AuthenticatedRequest extends FastifyRequest {
  headers: {
    'x-api-key'?: string;
  };
  query: {
    apiKey?: string;
  };
}

interface InitGameRequestBody {
  game_id: string;
  user_details?: {
    id: number;
    name: string;
    credits: number;
  };
}

export default async function (fastify: FastifyInstance) {
  fastify.addHook('onRequest', (request, reply, done) => {
    reply.header('Referrer-Policy', 'no-referrer-when-downgrade');
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    done();
  });
  const authenticate = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
      const apiKey = request.headers['x-api-key'] || request.query.apiKey;

      if (!apiKey) {
        return reply.code(400).send({ 
          success: false,
          error: 'API Key is required' 
        });
      }

      if (apiKey !== IN_HOUSE_GAME.apiKey) {
        return reply.code(401).send({ 
          success: false,
          error: 'Unauthorized: Invalid API Key' 
        });
      }
    } catch (err) {
      return reply.code(500).send({ 
        success: false,
        error: 'Internal Server Error during authentication' 
      });
    }
  };

  fastify.post('/init-chat-support', {
    preHandler: [authenticate]
  }, async (request: FastifyRequest<{ Body: InitGameRequestBody }>, reply: FastifyReply) => {
    try {
      reply.header('Referrer-Policy', 'no-referrer-when-downgrade');
      reply.header('Access-Control-Allow-Origin', '*');
      reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      reply.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
      const {user_details } = request.body;
      

      if (!user_details) {
        return reply.code(400).send({
          success: false,
          error: 'user_details is required'
        });
      }
  
      const encrypted = encryptor.encryptParams(user_details);
      
      
      // Create modified game URL
      const chatSupportURL = new URL(process.env.CHATSUPPORT_BASE_URL);
      
      // Add entire user_details object as a JSON string in URL search params
      if (user_details) {
        chatSupportURL.searchParams.append('data', encrypted);
      }
  
      return reply.code(200).send({
        success: true,
        url: chatSupportURL.toString(),
      });
  
    } catch (error: any) {
      console.error('Error in /init-chat-support:', error);
      return reply.code(500).send({
        success: false,
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });
}