# git-cache

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


vue-router
cnpm install --save  vue-router
https://www.cnblogs.com/knuzy/p/9130406.html
cnpm install -s vue-router

Module not found: Error: Can't resolve 'sass-loader' in 'D:\proj\vue\git-cache'

  cnpm install sass-loader -D

1:1  error  Component name "About" should always be multi-word  vue/multi-word-component-names


D:\proj\vue\git-cache\src\src\views\Home.vue
  16:9  error  Component name "home" should always be multi-word  vue/multi-word-component-names
  // 多字就离谱
  甚至 home 这样也不是多字，这种第一个是小写的也不行 比如 home-home这样 ，实际上最好是 自己有一套名字吧
  比如说根据自己网名 starp-home

  46:9  error  The `beforeDestroy` lifecycle hook is deprecated. Use `beforeUnmount` 
  instead  vue/no-deprecated-destroyed-lifecycle
  
 2022年2月24日14:07:54
 lab1
 这本书  【正版】轻松学Vue js 3 0从入门到实战(案例 视频 彩色版) 刘兵 中国水利水电出版社 97
 https://item.jd.com/10039693549582.html
 
 2022年2月24日14:50:39
 
 D:\proj\vue\git-cache>vue add element-plus
 挂了

D:\proj\vue\git-cache\src\views\Issue.vue
    1:1   error  Component name "Issue" should always be multi-word            vue/multi-word-component-names
   53:5   error  Elements in iteration expect to have 'v-bind:key' directives  vue/require-v-for-key
   82:12  error  'util' is defined but never used                              no-unused-vars
   84:12  error  'router' is defined but never used                            no-unused-vars
  293:17  error  'comments' is assigned a value but never used                 no-unused-vars
  304:17  error  'originData' is assigned a value but never used               no-unused-vars
  356:17  error  'ddd' is assigned a value but never used                      no-unused-vars
  450:17  error  'url' is assigned a value but never used                      no-unused-vars

✖ 51 problems (51 errors, 0 warnings)


cnpm install v-md-editor --save

https://juejin.cn/post/6975485076918239239

cnpm i @kangc/v-md-editor@next -S


v-md-editor 这个是真的好看

转移到 vue3  git cache ，比较适合手机吧
2022年3月6日22:11:50
