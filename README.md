# toutiao-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目初始化--移动端REM适配
 + `amfe-flexible`
 + 安装 `npm i -S amfe-flexible`
 + 然后在`main.js`中加载执行模块
  - `import 'amfe-flexible''`
  
 + 使用postcss-pxtorem将`px`转为`rem`
   安装依赖
   ```shell script
   -D 是 --save-dev的简写
   npm  install postcss-pxtorem -D
```
   然后在项目根目录中创建postcss.config.js文件



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
