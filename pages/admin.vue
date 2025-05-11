<template>
  <div class="flex flex-row gap-4 w-screen justify-center items-center h-screen">
    <button class="text-xl items-center justify-center mt-6">
      <NuxtLink to="/test">Introducere echipe</NuxtLink>
    </button>
    <div class="flex flex-row gap-2">
      <button class="text-xl items-center justify-center mt-6">
        <a :href="clasamentPilotiLink" target="_blank">Update clasament piloti</a>
      </button>
      <button class="text-xl items-center justify-center mt-6">
        <a :href="echipeLink" target="_blank">Update clasament echipe</a>
      </button>
      <button class="text-xl items-center justify-center mt-6">
        <a :href="stiriTranslateLink" target="_blank">Update 6 stiri</a>
      </button>
    </div>
  </div>

  <div class="wrapper-profile">
    <ProfileCard
        v-for="profile in profiles"
        :key="profile.id"
        :profileInfo="profile"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'is-admin'
})
import { ref, onMounted } from 'vue'
import { useRuntimeConfig, useFetch} from '#app'

const config = useRuntimeConfig()
const profiles = ref([])
const curseCount = ref(0)

const clasamentPilotiLink = `/api/proxy/clasament-piloti`
const echipeLink = `/api/proxy/echipe`
const stiriTranslateLink = `/api/proxy/stiri-translate`

const { data, error } = await useFetch(`/api/proxy/profile`)
profiles.value = data.value
</script>

<style scoped>
.wrapper-profile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 20px;
}
</style>


<style scoped>
.wrapper-profile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 20px;
}
</style>