<template>
  <br />
  <div class="container-curse">
    <p class="titlu-pagina-curse" v-if="driverData">
      {{ "Rezultate " + driverData.driverInfo.fullName + " " + driverData.season }}
    </p>

    <!-- Show loading state -->
    <div v-if="pending" class="loading-container">
      <p>Se încarcă rezultatele...</p>
    </div>

    <!-- Show error state -->
    <div v-else-if="error" class="error-container">
      <p>A apărut o eroare la încărcarea datelor. Vă rugăm să încercați din nou.</p>
      <button @click="refresh" class="retry-button">Încercați din nou</button>
    </div>

    <!-- Show race results -->
    <template v-else-if="driverData">
      <RezultatePilot
          v-for="cursa in driverData.races"
          :key="cursa.round"
          :cursa="cursa"
      />
    </template>
  </div>
</template>

<script setup>
// Get the route params
const route = useRoute()
const pilotId = route.params.id

// Use Nuxt's data fetching with server-side rendering
const { data: driverData, pending, error, refresh } = await useFetch(
    `/api/driver/${pilotId}`,
    {
      key: `driver-${pilotId}`,
      server: true,
      lazy: false
    }
)

// Set page title and metadata based on driver data
watchEffect(() => {
  if (driverData.value?.driverInfo) {
    useHead({
      title: `Rezultate ${driverData.value.driverInfo.fullName}`,
      meta: [
        {
          name: 'description',
          content: `Rezultatele pilotului ${driverData.value.driverInfo.fullName} pentru sezonul F1 ${driverData.value.season}`
        }
      ]
    })
  }
})

// This watch isn't necessary for SSR but helps if we need to refetch
// when route params change on client-side navigation
watch(() => route.params.id, (newId) => {
  if (newId && newId !== pilotId) {
    // Force refresh data if ID changes
    refresh()
  }
}, { deep: true })

// Handle errors
watchEffect(() => {
  if (error.value) {
    console.error("Error fetching driver data:", error.value)
  }
})
</script>

<style scoped>
@import "@/components/css/rezultatePilot.scss";
</style>