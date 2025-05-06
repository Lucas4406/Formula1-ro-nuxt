// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: "vercel"
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_LINK
    }
  },
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
        { rel: 'icon', href: '/logo-f1.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },
})