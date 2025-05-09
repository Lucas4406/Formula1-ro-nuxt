<template>
  <div class="tabel-container-curse">
    <div class="tabel-cursa">
      <div class="tabel-header">
        <p class="nume-cursa">{{ cursa.raceName }}</p>
        <p class="loc-cursa">{{ cursa.Circuit.circuitName.toUpperCase() }}</p>
        <p class="data-cursa">
          {{ formatDate(cursa.date) }}
        </p>
      </div>
      <div class="tabel-body-curse">
        <div
            class="pilot-container-curse"
            v-for="pilot in cursa.Results"
            :key="pilot.Driver.driverId"
        >
          <div class="parte-sus-pilot">
            <div class="pozitie-curse">{{ pilot.position }}.</div>
            <div class="numesiechipa">
              <p class="nume-pilot">
                {{ pilot.Driver.givenName }} {{ pilot.Driver.familyName }}
              </p>
              <div class="echipa-pilot">
                <p>{{ pilot.Constructor.name }}</p>
                <p>+{{ pilot.points }}pt</p>
              </div>
            </div>
          </div>
          <div class="parte-jos-pilot">
            <div class="status">
              <p class="status-text">Status</p>
              <p class="status-status">{{ pilot.status }}</p>
            </div>
            <div class="fastest-lap">
              <p class="fastest-text">Cel mai rapid tur</p>
              <p class="fastet-lap">
                {{ pilot.FastestLap }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props definition using defineProps in Nuxt 3/Vue 3 Composition API
const props = defineProps({
  cursa: {
    type: Object,
    required: true
  }
});

// Format date function
const formatDate = (dateString) => {
  return new Date(dateString)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-");
};
</script>

<style scoped>
@import "./css/rezultatePilot.scss";
</style>