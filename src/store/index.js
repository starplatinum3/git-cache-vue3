import { createStore } from 'vuex'

export default createStore({
  state: {
    questions:[],
    auth:null,
  },
  mutations: {
    updateQuestions(state,data){
      state.questions = data
    },
    updateAuth(state,data){
      state.auth = data
    }
    // https://blog.csdn.net/weixin_45936690/article/details/115456564
  },
  actions: {
  },
  modules: {
  }
})
