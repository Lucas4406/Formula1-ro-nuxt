<template>
  <div class="content-wrapper">
    <br />
    <p class="piloti-text">Clasament piloți {{year}}</p>
    <br />
    <br />
    <div class="piloti-grid">
      <NuxtLink
          class="pilot-container"
          v-for="(pilot, index) in piloti"
          :key="index"
          :to="`/pilot/${pilot.alDoileaNume.slice(0, 3).toUpperCase()}`"
      >
        <div class="pozitiepuncte-pilot">
          <p class="pozitie-pilot" v-if="!dontShow">{{ pilot.pozitie }}</p>
          <div class="nrpuncte-container" v-if="!dontShow">
            <p class="nrpuncte-pilot">{{ pilot.puncte }}</p>
            <p class="puncte-text-pilot">PCT</p>
          </div>
        </div>
        <div class="numesteag">
          <div class="numesiculoare">
            <p class="culoare-pilot-pilot" :style="{ color: pilot.culoare }">
              |
            </p>
            <div class="nume-pilot">
              <p class="firstname">{{ pilot.primulNume }}</p>
              <p class="lastname">{{ pilot.alDoileaNume }}</p>
            </div>
          </div>
          <img :src="pilot.steag" class="img-steag" alt="Steagul pilotului" />
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="echipa">
            {{ pilot.echipa }}
          </p>
          <p class="echipa" v-if="!dontShow">{{ pilot.gapDelta }}</p>
        </div>
        <div class="pozanumar">
          <img :src="pilot.poza" class="poza-pilot" alt="Poza pilot" />
          <img :src="pilot.numar" class="nr-pilot" alt="Număr pilot" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Define the reactive data
const piloti = ref([])
const dontShow = ref(false)

// Get the runtime config
const config = useRuntimeConfig()

// Use Nuxt 3 data fetching with useFetch
const { data: driversData, error } = await useFetch(`/api/proxy/mongo/piloti?order=asc`, {
  // Use server-side fetching for SSR
  server: true,
  // Transform the data
  transform: (data) => {
    if (!data || data.length === 0) return []

    const first = data[0].puncte
    const firstThree = data[0].alDoileaNume.substring(0, 3).toUpperCase()
    data[0].gapDelta = ""

    // Process the delta for each driver
    for (let i = 1; i < data.length; i++) {
      const delta = first - data[i].puncte
      if (delta < 300) {
        data[i].gapDelta = `Gap to ${firstThree} ${-delta}`
      } else {
        data[i].gapDelta = ""
      }

      // Check if we should hide the position/points display
      if (data[i].pozitie === null || data[i].puncte === null) {
        dontShow.value = true
      }
    }

    return data
  }
})

// Update the piloti ref when data is available
watchEffect(() => {
  if (driversData.value) {
    piloti.value = driversData.value
  }
})

// Handle errors
if (error.value) {
  console.error('Failed to fetch drivers:', error.value)
}
const year = new Date(piloti.value[0]?.createdAt).getFullYear();

// Set the page meta
useHead({
  title: `Clasament piloți ${year}`,
  meta: [
    {
      name: 'description',
      content: `Clasamentul piloților pentru sezonul de Formula 1 ${year}`
    }
  ]
})
</script>

<style scoped>
@import "@/assets/clasamentpiloti.scss";
</style>