// eslint配置
import EslintPlugin from 'vite-plugin-eslint'
// 按需自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 按需自动导入饿了么ui
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 按需导入饿了么icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const baseURL = '/api'
const https = false
const prefix = https ? 'https://' : 'http://'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // 指定eslint检查忽略文件
    EslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue'],
      exclude: ['./node_modules', './dist']
    }),
    // 按需自动导入相关
    AutoImport({
      // 自动导入 Vue、vue-router和 pinia相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', 'pinia'],
      dts: false, // 指定ts类型声明文件，为true时在项目根目录创建，我们是js所以不用。
      eslintrc: {
        enabled: false, // Default `false`需要注意的是，一旦生成配置文件之后，最好把改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      directoryAsNamespace: true // 组件名称包含目录，防止同名组件冲突
    }),
    // 图标
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    // 配置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置代理
  server: {
    hmr: true,
    port: 80,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        // target: 'http://10.100.1.104:30032/prod-api/',
        target: prefix + baseURL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/tianyan': {
        target: 'http://10.100.1.104:30032:8090/tianyan',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/tianyan/, '')
      }
    }
  },
  // 配置打包规则
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    minify: 'terser', // 使用terser压缩加密
    sourcemap: true,
    // 生产环境去除 console debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // 静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // 全局sass配置
  css: {
    preprocessorOptions: {
      // 全局scss文件挂载
      scss: {
        additionalData: "@import './src/assets/styles/_variables.scss';"
      }
    }
  }
})
