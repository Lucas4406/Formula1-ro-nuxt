<template>
  <!-- Cursa Urmatoare Hero -->
  <div
      class="mt-6 flex justify-center w-screen sm:mb-6 lg:mb-0"
      id="hero"
      alt="hero"
      v-if="hero"
  >
    <div
        class="border-red-500 border-2 border-solid sm:max-w-xl sm:w-xl lg:max-w-4xl lg:w-4xl p-4 rounded-md w-full animatie"
    >
      <a
          @click="getItem(`#${circuitName.replace(/\s/g, '').toLocaleLowerCase()}`)"
          style="text-decoration: none; color: black"
      >
        <div alt="header" class="flex justify-between text-2xl mb-4 font-bold">
          <p alt="titlu">{{ round }}. {{ name }}</p>
          <p alt="circuit">{{ circuitName }}</p>
        </div>
        <div alt="data-wrapper" class="text-2xl gap-2 flex flex-col">
          <div alt="FP1" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p class="">FP1</p>
              <p alt="data" class="">{{ formatDate(hero.FirstPractice.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.FirstPractice, 60).timpul }}
            </p>
          </div>
          <div alt="FP2" v-if="!hero.Sprint" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>FP2</p>
              <p alt="data">{{ formatDate(hero.SecondPractice.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.SecondPractice, 60).timpul }}
            </p>
          </div>
          <div alt="SprintQuali" v-if="hero.Sprint" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>SprintQuali</p>
              <p alt="data">{{ formatDate(hero.SprintQualifying.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.SprintQualifying, 44).timpul }}
            </p>
          </div>
          <div alt="Sprint" v-if="hero.Sprint" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>Sprint</p>
              <p alt="data">{{ formatDate(hero.Sprint.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.Sprint, 60).timpul }}
            </p>
          </div>
          <div alt="FP3" v-if="!hero.Sprint" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>FP3</p>
              <p alt="data">{{ formatDate(hero.ThirdPractice.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.ThirdPractice, 60).timpul }}
            </p>
          </div>
          <div alt="Quali" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>Quali</p>
              <p alt="data">{{ formatDate(hero.Qualifying.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ formatSession(hero.Qualifying, 60).timpul }}
            </p>
          </div>
          <div alt="Cursa" class="flex justify-between">
            <div alt="parte-st" class="flex justify-between w-1/2">
              <p>Cursă</p>
              <p alt="data">{{ formatDate(hero.date) }}</p>
            </div>
            <p alt="timp" class="w-1/2 flex justify-end items-center">
              {{ new Date(hero.date + "T" + hero.time).toLocaleTimeString("ro-RO", { timeStyle: "short" }) }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <!-- Card Grid -->
  <div
      alt="card-grid"
      class="lg:grid lg:grid-cols-2 md:grid-cols-1 lg:px-14 lg:p-6 lg:gap-6 sm:justify-center sm:flex sm:flex-col sm:gap-6"
  >
    <div
        class="border-black border-2 border-solid sm:max-w-xl lg:max-w-4xl p-4 sm:ml-20 md:ml-24 lg:ml-0 rounded-md animatie"
        v-for="(cursa, index) in curse"
        :key="index"
        :id="cursa.Circuit.circuitId.replace(/_/g, '')"
        :class="{ cursaCurenta: idCurent === index }"
    >
      <div alt="header" class="flex justify-between text-2xl mb-4 font-bold">
        <p alt="titlu">{{ cursa.round }}. {{ cursa.raceName }}</p>
        <p alt="circuit">
          {{
            cursa.Circuit.circuitId.charAt(0).toUpperCase() +
            cursa.Circuit.circuitId.slice(1).replace(/_/g, " ")
          }}
        </p>
      </div>
      <div alt="data-wrapper" class="text-2xl gap-2 flex flex-col">
        <div alt="FP1" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p class="">FP1</p>
            <p alt="data" class="">{{ formatDate(cursa.FirstPractice.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.FirstPractice, 60).timpul }}
          </p>
        </div>
        <div alt="SprintQuali" v-if="cursa.Sprint" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p class="">SprintQuali</p>
            <p alt="data" class="">{{ formatDate(cursa.SprintQualifying.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.SprintQualifying, 44).timpul }}
          </p>
        </div>
        <div alt="FP2" v-if="!cursa.Sprint" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p>FP2</p>
            <p alt="data">{{ formatDate(cursa.SecondPractice.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.SecondPractice, 60).timpul }}
          </p>
        </div>
        <div alt="Sprint" v-if="cursa.Sprint" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p>Sprint</p>
            <p alt="data">{{ formatDate(cursa.Sprint.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.Sprint, 60).timpul }}
          </p>
        </div>
        <div alt="FP3" v-if="!cursa.Sprint" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p>FP3</p>
            <p alt="data">{{ formatDate(cursa.ThirdPractice.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.ThirdPractice, 60).timpul }}
          </p>
        </div>
        <div alt="Quali" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p>Quali</p>
            <p alt="data">{{ formatDate(cursa.Qualifying.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ formatSession(cursa.Qualifying, 60).timpul }}
          </p>
        </div>
        <div alt="Cursa" class="flex justify-between">
          <div alt="parte-st" class="flex justify-between w-1/2">
            <p>Cursă</p>
            <p alt="data">{{ formatDate(cursa.date) }}</p>
          </div>
          <p alt="timp" class="w-1/2 flex justify-end items-center">
            {{ new Date(cursa.date + "T" + cursa.time).toLocaleTimeString("ro-RO", { timeStyle: "short" }) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref  } from 'vue';

// Reactive state using Composition API
const curse = ref([]);
const hero = ref(null);
const circuitName = ref('');
const round = ref('');
const name = ref('');
const idCurent = ref(0);

// Fetch data on server-side (SSR)
const { data: nextRace } = await useFetch("/api/proxy/get-next" , {
  server: true,
  lazy: false,
});
const cursaActuala = nextRace.value.nr_runda;

useHead({
  title: `Program ${nextRace.value.seasonContext.seasonYear}`
})

// Fetch F1 race data
const { data: raceData } = await useFetch('https://api.jolpi.ca/ergast/f1/2025/races.json?limit=100' , {
  server: true,
  lazy: false,
});
if (raceData.value) {
  curse.value = raceData.value.MRData.RaceTable.Races;

  // Set current race
  for (let i = 0; i < curse.value.length; i++) {
    if (Number(curse.value[i].round) === (cursaActuala + 1)) {
      idCurent.value = i;
    }
  }

  // Set hero race data
  hero.value = curse.value[cursaActuala];
  if (hero.value) {
    circuitName.value = hero.value.Circuit.circuitId.charAt(0).toUpperCase() +
        hero.value.Circuit.circuitId.slice(1).replace(/_/g, " ");
    round.value = hero.value.round;
    name.value = hero.value.raceName;
  }
}

// Utility functions
const formatSession = (session, extraMinutes) => {
  if (!session?.date || !session?.time) return { timpul: '' };

  const startDateTime = new Date(session.date + "T" + session.time);
  const endDateTime = new Date(startDateTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + extraMinutes);

  const formattedDate = startDateTime
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");

  const formattedTime =
      startDateTime.toLocaleTimeString("ro-RO", { timeStyle: "short" }) +
      " - " +
      endDateTime.toLocaleTimeString("ro-RO", { timeStyle: "short" });

  return {
    data: formattedDate,
    timpul: formattedTime
  };
}

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
}

const getItem = (ele) => {
  const element = document.querySelector(`${ele}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: element.offsetTop - 180,
    });
  }
}
</script>

<style scoped>
.animatie {
  transition: transform 300ms ease-in-out;
}
.animatie:hover {
  transform: scale(1.02);
}
.cursaCurenta {
  border-color: red;
}
html {
  scroll-behavior: smooth;
}
</style>