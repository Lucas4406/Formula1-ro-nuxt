<template>
  <div v-if="show">
    <div class="stiri">
      <div class="titlu">
        <div>
          <img src="/checker.webp" class="titlu-poza" alt="chequered flag" />
        </div>
        <div class="titlu-text">Știri de ultimă oră</div>
        <div>
          <img src="/checker.webp" class="titlu-poza" alt="chequered flag" />
        </div>
      </div>
    </div>
    <div class="content-grid">
      <a
          :href="stire.link"
          v-for="stire in news"
          v-bind:key="stire.id"
          class="ltag"
          target="_blank"
      >
        <article class="stire">
          <div class="content-row">
            <div class="content-text">
              <p class="text" id="stiretext">{{ stire.titlu }}</p>
            </div>
            <div class="content-photo">
              <lazy-nuxt-img
                  :src="stire.poza"
                  class="photo"
                  id="stirephoto"
              />
              <span class="sr-only">{{ stire.titlu }}</span>
            </div>
          </div>
        </article>
      </a>
    </div>
  </div>
</template>

<script setup>
const show = ref(false)

// folosim `useState` ca un cache per request (SSR friendly)
const cachedNews = useState('news-cache', () => null)

if (!cachedNews.value) {
  const { data: newsData } = await useFetch(`${useRuntimeConfig().public.apiBaseUrl}/mongo/stiri/6`)
  cachedNews.value = newsData.value
}

const news = cachedNews.value

if (news && news.length > 0) {
  show.value = true
}
</script>

<style scoped>
.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

</style>
