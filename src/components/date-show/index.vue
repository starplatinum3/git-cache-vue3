<template>
  <div>
    {{ dateShow }}
  </div>
</template>

<script>
// import * as Vue from 'vue'
// import QuestionBody from './QuestionBody'
import DateUtil from "@/util/DateUtil";
// DateUtil.

export default {
  name: "Answer",
  props: {
    /** Question object containing questionData, possible answers, and user answer information. */
    date: {
      required: true,
      type: Date,
    },
  },
  //   components: {
  //     QuestionBody,
  //   },
  created() {
    console.log("this.date ");
    console.log(this.date);
    console.log("typeof this.date");
    console.log(typeof this.date);
    if (typeof this.date === "string") {
      //   this.date=new Date(this.date)
      this.dateMe = new Date(this.dateMe);
    }
    // let dateShow=  DateUtil.format(this.date,"yyyy-MM-dd hh:mm:ss")
    let dateShow = DateUtil.format(this.dateMe, "yyyy-MM-dd hh:mm:ss");
    // DateUtil.format("")
    console.log("dateShow");
    console.log(dateShow);
    this.dateShow = dateShow;
  },

  methods: {},
  data() {
    return {
      dateMe: this.date,
      dateShow: null,
    };
  },
};
</script>

<style scoped>
.answer-card >>> .card-header {
  border-radius: 0;
}
</style>
