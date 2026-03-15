import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import VueRouter from 'vue-router/vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';

function getBase() {
  /**
   * about VITE_TARGET_ENV
   *  - pages: for GitHub Pages - hash mode, root path is `/masquevil/`
   *  - hash: for servers do not support SPA - hash mode, root path is `/`
   *  - default: for any others (like sox-mini) - history mode, root path is `/`
   */

  const { VITE_TARGET_ENV } = process.env;
  switch (VITE_TARGET_ENV) {
    case 'pages':
      return '/masquevil/';
    default:
      return '/';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter({}), vue(), markdownRawPlugin()],
  base: getBase(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.example.ts'],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    assetsInlineLimit: 8192,
  },
});

// 自定义插件：将 Markdown 文件作为字符串导入
function markdownRawPlugin() {
  return {
    name: 'markdown-raw',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const content = fs.readFileSync(id, 'utf-8');
        // 将 Markdown 内容作为字符串导出
        return {
          code: `export default ${JSON.stringify(content)}`,
          map: null,
        };
      }
      return null;
    },
  };
}
