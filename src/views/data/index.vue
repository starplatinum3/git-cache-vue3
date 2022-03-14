<template>
  <!-- <div>{{state.content}}</div> -->
  <div>{{ content }}</div>
  <h2>记事本</h2>
  <div>一条记录</div>
  <!-- <input> -->
  <!-- value="请输入新的笔记" -->
  <input type="text" v-model="inputVal" @keyup.enter="add" />
  <button type="text" @click="rev">rev</button>
  <!-- 短的 -  用驼峰的 -->
  <!-- https://www.jianshu.com/p/3b84f29512d9 -->
  <!-- <div v-for="note in state.data.list"></div> -->
  <!-- <div v-for="(item, index) in data.list" :key="index">
    
    <div>{{item}}</div>
  </div> -->
  <ul v-for="(item, index) in data.list" :key="index">
    <li>
      {{ item }}
      <button @click="remove(index)">删除</button>
    </li>
  </ul>
  <!-- v-for="(item, index) in list" :key="index" -->
  <ul>
    <li v-for="(val, index) in list" :key="index">
        <!-- {{ index }}--{{ val.name }} -->
      <span v-if="val.age < 30">{{ index }}--{{ val.name }}</span>
    </li>
    <!-- <li>
      {{ item }}
      <button @click="remove(index)">删除</button>
    </li> -->
  </ul>

  <div v-show="showingBottom">
    条数: {{ data.list.length }}
    <button @click="clear">清除所有记录</button>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    // vue  input
    const state = reactive({
      data: {
        list: ["学习", "吃饭", "睡觉"],
        inputVal: "好好学习，天天向上",
      },
      showingBottom: true,
      content: "123244",
      list: [
        {
          name: "Tom",
          age:"28"
        },
        {
          name: "java",
          age:"30"
        },
      ],
    });

    const rev = () => {
      console.log("state.  content");
      console.log(state.content);
      state.content = state.content.split("").reverse().join("");
    };
    const add = () => {
      console.log("state.data.inputVal");
      console.log(state.data.inputVal);
      state.data.list.push(state.data.inputVal);
      // input 双向绑定
    };
    const remove = (index) => state.data.list.splice(index, 1);
    // 把1位置的东西替换掉了，替换的东西没有写 就是删除的意思
    const clear = () => {
      state.data.list = [];
      state.showingBottom = false;
    };

    return {
      ...toRefs(state),
      add,
      remove,
      clear,
      rev,
    };
  },
};
</script>

<style scoped>
</style>
