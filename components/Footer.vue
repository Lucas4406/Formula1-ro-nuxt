<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const dbUser = ref({})
const profilePic = ref(false)

// Funcție pentru a lua datele din API
async function getDbData(id) {
  const  data  = await $fetch(`/api/proxy/profile/${id}`)
  return data[0]
}

// Ia datele doar dacă user-ul e încărcat
watchEffect(async () => {
  if (user.value?.id) {
    dbUser.value = await getDbData(user.value.id)
  }
  if(dbUser.value.profilePhoto){
    profilePic.value = true
  }
})
const logout = async () => {
  await client.auth.signOut()
  user.value = null
  window.location.href = '/'
}
const isLoggedIn = computed(() => !!user.value)
</script>

<template>
  <div class="bg-black text-red-500 px-6 py-4 sm:py-10 sm:px-10">
    <div class="flex flex-col lg:flex-row justify-between items-center gap-6">

<!--      LOGIN / PROFIL -->
      <div v-if="!isLoggedIn" class="flex gap-4">
        <NuxtLink to="/login" class="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400 transition">Log In</NuxtLink>
        <NuxtLink to="/signup" class="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400 transition">Sign Up</NuxtLink>
      </div>

      <div v-else class="flex items-center gap-4 bg-white text-gray-700 px-4 py-3 rounded-lg shadow">
        <NuxtLink to="/profile">
          <img
              class="w-14 h-14 rounded-full border object-cover"
              :src="dbUser.profilePhoto"
              alt="profile-pic"
              v-if="profilePic"
          />
        </NuxtLink>
        <div class="flex flex-col">
          <div class="text-md font-semibold">{{ dbUser.displayName }}</div>
          <div class="text-sm text-gray-500">{{ dbUser.email }}</div>
        </div>
        <div class="flex gap-2 ml-4">
          <NuxtLink to="/profile" class="p-2 rounded bg-red-500 hover:bg-red-400 transition">
            <svg class="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="16" cy="16" r="15" />
              <circle cx="16" cy="11" r="6" />
              <path d="M26 27c0-5.5-4.5-10-10-10S6 21.5 6 27" />
            </svg>
          </NuxtLink>
          <button @click="logout" class="p-2 rounded bg-red-500 hover:bg-red-400 transition border-0 cursor-pointer" >
            <svg class="w-6 h-6 text-white" viewBox="0 0 1024 1024" fill="currentColor">
              <path
                  d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- INFO LEGAL & COPYRIGHT -->
      <div class="flex flex-col items-center lg:items-end text-center lg:text-right gap-2">
        <p class="text-white text-sm sm:text-base">© 2025 Formula1-ro | F1 știri & date</p>
        <div class="flex gap-4 text-white text-sm sm:text-base underline">
          <NuxtLink to="/surse" class="text-white">Surse</NuxtLink>
          <a href="https://www.termsfeed.com/live/5008d345-1123-4ce3-b36a-11a869a8a60c" class="text-white" target="_blank">Privacy Policy</a>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.text-xxs {
  font-size: 0.7em;
}
.router-link-exact-activ {
  opacity: 1;
}
.router-link-activ {
  opacity: 1;
}
</style>