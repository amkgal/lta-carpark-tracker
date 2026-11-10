import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import healthHandler from './api/health.ts';
import carparkAvailabilityHandler from './api/carparkavailability.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Mount API Endpoints in /api
  app.all('/api/health', healthHandler);
  app.all('/api/carparkavailability', carparkAvailabilityHandler);

  // Vite middleware in dev or static files in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[ParkSG Server] Running on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
    console.log(`[ParkSG Server] Endpoints:`);
    console.log(`  - GET /api/health`);
    console.log(`  - GET /api/carparkavailability`);
  });
}

startServer().catch((err) => {
  console.error('[ParkSG Server] Failed to start:', err);
  process.exit(1);
});
