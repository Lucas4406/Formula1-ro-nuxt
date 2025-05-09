<template>
  <div class="content-container-echipe mb-4">
    <div
        v-for="team in teams"
        :key="team.Constructor.id"
        class="constructor-container"
    >
      <ConstructorCard class="responsive-card" :team="team" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Clasament echipe",
})

const { data: teams, error } = await useFetch(
    "https://api.jolpi.ca/ergast/f1/2025/constructorstandings.json",
    {
      server: true,
      transform: (data) =>
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
    }
)

if (error.value) {
  console.error("Eroare la încărcarea clasamentului:", error.value)
}
</script>

<style scoped>
@import "@/assets/clasament.css";
</style>
