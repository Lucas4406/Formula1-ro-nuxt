<template>
  <div class="reaction-block" v-if="show" @click="stopTimer">Boom</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  delay: {
    type: Number,
    required: true,
  },
})

// Emitting event
const emit = defineEmits(['sfarsit'])

// Reactive state
const show = ref(false)
const timer = ref(null)
const reactieTimp = ref(0)

// Start timer function
const startTimer = () => {
  timer.value = setInterval(() => {
    reactieTimp.value += 5
  }, 5)
}

// Stop timer function and emit event
const stopTimer = () => {
  clearInterval(timer.value)
  emit('sfarsit', reactieTimp.value)
}

// On mounted lifecycle hook
onMounted(() => {
  setTimeout(() => {
    show.value = true
    startTimer()
  }, props.delay)
})
</script>

<style scoped>
@import "./css/reactionbox.css";
</style>
