import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { AppConfig } from './config.js';
import { createTokenVerifier, optionalAuth, type TokenVerifier } from './auth.js';
import type { SghGateway } from './gateway.js';
import { HttpSghGateway } from './gateway.js';
import { createSghMcpServer } from './tools.js';

export function createApp(input: {
  config: AppConfig;
  gateway?: SghGateway;
  tokenVerifier?: TokenVerifier;
}) {
  const app = express();
  const gateway = input.gateway || new HttpSghGateway(input.config);
  const tokenVerifier = input.tokenVerifier || createTokenVerifier(input.config);

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(express.json({ limit: '256kb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'sgh-japan-assistant-mcp' });
  });

  app.get('/.well-known/oauth-protected-resource', (_req, res) => {
    res.json({
      resource: input.config.publicUrl,
      authorization_servers: [input.config.oauthIssuer],
      scopes_supported: ['profile', 'requests:read', 'requests:write', 'passes:redeem'],
      resource_documentation:
        'https://github.com/linchichuan/SGH-skill/blob/main/skills/sgh-japan-assistant/references/authentication.md',
    });
  });

  app.use('/mcp', rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }));

  app.use('/mcp', (req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('origin');
    if (
      origin &&
      input.config.allowedOrigins.length > 0 &&
      !input.config.allowedOrigins.includes(origin)
    ) {
      res.status(403).json({ error: 'Origin is not allowed.' });
      return;
    }
    next();
  });

  app.post('/mcp', async (req, res) => {
    const server = createSghMcpServer({
      config: input.config,
      gateway,
      auth: await optionalAuth(req, tokenVerifier).catch(() => null),
    });
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on('close', () => {
      void transport.close();
      void server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch {
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: { code: -32603, message: 'Internal server error' },
          id: null,
        });
      }
    }
  });

  app.get('/mcp', (_req, res) => {
    res.status(405).set('Allow', 'POST').json({ error: 'Use POST for stateless MCP.' });
  });

  app.delete('/mcp', (_req, res) => {
    res.status(405).set('Allow', 'POST').json({ error: 'Stateless MCP has no session to delete.' });
  });

  return app;
}
