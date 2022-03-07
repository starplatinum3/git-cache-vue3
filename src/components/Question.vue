<template>
  <div>
    <QuestionBody :questionData="question.questionData"></QuestionBody>
  <!-- v-model:value="answer" -->
    <b-card-body class="pt-0">
      <hr />
      <b-form @submit="onSubmit">
        <b-form-group label="Select an answer:" class="text-left">
          <b-form-radio
            v-for="(ans, index) of question.answers"
            :key="index"
            v-model="answer"
          
            :value="ans"
          >
            <div v-html="ans"></div>
          </b-form-radio>
        </b-form-group>

        <b-button type="submit" class="custom-success">Submit</b-button>
      </b-form>
    </b-card-body>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import * as Vue from 'vue'
import QuestionBody from './QuestionBody'

export default {
  name: 'Question',
  props: {
    /** Question object containing questionData, possible answers, and user answer information. */
    question: {
      required: true,
      type: Object,
    },
  },
  components: {
    QuestionBody,
  },
  data() {
    return {
      answer: null,
    }
  },
  methods: {
    onSubmit(evt) {
      console.log("onSubmit");
      // console.log(onSubmit);
      evt.preventDefault()
      console.log("this.answer");
      console.log(this.answer);
      if (this.answer) {
        /** Triggered on form submit. Passes user answer.
         * @event answer-submitted
         * @type {number|string}
         * @property {string}
         */
        $emit(this, 'answer-submitted', this.answer)
        this.answer = null
      }
    },
  },
  emits: ['answer-submitted'],
}
</script>
