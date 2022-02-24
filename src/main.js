import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
// 这样错的  之前是因为多拷贝 一层目录 src目录。。
// import router from './src/router'
import router from './router'
// createApp(App).mount('#app')
// router =router

// elm ui vue 3  要升级吧

import ElementUI from 'element-ui'
// import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
// import ImageViewer from 'vue2-viewer';


// import Vue from 'vue';
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

// const ip = '139.196.8.79'
// const ip = '139.196.8.79'
const ip = 'localhost'
const port = '8889'
export const axiosUrl = `http://${ip}:${port}/`


import VueCookies from 'vue-cookies';

// Vue.use(ImageViewer);
// Vue.use(VueCookies)

let Vue=createApp(App)

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

Object.assign(Vue.prototype, { // vue的原型合并axios和axiosUrl
    // _ajax: axios,
    _api: axiosUrl
})

// Vue.use(ElementUI)
// Vue.use(VueResource)

// vue 3  Vue .use
// https://blog.csdn.net/weixin_41981909/article/details/116496553

Vue.use(router).
    // use(ImageViewer).
    use(VueCookies).
    use(ElementUI).
    // use(VueResource).
mount('#app')
