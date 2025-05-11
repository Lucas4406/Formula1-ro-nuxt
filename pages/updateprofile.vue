<template>
  <div class="w-full md:w-96 xl:max-w-full mx-auto h-screen mt-4">
    <div class="p-6 border border-gray-300 md:rounded-md">
      <form class="font-xxl text-2xl" @submit.prevent="updateProfil">
        <label class="block mb-6">
          <span class="text-gray-700">First name</span>
          <input
              v-model="primul"
              type="text"
              class="block w-full mt-1 h-8 text-xl border-gray-300 rounded-md shadow-sm"
          />
        </label>
        <label class="block mb-6">
          <span class="text-gray-700">Last name</span>
          <input
              v-model="doilea"
              type="text"
              class="block w-full mt-1 h-8 text-xl border-gray-300 rounded-md shadow-sm"
          />
        </label>
        <label class="block mb-6">
          <span class="text-gray-700">Nickname</span>
          <input
              v-model="nick"
              type="text"
              class="block w-full mt-1 h-8 text-xl border-gray-300 rounded-md shadow-sm"
          />
        </label>
        <label class="block mb-6">
          <span class="text-gray-700">Profile photo</span>
          <input
              v-model="photo"
              type="text"
              class="block w-full mt-1 h-8 text-xl border-gray-300 rounded-md shadow-sm"
              placeholder=" "
          />
        </label>
        <label class="block mb-6">
          <span class="text-gray-700">Country</span>
          <input
              v-model="tara"
              type="text"
              class="block w-full mt-1 h-8 text-xl border-gray-300 rounded-md shadow-sm"
              placeholder=""
          />
        </label>
        <div class="mb-6 flex justify-center items-center">
          <button
              type="submit"
              class="h-10 w-[40%] text-xl px-5 text-indigo-100 bg-indigo-700 rounded-lg hover:bg-indigo-800"
          >
            Save
          </button>
        </div>
        <input type="submit" hidden />
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref, onMounted } from 'vue'
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const primul = ref('')
const doilea = ref('')
const nick = ref('')
const photo = ref('')
const tara = ref('')

async function getDbData(id) {
  const  data  = await $fetch(`/api/proxy/profile/${id}`)
  return data[0]
}

async function updateDb(id) {
  await $fetch(`/api/proxy/profile/change/${id}`, {
    method: 'POST',
    body: {
      firstName: primul.value,
      lastName: doilea.value,
      displayName: nick.value,
      profilePhoto: photo.value,
      country: tara.value,
    },
  })
}

async function updateProfil() {
  if (!user.value) return

  await updateDb(user.value.id)

  // opțional: actualizează metadata dacă ai nevoie
  await supabase.auth.updateUser({
    data: {
      displayName: nick.value,
      profilePhoto: photo.value,
    },
  })

  navigateTo('/profile')
}

onMounted(async () => {
  document.title = 'Schimbă profilul'
  if (!user.value) return

  const profile = await getDbData(user.value.id)

  primul.value = profile.firstName || ''
  doilea.value = profile.lastName || ''
  nick.value = profile.displayName || ''
  photo.value = profile.profilePhoto || ''
  tara.value = profile.country || ''
})
</script>
