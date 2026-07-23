import { z } from 'zod';

const ConfigSchema = z.object({
  nodeEnv: z.string(),
  port: z.number().int().positive(),
  publicUrl: z.string().url(),
  oauthIssuer: z.string().url(),
  oauthAudience: z.string().url(),
  oauthJwksUrl: z.string().url(),
  serviceApiBaseUrl: z.string().url(),
  serviceInternalApiKey: z.string().min(16),
  allowedOrigins: z.array(z.string().url()),
});

export type AppConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const publicUrl = env.MCP_PUBLIC_URL || 'http://localhost:3000';
  return ConfigSchema.parse({
    nodeEnv: env.NODE_ENV || 'development',
    port: Number(env.PORT || 3000),
    publicUrl,
    oauthIssuer: env.OAUTH_ISSUER || 'https://auth.invalid.example',
    oauthAudience: env.OAUTH_AUDIENCE || publicUrl,
    oauthJwksUrl: env.OAUTH_JWKS_URL || 'https://auth.invalid.example/.well-known/jwks.json',
    serviceApiBaseUrl:
      env.SGH_SERVICE_API_BASE_URL || 'http://localhost:3001/api/service/mcp',
    serviceInternalApiKey:
      env.SGH_SERVICE_INTERNAL_API_KEY || 'development-only-secret',
    allowedOrigins: (env.MCP_ALLOWED_ORIGINS || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  });
}
