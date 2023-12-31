<template>
  <div class="h-100">
    <LoadingIcon v-if="loading"></LoadingIcon>
    <Question :question="currentQuestion" @answer-submitted="onAnswerSubmit" v-else></Question>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from "../utils/gogocodeTransfer";
import * as Vue from "vue";
import EventBus from "../eventBus";
import ShuffleMixin from "../mixins/shuffleMixin";
import Question from "../components/Question";
import LoadingIcon from "../components/LoadingIcon";
import axios from "axios";
import $store from "../store/index"
export default {
  name: "GameController",
  mixins: [ShuffleMixin],
  props: {
    /** Number of questions */
    number: {
      default: "10",
      type: String,
      required: true
    },
    /** Id of category. Empty string if not included in query */
    category: String,
    /** Difficulty of questions. Empty string if not included in query */
    difficulty: String,
    /** Type of questions. Empty string if not included in query */
    type: String
  },
  components: {
    Question,
    LoadingIcon
  },
  data() {
    return {
      // Array of custom question objects. See setQuestions() for format
      questions: [],
      currentQuestion: {},
      // Used for displaying ajax loading animation OR form
      loading: true
    };
  },
  created() {
    console.log("fetchQuestions created");
    this.fetchQuestions();
  },
  methods: {
    /** Invoked on created()
     * Builds API URL from query string (props).
     * Fetches questions from API.
     * "Validates" return from API and either routes to MainMenu view, or invokes setQuestions(resp).
     * @public
     */
    fetchQuestions() {
      let url = `https://opentdb.com/api.php?amount=${this.number}`;
      if (this.category) url += `&category=${this.category}`;
      if (this.difficulty) url += `&difficulty=${this.difficulty}`;
      if (this.type) url += `&type=${this.type}`;
      console.log("url");
      console.log(url);
      axios
        .get(url)
        .then(resp => resp.data)
        .then(resp => {
          console.log("resp");
          console.log(resp);
          if (resp.response_code === 0) {
            console.log("setQuestions code==0");
            this.setQuestions(resp);
          } else {
            console.log("code not 0");
            $emit(
              EventBus,
              "alert-error",
              "Bad game settings. Try another combination."
            );
            this.$router.replace({ name: "home" });
          }
        });
    },
    /** Takes return data from API call and transforms to required object setup.
     * Stores return in $root.$data.state.
     * @public
     */
    setQuestions(resp) {
      resp.results.forEach(qst => {
        const answers = this.shuffleArray([
          qst.correct_answer,
          ...qst.incorrect_answers
        ]);
        const question = {
          questionData: qst,
          answers: answers,
          userAnswer: null,
          correct: null
        };
        this.questions.push(question);
      });
        // $store.upda
      $store.commit("updateQuestions",this.questions)

      // this.$root.$data.state = this.questions;
      this.currentQuestion = this.questions[0];
      this.loading = false;
    },
    /** Called on submit.
     * Checks if answer is correct and sets the user answer.
     * Invokes nextQuestion().
     * @public
     */
    onAnswerSubmit(answer) {
      if (this.currentQuestion.questionData.correct_answer === answer) {
        this.currentQuestion.correct = true;
      } else {
        this.currentQuestion.correct = false;
      }
      this.currentQuestion.userAnswer = answer;
      this.nextQuestion();
    },
    /** Filters all unanswered questions,
     * checks if any questions are left unanswered,
     * updates currentQuestion if so,
     * or routes to "result" if not.
     * @public
     */
    nextQuestion() {
      const unansweredQuestions = this.questions.filter(q => !q.userAnswer);
      if (unansweredQuestions.length > 0) {
        this.currentQuestion = unansweredQuestions[0];
      } else {
        this.$router.replace({ name: "result" });
      }
    }
  },
  emits: ["alert-error"]
};
</script>
