<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4 text-center">
    <h1 class="text-3xl font-bold mb-4">Confirmare Email</h1>
    <p class="mb-6">
      Te rugăm să îți confirmi adresa de email pentru a continua. Verifică inbox-ul și apasă pe link-ul de confirmare si apoi da refresh la pagina(sau apasa F5).
    </p>

    <p class="mb-4 text-sm text-red-600" v-if="user?.email_confirmed_at">
      Email-ul a fost confirmat pe: {{ new Date(user.email_confirmed_at).toLocaleString() }}
    </p>

    <button
        :disabled="!user?.email_confirmed_at"
        @click="goToUpdate"
        class="px-6 py-2 rounded-lg font-semibold transition duration-200"
        :class="user?.email_confirmed_at
        ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
        : 'bg-gray-500 cursor-not-allowed'"
    >
      Mergi la Update Profil
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const supabase = useSupabaseClient()
const user = ref(null)

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()

  if (data?.user) {
    user.value = data.user
  } else {
    console.error(error)
    user.value = null
  }
})

function goToUpdate() {
  navigateTo('/updateprofile')
}
</script>
