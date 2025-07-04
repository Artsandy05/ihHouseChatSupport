
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import GameList from '../models/GameList';
import createEncryptor from '../utils/createEncryptor';

const IN_HOUSE_GAME = {
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
  
  fastify.get('/get-games', {
    preHandler: [authenticate]
  }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
      const games = await GameList.findAll({
        where: { isActive: true },
        attributes: ['id', 'name', 'label', 'gameRoute', 'banner', 'jackpot_level', 'url']
      });
  
      if (!games || games.length === 0) {
        return reply.code(404).send({
          success: false,
          error: 'No active games found'
        });
      }
  
      const modifiedGames = games.map(game => {
        const gameUrl = new URL(game.url);
        return {
          game_id: game.id,
          name: game.name,
          url: gameUrl.toString(),
          jackpot_level: game.jackpot_level
        };
      });
  
      return reply.code(200).send({
        success: true,
        games: modifiedGames
      });
  
    } catch (error: any) {
      console.error('Error in /get-games:', error);
      return reply.code(500).send({
        success: false,
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  fastify.post('/init-game', {
    preHandler: [authenticate]
  }, async (request: FastifyRequest<{ Body: InitGameRequestBody }>, reply: FastifyReply) => {
    try {
      reply.header('Referrer-Policy', 'no-referrer-when-downgrade');
      reply.header('Access-Control-Allow-Origin', '*');
      reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      reply.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
      const { game_id, user_details } = request.body;
      
      // Validate required game_id
      if (!game_id) {
        return reply.code(400).send({
          success: false,
          error: 'game_id is required'
        });
      }

      if (!user_details) {
        return reply.code(400).send({
          success: false,
          error: 'user_details is required'
        });
      }
  
      // Get the specific game by ID
      const game = await GameList.findOne({
        where: { id: game_id },
        attributes: ['id', 'name', 'label', 'gameRoute', 'banner', 'jackpot_level', 'url']
      });
  
      if (!game) {
        return reply.code(404).send({
          success: false,
          error: 'Game not found with the specified ID'
        });
      }
      const encrypted = encryptor.encryptParams(user_details);
      
      
      // Create modified game URL
      const gameUrl = new URL(game.url);
      
      // Add entire user_details object as a JSON string in URL search params
      if (user_details) {
        gameUrl.searchParams.append('data', encrypted);
      }
  
      return reply.code(200).send({
        success: true,
        game_url: gameUrl.toString(),
        game_id: game.id,
        game_name: game.name
      });
  
    } catch (error: any) {
      console.error('Error in /init-game:', error);
      return reply.code(500).send({
        success: false,
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });
}