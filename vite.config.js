import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-and-copy-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const cleanUrl = req.url.split('?')[0];
          if (cleanUrl.startsWith('/images/') || cleanUrl.startsWith('/videos/')) {
            const publicPath = path.resolve(__dirname, 'public' + cleanUrl);
            const assetPath = path.resolve(__dirname, 'assets' + cleanUrl);
            const targetPath = fs.existsSync(publicPath) ? publicPath : (fs.existsSync(assetPath) ? assetPath : null);

            if (targetPath) {
              const stat = fs.statSync(targetPath);
              const ext = path.extname(targetPath).toLowerCase();
              const mimeMap = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.mp4': 'video/mp4',
                '.svg': 'image/svg+xml'
              };
              res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
              res.setHeader('Content-Length', stat.size);
              res.setHeader('Cache-Control', 'public, max-age=3600');
              fs.createReadStream(targetPath).pipe(res);
              return;
            }
          }
          next();
        });
      },
      buildStart() {
        // Ensure assets are mirrored into public/ during build
        const copyRecursive = (src, dest) => {
          if (!fs.existsSync(src)) return;
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          const entries = fs.readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else if (!fs.existsSync(destPath)) {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        };
        const assetsDir = path.resolve(__dirname, 'assets');
        const publicDir = path.resolve(__dirname, 'public');
        if (fs.existsSync(assetsDir)) {
          copyRecursive(assetsDir, publicDir);
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
