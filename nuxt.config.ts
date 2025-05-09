// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_LINK,
      VITE_API_KEY: process.env.VITE_API_KEY,
      VITE_AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
      VITE_PROJECT_ID: process.env.VITE_PROJECT_ID,
      VITE_STORAGE_BUCKET: process.env.VITE_STORAGE_BUCKET,
      VITE_MESSAGE: process.env.VITE_MESSAGE,
      VITE_APP_ID: process.env.VITE_APP_ID,
      VITE_MEASURE_ID: process.env.VITE_MEASURE_ID,
      VITE_ADMIN_UID: process.env.VITE_ADMIN_UID,
      VITE_CRYPTO_KEY: process.env.VITE_CRYPTO_KEY,
      VITE_CORS: process.env.VITE_CORS,
    }
  },
  // nitro: {
  //   prerender: {
  //     routes: ['/clasament-piloti'],
  //     interval: 3600 // Seconds
  //   }
  // },
  app: {
    head: {
      title: 'Formula1-ro-nuxt | Date despre Formula 1 precum calificari, curse, piloti, echipe',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=0.5' },
        {
          name: 'keywords',
          content:
              'Formula 1, F1, știri F1, clasament F1, calendar Formula 1, echipe F1, piloți F1, rezultate curse, calificări F1, istoria F1, joc de reacție Formula 1'
        },
        {
          name: 'description',
          content:
              'Formula1-ro-nuxt este sursa ta completă de informații despre Formula 1: știri actualizate, programul curselor, rezultate live și clasamente pentru piloți și echipe. Descoperă date din calificări și curse, joacă un joc de reacție pentru fanii F1 și explorează istoria fascinantă a acestui sport. Totul într-un singur loc, în limba română.'
        },
        { name: 'author', content: 'Lucas' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },
})