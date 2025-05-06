<script setup lang="ts">

</script>

<template>
  <div id="nav">
    <Navbar />
  </div>
  <main id="main-content">
      <slot />
  </main>
  <div id="footer">
    <Footer />
  </div>
</template>

<style>
@import "@/assets/main.css";
@import "@/components/css/navbar.css";
</style>