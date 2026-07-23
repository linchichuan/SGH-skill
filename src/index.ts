import { loadConfig } from './config.js';
import { createApp } from './server.js';

const config = loadConfig();
const app = createApp({ config });

app.listen(config.port, () => {
  console.info(`SGH MCP listening on port ${config.port}`);
});
