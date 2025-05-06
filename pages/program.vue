<template>
  <div>
    <!-- Cursa Următoare -->
    <div
        v-if="show"
        class="mt-6 flex justify-center w-screen sm:mb-6 lg:mb-0"
        id="hero"
        alt="hero"
    >
      <div
          class="border-red-500 border-2 border-solid sm:max-w-xl sm:w-xl lg:max-w-4xl lg:w-4xl p-4 rounded-md w-[100%] animatie"
      >
        <div
            style="text-decoration: none; color: black"
            @click="getItem(`#${circuitName.replace(/\s/g, '').toLocaleLowerCase()}`)"
        >
          <div alt="header" class="flex justify-between text-2xl mb-4 font-bold">
            <p>{{ round }}. {{ name }}</p>
            <p>{{ circuitName }}</p>
          </div>

          <div alt="data-wrapper" class="text-2xl gap-2 flex flex-col">
            <div v-for="session in sesiuni" :key="session.nume" class="flex justify-between">
              <div class="flex justify-between w-[50%]">
                <p>{{ session.nume }}</p>
                <p>{{ session.data }}</p>
              </div>
              <p class="w-[50%] flex justify-end items-center">
                {{ session.interval }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Grid -->
    <div
        alt="card-grid"
        class="lg:grid lg:grid-cols-2 md:grid-cols-1 lg:px-14 lg:p-6 lg:gap-6 sm:justify-center sm:flex sm:flex-col sm:gap-6"
    >
      <div
          v-for="(cursa, index) in curse"
          :key="index"
          :id="cursa.Circuit.circuitId.replace(/_/g, '')"
          :class="['border-black border-2 border-solid sm:max-w-xl lg:max-w-4xl p-4 sm:ml-20 md:ml-24 lg:ml-0 rounded-md animatie', { cursaCurenta: idCurent === index }]"
      >
        <div class="flex justify-between text-2xl mb-4 font-bold">
          <p>{{ cursa.round }}. {{ cursa.raceName }}</p>
          <p>{{ formatCircuit(cursa.Circuit.circuitId) }}</p>
        </div>

        <div class="text-2xl gap-2 flex flex-col">
          <div
              v-for="(item, i) in sesiuniCursa(cursa)"
              :key="i"
              class="flex justify-between"
          >
            <div class="flex justify-between w-[50%]">
              <p>{{ item.nume }}</p>
              <p>{{ item.data }}</p>
            </div>
            <p class="w-[50%] flex justify-end items-center">
              {{ item.interval }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch, useState } from '#app'

// SSR & caching pentru cursele din 2025
const { data: curse, refresh } = await useFetch('/api/curse2025', {
  key: 'curse-2025',
  server: true,
  lazy: false,
  default: () => [],
})

// SSR pentru cursa actuală (get-next)
const { data: rundaActuala } = await useFetch('/api/runda-actuala', {
  key: 'runda-actuala',
  server: true,
  lazy: false,
})

// Variabile
const show = ref(false)
const hero = ref({})
const round = ref('')
const name = ref('')
const circuitName = ref('')
const idCurent = ref(0)

// După ce avem cursele, setăm hero-ul
if (curse.value.length && rundaActuala.value?.nr_runda !== undefined) {
  const index = rundaActuala.value.nr_runda
  hero.value = curse.value[index]
  round.value = hero.value.round
  name.value = hero.value.raceName
  circuitName.value = formatCircuit(hero.value.Circuit.circuitId)
  show.value = true

  // Caută următoarea cursă (cu +1)
  for (let i = 0; i < curse.value.length; i++) {
    if (Number(curse.value[i].round) === index + 1) {
      idCurent.value = i
      break
    }
  }
}

// Funcții utilitare
function formatSession(session, extraMinutes = 60) {
  if (!session?.date || !session?.time) return null
  const start = new Date(session.date + 'T' + session.time)
  const end = new Date(start)
  end.setMinutes(end.getMinutes() + extraMinutes)

  return {
    data: start.toLocaleDateString('ro-RO'),
    interval:
        start.toLocaleTimeString('ro-RO', { timeStyle: 'short' }) +
        ' - ' +
        end.toLocaleTimeString('ro-RO', { timeStyle: 'short' }),
  }
}

function formatCircuit(circuitId) {
  return circuitId.charAt(0).toUpperCase() + circuitId.slice(1).replace(/_/g, ' ')
}

function sesiuniCursa(cursa) {
  const sesiuni = []
  if (cursa.FirstPractice) sesiuni.push({ nume: 'FP1', ...formatSession(cursa.FirstPractice) })
  if (!cursa.Sprint && cursa.SecondPractice)
    sesiuni.push({ nume: 'FP2', ...formatSession(cursa.SecondPractice) })
  if (cursa.SprintQualifying)
    sesiuni.push({ nume: 'SprintQuali', ...formatSession(cursa.SprintQualifying, 44) })
  if (cursa.Sprint) sesiuni.push({ nume: 'Sprint', ...formatSession(cursa.Sprint) })
  if (!cursa.Sprint && cursa.ThirdPractice)
    sesiuni.push({ nume: 'FP3', ...formatSession(cursa.ThirdPractice) })
  if (cursa.Qualifying)
    sesiuni.push({ nume: 'Quali', ...formatSession(cursa.Qualifying) })
  if (cursa.date && cursa.time) {
    sesiuni.push({
      nume: 'Cursă',
      data: new Date(cursa.date).toLocaleDateString('ro-RO'),
      interval: new Date(cursa.date + 'T' + cursa.time).toLocaleTimeString('ro-RO', {
        timeStyle: 'short',
      }),
    })
  }
  return sesiuni
}

const sesiuni = computed(() => sesiuniCursa(hero.value))

function getItem(ele) {
  const el = document.querySelector(ele)
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 180,
      behavior: 'smooth',
    })
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
</style>
