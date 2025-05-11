<template>
  <div class="w-screen flex justify-center items-center min-h-screen flex-col">
    <div class="relative max-w-md mx-auto md:max-w-2xl bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
      <div class="px-6">
        <div class="flex flex-wrap justify-center">
          <div class="w-full flex justify-center">
            <div class="relative">
              <img
                  :src="userData?.profilePhoto"
                  class="shadow-xl rounded-full absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  :alt="`Poza de profil ${userData?.displayName}`"
              />
            </div>
          </div>
          <div class="w-full text-center mt-20">
            <div class="flex justify-center lg:pt-4 pt-8 pb-0">
              <div class="p-3 text-center">
                <span class="text-xl font-bold uppercase text-slate-700">{{ userData?.lastName }}</span>
                <span class="text-sm text-slate-400">Last Name</span>
              </div>
              <div class="p-3 text-center">
                <span class="text-xl font-bold uppercase text-slate-700">{{ userData?.firstName }}</span>
                <span class="text-sm text-slate-400">First Name</span>
              </div>
              <div class="p-3 text-center">
                <span class="text-xl font-bold uppercase text-slate-700">{{ userData?.country }}</span>
                <span class="text-sm text-slate-400">Țară</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-2">
          <h3 class="text-2xl text-slate-700 font-bold mb-1">{{ userData?.displayName }}</h3>
          <div class="text-xs text-slate-400 font-bold uppercase">
            <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{{ userData?.email }}
          </div>
        </div>
        <div class="mt-6 py-6 border-t border-slate-200 text-center">
          <div class="flex justify-center gap-4">
            <a @click="logout" class="text-slate-700 hover:text-slate-400 cursor-pointer">Log Out</a>
            <NuxtLink to="/updateprofile" class="text-slate-700 hover:text-slate-400 cursor-pointer">Update Profil</NuxtLink>
            <NuxtLink to="/update-password" class="text-slate-700 hover:text-slate-400 cursor-pointer">Schimbă parola</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSelect" class="text-xl flex flex-row gap-2 items-center justify-center">
      <div class="flex gap-2 items-center">
        <label for="echipaPref">Echipa favorita:</label>
        <select id="echipaPref" v-model="echipaPref" class="selectie">
          <option v-for="echipa in echipeArray" :key="echipa" :value="echipa">{{ echipa }}</option>
        </select>
      </div>
      <div class="flex gap-2 items-center">
        <label for="soferPref">Pilotul favorit:</label>
        <select id="soferPref" v-model="soferPref" class="selectie">
          <option v-for="sofer in soferiArray" :key="sofer" :value="sofer">{{ sofer }}</option>
        </select>
        <button @click="updateDb" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Submit
        </button>
      </div>
    </div>

    <div class="flex h-[20rem] items-center justify-center my-6 gap-4">
      <ConstructorCard v-if="bla" :team="favArr" :darkMode="darkMode" class="sm:w-[20rem]" />
      <PilotCard v-if="driverOk" :pilot="favDriv" :darkMode="darkMode" class="sm:w-[25rem]" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref, onMounted } from 'vue'
// import ConstructorCard from '~/components/ConstructorCard.vue'
// import PilotCard from '~/components/PilotCard.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const userData = ref(null)
const echipaPref = ref('')
const soferPref = ref('')
const echipeArray = ref([])
const soferiArray = ref([])
const darkMode = ref(false)
const showSelect = ref(false)
const bla = ref(false)
const driverOk = ref(false)
const favArr = ref([])
const favDriv = ref([])

async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/'
}

async function getProfile() {
  const  data  = await $fetch(`/api/proxy/profile/${user.value.id}`)
    userData.value = data[0]
    echipaPref.value = data[0].favTeam
    soferPref.value = data[0].favDriver
}

async function getDataFull() {
  const teams = await $fetch(`/api/proxy/mongo/teams/all`)
  echipeArray.value = teams.map(t => t.name)
}

async function getAllDrivers() {
  const piloti = await $fetch(`/api/proxy/mongo/piloti?order=asc`)
  soferiArray.value = piloti.map(p => `${p.primulNume} ${p.alDoileaNume}`)
}

async function favoriteTeam() {
  const favShort = echipaPref.value?.substring(0, 4)
  const echipe = await $fetch('https://api.jolpi.ca/ergast/f1/current/constructorstandings.json')
  const arr = echipe.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const found = arr.find(e => e.Constructor.name.includes(favShort))
  if (found) {
    favArr.value = found
    bla.value = true
  }
}

async function getFavDriver() {
  const data = await $fetch(`/api/proxy/mongo/piloti/${soferPref.value}`)
  favDriv.value = data[0]
  driverOk.value = true
}

async function updateDb() {
  try {
    await $fetch(`/api/proxy/profile/change/team/${user.value.id}`, {
      method: "POST",
      body: {
        favTeam: echipaPref.value,
        favDriver: soferPref.value,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Eroare la actualizarea profilului:", error);
  }
}

onMounted(async () => {
  await getProfile()
  await getAllDrivers()
  await getDataFull()
  showSelect.value = true

  if (echipaPref.value) await favoriteTeam()
  if (soferPref.value) await getFavDriver()
})
</script>


<style scoped>
@import "@/assets/formSelect-curse.css";
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>