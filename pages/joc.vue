<template>
  <br />
  <div class="reaction-wrapper">
    <p class="reaction-titlu">
      Jocul de reacție folosit de piloții de Formula 1
    </p>
    <br />
    <button
        type="button"
        class="btn btn-danger"
        @click="start"
        :disabled="isPlaying"
    >
      Start
    </button>
    <br />
    <br />
    <Boxreactie v-if="isPlaying" :delay="delay" @sfarsit="endGame" />
    <div class="instructiuni" v-if="!isPlaying">
      <p class="instructiune">
        1. Apasă pe butonul <span style="color: red">"Start"</span>
      </p>
      <p class="instructiune">2. Așteaptă câteva secunde</p>
      <p class="instructiune">3. Apasă pe cutiuța apărută</p>
      <p class="instructiune">4. Verifică scorul</p>
    </div>
    <div class="result-box" v-if="showResult">
      <results :score="score" />
    </div>
    <div class="timpi-tabel">
      <span v-if="textshow">Ultimul timp:</span>
      <span v-else>Rezultate:</span>
      <p v-for="timpi in timp.slice().reverse()" :key="timpi.id">
        {{ timpi }} ms
      </p>
    </div>
    <div class="best-tabel" v-if="!textshow">
      <span>Cel mai bun timp:</span>
      <span style="font-weight: bold">
        {{ bestTime !== null ? bestTime + ' ms' : 'N/A' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Reactive data
const isPlaying = ref(false)
const delay = ref(null)
const score = ref(null)
const showResult = ref(false)
const timp = ref([])
const textshow = ref(true)
const maxim = ref(999999)
const bestTime = ref(null)  // Variabila pentru cel mai bun timp

// Set document title
onMounted(() => {
  document.title = "Joc Reacție"

  // Verificăm și încărcăm scorurile din localStorage
  const savedScore = localStorage.getItem("score")
  if (savedScore) {
    try {
      timp.value.push(JSON.parse(savedScore))
    } catch (e) {
      localStorage.removeItem("score")
    }
  }

  // Încărcăm și cel mai bun timp din localStorage
  const savedBestTime = localStorage.getItem("bestTime")
  if (savedBestTime) {
    bestTime.value = JSON.parse(savedBestTime)
  }
})

// Methods
const start = () => {
  delay.value = 2000 + Math.random() * 2000
  isPlaying.value = true
  showResult.value = false
}

const endGame = (timpReactie) => {
  score.value = timpReactie
  isPlaying.value = false
  showResult.value = true
  localStorage.setItem("score", JSON.stringify(score.value))

  // Actualizăm scorul
  const savedScore = localStorage.getItem("score")
  if (savedScore) {
    try {
      timp.value.push(JSON.parse(savedScore))
      textshow.value = false
    } catch (e) {
      localStorage.removeItem("score")
    }
  }

  // Actualizăm cel mai bun timp
  if (!bestTime.value || timpReactie < bestTime.value) {
    bestTime.value = timpReactie
    localStorage.setItem("bestTime", JSON.stringify(bestTime.value))
  }

  // Căutăm cel mai bun timp dintre toate scorurile
  for (let i = 0; i < timp.value.length; i++) {
    if (maxim.value > timp.value[i]) {
      maxim.value = timp.value[i]
    }
  }
}
</script>



<style scoped>
@import "../assets/joc.css";
</style>
