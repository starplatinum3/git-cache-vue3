import { createStore } from 'vuex'

export default createStore({
  state: {
    questions:[]
  },
  mutations: {
    updateQuestions(state,data){
      state.questions = data
    }
    // https://blog.csdn.net/weixin_45936690/article/details/115456564
  },
  actions: {
  },
  modules: {
  }
})
