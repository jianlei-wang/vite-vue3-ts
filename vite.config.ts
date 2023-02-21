import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import autoprefixer from 'autoprefixer';
import postcsspxtorem from 'postcss-pxtorem';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, __dirname);
  return {
    base: ENV.VITE_ENV === 'production' ? './' : '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 启动 mock 服务
      viteMockServe({
        supportTs: false,
        logger: false,
        mockPath: './src/mock/',
      }),
      createSvgIconsPlugin({
        // 指定图标文件夹，绝对路径（NODE代码）
        iconDirs: [path.resolve(process.cwd(), 'src/svgs')],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      // 类型： string[] 导入时想要省略的扩展名列表。
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              'last 10 versions', // 所有主流浏览器最近10版本用
            ],
            grid: true,
          }),
          postcsspxtorem({
            rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920*1080 设计 此处就为192
            propList: ['*', '!border'], // 除 border 外所有px 转 rem
            selectorBlackList: ['.el-'], // 过滤掉.el-开头的class，不进行rem转换
          }),
        ],
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static', //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
      chunkSizeWarningLimit: 1000, //限制块文件大小
      minify: 'terser',
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name;
            var info = name.split('.');
            var extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(name)) {
              extType = 'img';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
              extType = 'fonts';
            }
            return `static/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          //分解块，将大块分解成更小的块
          // manualChunks: (id) => {
          //   if (id.includes('node_modules')) {
          //     return id
          //       .toString()
          //       .split('node_modules/')[1]
          //       .split('/')[0]
          //       .toString();
          //   }
          // },
        },
      },
    },
    server: {
      host: '0.0.0.0', //ip地址
      port: 8088, //端口号
      open: true, //启动后是否自动打开浏览器
    },
  };
});
