const configuredBaseUrl = process.env.MCP_BASE_URL;

if (!configuredBaseUrl) {
  console.error('MCP_BASE_URL is required. Example: https://mcp.shingihou.com');
  process.exit(2);
}

const configuredUrl = new URL(configuredBaseUrl);
const origin = configuredUrl.origin;
const mcpUrl = configuredUrl.pathname.replace(/\/$/, '').endsWith('/mcp')
  ? configuredUrl.toString().replace(/\/$/, '')
  : `${origin}/mcp`;
const accessToken = process.env.MCP_OAUTH_TOKEN;
const smokeRequestId = process.env.MCP_SMOKE_REQUEST_ID;

const timeoutMs = 15_000;

async function fetchJson(label, url, init = {}) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`${label}: expected JSON, received HTTP ${response.status}`);
  }
  return { response, body };
}

async function requireHttp200(label, url, init) {
  const result = await fetchJson(label, url, init);
  if (result.response.status !== 200) {
    throw new Error(`${label}: expected HTTP 200, received ${result.response.status}`);
  }
  console.info(`${label}: PASS`);
  return result.body;
}

async function mcpRequest(id, method, params, token) {
  const headers = {
    Accept: 'application/json, text/event-stream',
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  return requireHttp200(`MCP ${method}`, mcpUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
  });
}

function authChallenges(body) {
  const value = body?.result?._meta?.['mcp/www_authenticate'];
  return Array.isArray(value) ? value : [];
}

async function main() {
  const health = await requireHttp200('Health', `${origin}/health`);
  if (health?.status !== 'ok') throw new Error('Health: response did not report status=ok');

  const metadata = await requireHttp200(
    'OAuth protected-resource metadata',
    `${origin}/.well-known/oauth-protected-resource`
  );
  if (!metadata?.resource || !Array.isArray(metadata?.authorization_servers)) {
    throw new Error('OAuth protected-resource metadata: required fields are missing');
  }

  const initialized = await mcpRequest(1, 'initialize', {
    protocolVersion: '2025-11-25',
    capabilities: {},
    clientInfo: { name: 'sgh-readonly-oauth-smoke', version: '1.0.0' },
  });
  if (initialized?.result?.serverInfo?.name !== 'sgh-japan-assistant') {
    throw new Error('MCP initialize: unexpected server identity');
  }

  const listed = await mcpRequest(2, 'tools/list', {});
  if (!Array.isArray(listed?.result?.tools) || listed.result.tools.length !== 9) {
    throw new Error('MCP tools/list: expected exactly nine tools');
  }

  const anonymousRead = await mcpRequest(3, 'tools/call', {
    name: 'get_assistance_status',
    arguments: { request_id: 'readonly_oauth_challenge_smoke' },
  });
  if (!anonymousRead?.result?.isError || authChallenges(anonymousRead).length === 0) {
    throw new Error('Anonymous OAuth challenge: protected read did not fail closed');
  }
  console.info('Anonymous OAuth challenge: PASS');

  if (accessToken && smokeRequestId) {
    const authenticatedRead = await mcpRequest(
      4,
      'tools/call',
      {
        name: 'get_assistance_status',
        arguments: { request_id: smokeRequestId },
      },
      accessToken
    );
    if (authChallenges(authenticatedRead).length > 0) {
      throw new Error('Authenticated OAuth read: token was rejected');
    }
    console.info('Authenticated OAuth read: PASS (response body intentionally not printed)');
  } else {
    console.info(
      'Authenticated OAuth read: SKIPPED (set both MCP_OAUTH_TOKEN and MCP_SMOKE_REQUEST_ID)'
    );
  }

  console.info('Write tools invoked: 0');
}

main().catch((error) => {
  console.error(`Smoke test failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
