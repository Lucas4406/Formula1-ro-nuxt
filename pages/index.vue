<script setup>
// Import required composables
import { ref } from 'vue';

// Define reactive state
const heroData = ref(null);
const smallText = ref("");

// Set page title and metadata
useHead({
  title: 'Formula1-ro | Date din Formula 1 actualizate regulat',
  meta: [
    { name: 'description', content: 'Formula 1 România - informații despre următoarea cursă și știri recente' }
  ]
});

// Fetch race data on server side
const { data, error } = await useFetch(() => `${useRuntimeConfig().public.apiBaseUrl}/get-next`, {
  server: true,
  lazy: false,
  transform: (data) => {
    if (!data) return null;

    // Process dates
    const dataInc = new Date(data.race.meetingStartDate);
    const dataSf = new Date(data.race.meetingEndDate);
    const dataI = dataInc.getDate();
    const dataS = dataSf.getDate();

    // Pad with leading zeros if needed
    const padWithLeadingZeros = (num, totalLength) => String(num).padStart(totalLength, "0");

    const dataInceput = dataI < 10 ? padWithLeadingZeros(dataI, 2) : dataI;
    const dataSfarsit = dataS < 10 ? padWithLeadingZeros(dataS, 2) : dataS;

    // Get month name
    const monthName = dataInc.toLocaleString('en-US', { month: 'short' });

    // Add new properties to data
    return {
      ...data,
      inceput: dataInceput,
      sfarsit: dataSfarsit,
      lunaCursaText: monthName
    };
  },
  onError: (error) => {
    console.error('Error fetching race data:', error);
  }
});

// Set heroData when data is available
heroData.value = data.value;
</script>

<template>
  <div class="site-wrapper mb-2">
    <br />
    <div class="top-hero loggedin">
      <herocursa v-if="heroData" :heroData="heroData" :smallText="smallText" />
    </div>
    <div class="stiri-grid">
      <stiricomp />
    </div>
  </div>
</template>

<style>
@import "../assets/home.scss";
@import "../assets/clasamentpiloti.scss";
</style>