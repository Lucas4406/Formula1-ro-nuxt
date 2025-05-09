<script setup lang="js">
import { onMounted } from 'vue'
const user = useSupabaseUser()
const isLoggedIn = computed(() => !!user.value)
onMounted( () => {
  // Dropdown logic
  document.addEventListener("click", (e) => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

    let currentDropdown
    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle("active")
    }

    document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
  })

  // Scroll logic for header
  const header = document.getElementById("header")
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 30)
    })
  }
})
</script>

<template>
  <div class="header" id="header">
    <div class="sus">
      <div class="logo">
        <Nuxt-link to="/" class="link-router"
        ><img src="./icons/ferrari.avif" class="logo-f1" alt="logo site F1"
        /></Nuxt-link>
<!--        <div class="fia peste" v-if="isLoggedIn" v-once>-->
<!--          <profileBadge />-->
<!--        </div>-->
      </div>
    </div>
    <div class="bar">
      <div class="buton">
        <Nuxt-link to="/program" class="link-router">Program</Nuxt-link>
      </div>
      <div class="buton">
        <Nuxt-link to="/echipe" class="link-router">Echipe</Nuxt-link>
      </div>
      <div class="buton" id="buton-dpd" data-dropdown>
        <p style="color: red; margin: 0" data-dropdown-button>Clasament</p>
        <div class="dropdown-menu">
          <Nuxt-link to="/clasament-echipe" class="text-dropdown"
          >Echipe</Nuxt-link
          >
          <Nuxt-link to="/clasament-piloti" class="text-dropdown"
          >Piloți</Nuxt-link
          >
        </div>
      </div>
      <div class="buton" id="buton-dpd" data-dropdown>
        <p style="color: red; margin: 0" data-dropdown-button>Rezultate</p>
        <div class="dropdown-menu">
          <Nuxt-link to="/rezultate-curse/2025" class="text-dropdown"
          >Curse</Nuxt-link
          >
          <Nuxt-link to="/rezultate-calificari/2025" class="text-dropdown"
          >Calificări</Nuxt-link
          >
        </div>
      </div>
      <div class="buton" id="buton-dpd" data-dropdown>
        <img
            src="../components/icons/hamburger.svg"
            class="w-20 h-10"
            data-dropdown-button
            alt="icon hamburger meniu"
        />
        <div class="dropdown-menu">
          <Nuxt-link to="/joc" class="text-dropdown-right">Joc</Nuxt-link>
          <Nuxt-link
              to="/istorie"
              class="text-dropdown-right"
          >Istorie</Nuxt-link
          >
          <Nuxt-link
              v-if=!isLoggedIn
              to="/login"
              class="text-dropdown-right"
          >Login</Nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./css/navbar.css";
.peste {
  z-index: 999;
}
</style>