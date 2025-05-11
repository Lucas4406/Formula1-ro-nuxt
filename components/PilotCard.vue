<template>
  <div
      class="card-const"
      :class="{ darkmode: darkMode }"
      :style="{ borderColor: pilot.culoare }"
  >
    <div class="partesus">
      <p
          class="pozitie"
          :style="{ borderColor: pilot.culoare }"
          :class="{ darkmode: darkMode }"
      >
        {{ pilot.pozitie === null ? 0 : pilot.pozitie }}
      </p>
      <p class="nume-echipa">
        {{ pilot.primulNume + ' ' + pilot.alDoileaNume }}
      </p>
    </div>

    <div class="partejos">
      <div
          class="curse-castigate-cont"
          :style="{ borderColor: pilot.culoare }"
          :class="{ darkmode: darkMode }"
      >
        <p class="text-curse">Echipă</p>
        <p class="curse-castigate">
          {{ pilot.echipa }}
        </p>
      </div>

      <div
          class="nrpuncte-cont"
          :style="{ borderColor: pilot.culoare }"
          :class="{ darkmode: darkMode }"
      >
        <p class="text-puncte">Număr puncte</p>
        <p class="nrpuncte">
          {{ pilot.puncte === null ? 0 : pilot.puncte }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pilot: {
    type: Object,
    required: true
  },
  darkMode: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
@import '@/assets/clasament.css';

.curse-castigate {
  font-size: 2rem;
  padding: 0.5rem;
  text-align: center;
}

.nume-echipa {
  text-align: center;
}
</style>
