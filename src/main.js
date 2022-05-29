import {createApp} from 'vue'
import App from './App.vue'

// import router from './router'
// 这样错的  之前是因为多拷贝 一层目录 src目录。。
// import router from './src/router'
import router from './router'

import installElementPlus from './plugins/element'

// import { createApp } from 'vue';
import { Button } from 'vant';
// import { Tabbar } from 'vant';

// const app = createApp();

const app = createApp(App)
installElementPlus(app)
// app.mount('#app')
// elm ui vue 3  要升级吧

// import ElementUI from 'element-ui'
// import VueResource from 'vue-resource'
// import 'element-ui/lib/theme-chalk/index.css'
// import ImageViewer from 'vue2-viewer';


// import Vue from 'vue';
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

// const ip = '139.196.8.79'
// const ip = '139.196.8.79'

import store from './store'






import ElementPlus from "element-plus";

const ip = 'localhost'
const port = '8889'
export const axiosUrl = `http://${ip}:${port}/`

// Vue3必备
// import { createApp } from 'vue'
// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
    Prism,
});

const Vue = createApp(App)
// https://juejin.cn/post/6975485076918239239
// Vue3必备
// const app = createApp(App)
// 引入v-md-editor预览组件

// Vue3必备
// Vue.mount('#app')
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'



//
//
// import VueCookies from 'vue-cookies';
//
// // Vue.use(ImageViewer);
// // Vue.use(VueCookies)
//
// let Vue=createApp(App)

//
// import axios from 'axios'
// Vue.prototype.$axios = axios
//
// Vue.config.productionTip = false;
//
// Object.assign(Vue.prototype, { // vue的原型合并axios和axiosUrl
//     // _ajax: axios,
//     _api: axiosUrl
// })

// Vue.use(ElementUI)
// Vue.use(VueResource)

// vue 3  Vue .use
// https://blog.csdn.net/weixin_41981909/article/details/116496553

// const app = createApp(App)
// app.use(BootstrapVue3)
import { Tabbar, TabbarItem } from 'vant';
Vue.use(router).use(ElementPlus).// use(ImageViewer).
// use(VueCookies).
// use(ElementUI).
// use(VueResource).
use(BootstrapVue3).
use(VMdPreview).
    use(Button).use(Tabbar).use(TabbarItem).
mount('#app')

// createApp(App).use(router).
// mount('#app')
