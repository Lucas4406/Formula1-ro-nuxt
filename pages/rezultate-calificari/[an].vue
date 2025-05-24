
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFetch, useRuntimeConfig } from '#imports'

// Stări reactive
const ancaliSelect = ref('')
const dataQuali = ref([])
const search = ref('')
const titlu = ref('')
const totalRounds = ref(0) // Inițializat la 0
const loading = ref(false)
const currentRaceRound = ref(0) // Inițializat la 0
const initialLoad = ref(true)

// Căutarea de ani (2014-2025)
const years = computed(() => {
  const startYear = 2014
  const endYear = 2025
  const yearsList = []
  for (let i = startYear; i <= endYear; i++) {
    yearsList.push(i)
  }
  return yearsList.reverse()
})

// Funcția asincronă pentru a prelua datele sezonului (total runde și prima rundă curentă)
const fetchSeasonData = async (year) => {
  loading.value = true;
  totalRounds.value = 0;
  currentRaceRound.value = 0;
  try {
    const { data: seasonData, error: seasonError } = await useFetch(
        `https://api.jolpi.ca/ergast/f1/${year}.json?limit=100`
    );
    if (seasonError.value) {
      console.error(`Eroare la preluarea datelor sezonului ${year}:`, seasonError.value);
      return false;
    }
    console.log(seasonData.value);  // Adaugă acest log pentru a vizualiza structura răspunsului

    const races = seasonData.value?.MRData?.RaceTable?.Races;
    if (races && races.length > 0) {
      totalRounds.value = races.length;
      if (year === '2025') {
        currentRaceRound.value = await getCurrentRound();
      } else {
        currentRaceRound.value = totalRounds.value;
      }
      return true;
    } else {
      console.warn(`Nu s-au găsit curse pentru anul ${year}.`);
      return false;
    }
  } catch (error) {
    console.error(`Eroare neașteptată la preluarea datelor sezonului ${year}:`, error);
    return false;
  } finally {
    loading.value = false;
  }
};

// Funcția pentru schimbarea anului
const anChange = async () => {
  dataQuali.value = []
  await fetchSeasonData(ancaliSelect.value)
  await getData()
}

// Funcția pentru a obține datele calificărilor
const getData = async () => {
  if (loading.value || currentRaceRound.value < 1) return
  loading.value = true
  try {
    const { data: response, error: qualiError } = await useFetch(
        `https://api.jolpi.ca/ergast/f1/${ancaliSelect.value}/${currentRaceRound.value}/qualifying.json?limit=100`
    )
    if (qualiError.value) {
      console.error(`Eroare la preluarea calificărilor pentru runda ${currentRaceRound.value}, anul ${ancaliSelect.value}:`, qualiError.value)
      currentRaceRound.value = 0
      return
    }
    if (response.value?.MRData?.RaceTable?.Races?.length > 0) {
      const race = response.value.MRData.RaceTable.Races[0]
      dataQuali.value.push(race)
      currentRaceRound.value--
    } else {
      currentRaceRound.value = 0
    }
  } catch (error) {
    console.error('Eroare neașteptată la preluarea rundei de calificare:', error)
    currentRaceRound.value = 0
  } finally {
    loading.value = false
  }
}

// Funcția pentru a obține runda curentă pentru 2025
const getCurrentRound = async () => {
  try {
    const { data, error } = await useFetch("/api/proxy/get-next")
    if (error.value) {
      console.error("Eroare la getCurrentRound:", error.value)
      return 0
    }
    let nr_runda = data.value?.meetingContext.nr_runda + 1
    if (!nr_runda) return 0
    while (nr_runda > 0) {
      const { data: checkErgast, error: checkError } = await useFetch(
          `https://api.jolpi.ca/ergast/f1/2025/${nr_runda}/qualifying.json`
      )
      if (checkError.value) {
        console.warn(`Eroare la verificarea rundei ${nr_runda} pentru 2025:`, checkError.value)
        nr_runda--
        continue
      }
      if (checkErgast.value?.MRData?.RaceTable?.Races?.length > 0) {
        return nr_runda
      }
      nr_runda--
    }
    return 0
  } catch (error) {
    console.error("Eroare neașteptată la getCurrentRound:", error)
    return 0
  }
}

// Computed pentru a filtra cursa
const filterCurse = computed(() => {
  return dataQuali.value.filter((tabel) => {
    const raceNameLower = tabel.raceName.toLowerCase()
    const countryLower = tabel?.Circuit?.Location?.country?.toLowerCase() || ''
    const searchLower = search.value.toLowerCase()
    return raceNameLower.includes(searchLower) || countryLower.includes(searchLower)
  })
})

// Observarea modificărilor în rută
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  ancaliSelect.value = route.params.an || '2025'
  titlu.value = ancaliSelect.value
  console.log(ancaliSelect.value)
  useHead({
    title: `Rezultate Calificări ${titlu.value}`
  })
  await fetchSeasonData(ancaliSelect.value)
  await getData()
  initialLoad.value = false
})

// Incarcă mai multe date când utilizatorul ajunge la sentinel
const sentinel = ref(null)
const observer = ref(null)

watch(sentinel, (el) => {
  if (el) {
    observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !loading.value && currentRaceRound.value > 0) {
              getData()
            }
          })
        },
        { threshold: 0.1 }
    )
    observer.value.observe(el)
  } else if (observer.value) {
    observer.value.disconnect()
  }
})
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<template>
  <div class="content-container">
    <div class="form-select">
      <label for="ancurse">Alege anul:</label>
      <select
          id="ancurse"
          name="ancurse"
          class="selectie"
          v-model="ancaliSelect"
          @change="anChange()"
      >
        <option v-for="year in years" :key="year" :value="year" class="optiune">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="text-wrap">
      <p class="text-titlu">
        {{ "Rezultate calificări " + titlu }}
      </p>
    </div>
    <div class="search-wrapper">
      <input
          type="text"
          placeholder="Căutare"
          class="search-bar"
          v-model="search"
      />
    </div>
    <client-only>
      <tabelcali
          v-for="tabel in filterCurse"
          :key="tabel.Circuit?.circuitId || tabel.season + tabel.round"
          :quali-data="tabel"
      />
    </client-only>
    <div ref="sentinel" class="loading" v-if="currentRaceRound > 0">
      <p v-if="loading">Se încarcă...</p>
      <p v-else>Dă scroll pentru mai multe curse</p>
    </div>
  </div>
</template>

<style scoped>
@import "~/assets/calificari.css";
@import "~/assets/searchbar.css";
@import "~/assets/formSelect-curse.css";
</style>