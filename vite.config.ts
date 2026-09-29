import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// In sviluppo inietta gli stessi meta tag SEO che il pre-rendering genera in build.
function seoDevHead(): Plugin {
  return {
    name: 'seo-dev-head',
    apply: 'serve',
    async transformIndexHtml(html, ctx) {
      if (!ctx.server) return html;
      const { renderHead } = await ctx.server.ssrLoadModule('/src/entry-server.tsx');
      return html.replace('<!--app-head-->', renderHead());
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoDevHead()],
  build: {
    // I font restano file separati: il browser scarica solo i sottoinsiemi unicode che servono.
    assetsInlineLimit: (file) => (/\.(woff2?|ttf)$/.test(file) ? false : undefined),
  },
});
