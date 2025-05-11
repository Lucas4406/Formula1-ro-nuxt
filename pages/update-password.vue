<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-4 text-center">Schimbă Parola</h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Parola veche</label>
          <input
              v-model="oldPassword"
              type="password"
              required
              class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Parola nouă</label>
          <input
              v-model="newPassword"
              type="password"
              required
              class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Confirmă parola nouă</label>
          <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full border px-3 py-2 rounded"
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-sm mb-2">Parola a fost schimbată cu succes.</p>

        <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Actualizează parola
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = false

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Parolele noi nu coincid.'
    return
  }

  // Validare veche parolă
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: user.value.email,
    password: oldPassword.value
  })

  if (loginError) {
    error.value = 'Parola veche este incorectă.'
    return
  }

  // Update parola
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword.value
  })

  if (updateError) {
    error.value = updateError.message
    return
  }
  await supabase.auth.signOut()
  window.location.href = '/'

  success.value = true
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>
