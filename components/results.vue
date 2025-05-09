<template>
  <span>Timpul tău de reacție este de:</span>
  <span style="font-weight: bold">{{ score }} ms</span>
  <br />
  <p>{{ rank }}</p>
</template>

<script setup lang="js">
import { ref, watchEffect } from 'vue'

// Props
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})

// Data
const rank = ref('')

// Watch Effect pentru a actualiza rank-ul bazat pe `score`
watchEffect(() => {
  if (props.score < 100) {
    rank.value = 'De ce nu te-ai făcut pilot?'
  } else if (props.score > 100 && props.score < 200) {
    rank.value = 'Ești șofer în București'
  } else if (props.score > 200 && props.score < 300) {
    rank.value = 'Ești destul de rapid!'
  } else if (props.score > 300 && props.score < 400) {
    rank.value = 'Nu ar strica puțin antrenament'
  } else {
    rank.value = 'Ai adormit?'
  }
})
</script>

<style scoped>
span {
  margin: 0;
}
</style>
