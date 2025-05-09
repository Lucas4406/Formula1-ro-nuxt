<template>
  <Menu as="div" class="relative ml-3 cursor-pointer">
    <div>
      <MenuButton
          class="flex rounded-full bg-transparent border-none text-md cursor-pointer menub"
      >
        <img
            class="h-14 w-14 rounded-full profimage object-cover"
            :src="dbUser.profilePhoto"
            :alt="`Poza de profil ${dbUser.displayName}`"
        />
      </MenuButton>
    </div>
    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
          class="text-xl absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-black ring-opacity-5 focus:outline-none peste dmode"
      >
        <MenuItem v-slot="{ active }">
          <NuxtLink
              to="/profile"
              :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-md text-gray-700',
            ]"
              class="peste"
          >Profil</NuxtLink
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <NuxtLink
              to="/updateprofile"
              :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-md text-gray-700',
            ]"
              class="peste"
          >Schimbă profilul</NuxtLink
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <p
              :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-md text-gray-700',
            ]"
              class="border-none peste"
              @click="logout"
          >
            Sign out
          </p>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
const user = useSupabaseUser()
const client = useSupabaseClient()
const dbUser = ref({})

// Funcție pentru a lua datele din API
async function getDbData(id) {
  const  data  = await $fetch(`${useRuntimeConfig().public.apiBaseUrl}/profile/${id}`)
  return data[0]
}

// Ia datele doar dacă user-ul e încărcat
watchEffect(async () => {
  if (user.value?.id) {
    dbUser.value = await getDbData(user.value.id)
  }
})

// Logout
const logout = async () => {
  await client.auth.signOut()
  user.value = null
  window.location.href = '/'
}
</script>

<style scoped>
.menub:hover img {
  transform: scale(1.1);
}
.profimage {
  transition: transform 200ms ease-in-out;
}
.peste {
  z-index: 9999;
}
</style>
