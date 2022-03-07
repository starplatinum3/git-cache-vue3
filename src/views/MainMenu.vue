<template>
  <div>
    <b-card-header class="custom-info text-white font-weight-bold"
      >New Game</b-card-header
    >
    <b-card-body class="h-100">
      <GameForm @form-submitted="handleFormSubmitted"></GameForm>
    </b-card-body>
  </div>
</template>

<script>
import * as Vue from 'vue'
import GameForm from '../components/GameForm'

export default {
  name: 'MainMenu',
  components: {
    GameForm,
  },
  methods: {
    /** Triggered by custom 'form-submitted' event from GameForm child component.
     * Parses formData, and route pushes to 'quiz' with formData as query
     * @public
     */
    handleFormSubmitted(formData) {
      const query = formData
      query.difficulty = query.difficulty.toLowerCase()
      console.log("query");
      console.log(query);
      this.$router.push({ name: 'quiz', query: query })
    },
  },
}
</script>
