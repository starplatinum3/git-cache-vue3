<template>
  <div class="h-100">
    <b-card-header class="custom-info text-white font-weight-bold"
      >Your Score: {{ score }} / {{ maxScore }}</b-card-header
    >
    <Answer
      v-for="(question, index) of questions"
      :key="index"
      :question="question"
    ></Answer>
  </div>
</template>

<script>
import * as Vue from "vue";
import Answer from "../components/Answer";
// 引入vuex
import $store from "../store/index";
// import $store from "../store/index";
export default {
  name: "GameOver",
  components: {
    Answer,
  },
  data() {
    return {
      questions: [],
      score: 0,
      maxScore: 0,
    };
  },
  methods: {
    /** Invoked on created().
     * Grabs data from $root.$data.state.
     * Empties $root.$data.state => This is done to ensure data is cleared when starting a new game.
     * Invokes setScore().
     * @public
     */
    setQuestions() {
      console.log("this.$root");
      console.log(this.$root);
      // this.questions = this.$root.$data.state || []
      // this.$root.$data.state = []

      this.questions = $store.state.questions;
      $store.commit("updateQuestions", []);
      //我在这个事件里获取到  this.saveAllList，调用this.$store.commit把数据存入vuex中
      // this.$store.commit('updateQuestions', this.questions)
      // this.questions = this.$store.state.questions
      // this.$store.commit('updateQuestions', [])
      this.setScore();
    },
    /** Computes maximum possible score (amount of questions * 10)
     * Computes achieved score (amount of correct answers * 10)
     * @public
     */
    setScore() {
      this.maxScore = this.questions.length * 10;
      this.score = this.questions.filter((q) => q.correct).length * 10;
    },
  },
  created() {
    this.setQuestions();
  },
};
</script>
