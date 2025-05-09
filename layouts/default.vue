<script setup lang="ts">
provideHeadlessUseId(() => useId())
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
@import "@/assets/darkMode.scss";
.heightt {
  height: calc(100vh - 142px);
}
.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: red;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>