// import axios from 'axios';
// import Vue from 'vue';

// const service = axios.create({
//
//     timeout: 5000
// });
//
// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );
//
// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

// 这不会自动引入包
import strUtil from "./strUtil";
import Global from "@/util/global";
import axios from "axios";

const method = {

  // params:{interfaceState:state} // query参数

  // eslint-disable-next-line no-unused-vars
  postWithParams(url, data, params, vue) {
    // console.log("vue")
    // console.log(vue)
    // console.log("vue.$cookies")
    // console.log(vue.$cookies)
    const jsonDic = {
      headers: {
        // "token": Vue.$cookies.get("token"),
        'token': vue.$cookies.get('token'),
        'Content-Type': 'application/json;charset=utf-8' // 头部信息
      }
    }

    // return this.$axios.post(this._api + 'city/list',
    // return Vue.$axios.post(Vue._api + url,
    // $axios.post 传递 param 和 body
    // return vue.$axios.post(vue._api + url,
    //   data, jsonDic,params:params
    // )

    // 参数情况：（interfaceState：query参数，ID：body参数）
    // config: jsonDic
    return vue.$axios({
      url: url,
      method: 'post',
      data: data, // body参数
      params: params, // query参数

    })

    // .then(response => {
    //
    //     console.log("response")
    //     console.log(response)
    //     this.tableDataAll = [];
    //     this.tableDataAll = response.data.data.content;
    //
    // })
    // .catch(function (error) {
    //     console.log("error");
    //     console.log(error);
    // });
  },

  // post(url:String, data, vue) {
  post(url, data, vue) {
    // console.log("vue")
    // console.log(vue)
    // console.log("vue.$cookies")
    // console.log(vue.$cookies)
    const jsonDic = {
      headers: {
        // "token": Vue.$cookies.get("token"),
        'token': vue.$cookies.get('token'),
        'Content-Type': 'application/json;charset=utf-8' // 头部信息
      }
    }

    // return this.$axios.post(this._api + 'city/list',
    // return Vue.$axios.post(Vue._api + url,
    // $axios.post 传递 param 和 body
    var postUrl = strUtil.urlAdd(vue._api, url)
    // return vue.$axios.post(vue._api + url,
    return vue.$axios.post(postUrl,
      data, jsonDic
    )
    // $axios.get
    // .then(response => {
    //
    //     console.log("response")
    //     console.log(response)
    //     this.tableDataAll = [];
    //     this.tableDataAll = response.data.data.content;
    //
    // })
    // .catch(function (error) {
    //     console.log("error");
    //     console.log(error);
    // });
  },
  postV3(url, data) {
    const jsonDic = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8' // 头部信息
      }
    }

    var postUrl = strUtil.urlAdd(Global.axiosUrl, url)
    // return vue.$axios.post(vue._api + url,
    return axios.post(postUrl, data, jsonDic)
    // return vue.$axios.post(postUrl,
    //     data, jsonDic
    // )
  },

  get(url, params) {
    const jsonDic = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8' // 头部信息
      }
    }

    let config = {
      params: params,
      headers: {
        'Content-Type': 'application/json;charset=utf-8' // 头部信息
      }
    }
    var postUrl = strUtil.urlAdd(Global.axiosUrl, url)
    // return vue.$axios.post(vue._api + url,
    // return  axios.post(postUrl,data, jsonDic)
    // return  axios.get(postUrl,data, jsonDic)
    return axios.get(postUrl, config)
    // return vue.$axios.post(postUrl,
    //     data, jsonDic
    // )
  }

}

// function post(url, data) {
//
//     // 这里拿到的 vue 应该不对
//     let jsonDic = {
//         headers: {
//             "token": Vue.$cookies.get("token"),
//             // "token": vue.$cookies.get("token"),
//             "Content-Type": "application/json;charset=utf-8" //头部信息
//         }
//     }
//
//     // return this.$axios.post(this._api + 'city/list',
//     return Vue.$axios.post(Vue._api + url,
//     // return vue.$axios.post(vue._api + url,
//         data, jsonDic
//     )
//     // .then(response => {
//     //
//     //     console.log("response")
//     //     console.log(response)
//     //     this.tableDataAll = [];
//     //     this.tableDataAll = response.data.data.content;
//     //
//     // })
//     // .catch(function (error) {
//     //     console.log("error");
//     //     console.log(error);
//     // });
//
// }

// method.post = post

// export default service;
export default method