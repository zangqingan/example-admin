# 一、example-admin 概述

1. 使用 npm init vue@latest 创建项目。

2. 往.eslintrc.cjs 文件中增加校验规则，运行 npm run lint 即可查看是否起作用。

3. 配置 vue3api 自动导入，之后无需手动声明可直接使用
   npm install -D unplugin-vue-components unplugin-auto-import
   在 vue.config.js 里配置。
   同时安装饿了么 ui，一并配置 npm install element-plus --save
   为了在 vite 配置文件中配置 eslint 需要安装一个包：npm i vite-plugin-eslint

4. 全局安装 sass，配置项目公共样式
   npm i sass

5. 安装饿了么常用图标 icon 库，并配置自动导入。
   npm install @element-plus/icons-vue
   npm install unplugin-icons

# 二、登录页编写

增加登录静态路由，编写登录组件。

# 三、axios 接口封装

在 src 目录下新建 api 和 utils 文件夹，其中 api 下存放具体的接口。
utils 目录下新建 request.js 文件对 axios 进行封装。
