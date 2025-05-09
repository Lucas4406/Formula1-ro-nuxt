// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts', '@pinia/nuxt', '@nuxtjs/supabase' , 'nuxt-headlessui'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/*'],
    },
  },
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
  generate: {
    routes: ['/istorie'],  // Aici poți lista rutele care trebuie să fie statice
  },
  app: {
    head: {
      charset: 'UTF-8',
      title: 'Formula1-ro-nuxt | Date despre Formula 1 precum calificari, curse, piloti, echipe',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=0.5' },
        { name: 'keywords', content: 'Formula 1, F1, știri F1, clasament F1, calendar Formula 1, echipe F1, piloți F1, rezultate curse, calificări F1, istoria F1, joc de reacție Formula 1, Formula 1 romania, F1 RO, formula1 ro, formula1 romania, program f1' },
        { name: 'description', content: 'Formula1-ro este sursa ta completă de informații despre Formula 1: știri actualizate, programul curselor, rezultate live și clasamente pentru piloți și echipe. Descoperă date din calificări și curse, joacă un joc de reacție pentru fanii F1 și explorează istoria fascinantă a acestui sport. Totul într-un singur loc, în limba română.' },
        { name: 'author', content: 'Lucas' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'language', content: 'Romanian' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'geo.region', content: 'RO' },
        { name: 'geo.placename', content: 'Romania' },
        { name: 'geo.position', content: '46.00;25.00' },
        { name: 'ICBM', content: '46.00, 25.00' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.beta.formula1-ro.tech' },
        { property: 'og:title', content: 'Formula1-ro - Știri, clasificari si rezultate actualizate permanent' },
        { property: 'og:description', content: 'Formula1-ro este sursa ta completă de informații despre Formula 1' },
        { property: 'og:image', content: 'https://www.beta.formula1-ro.tech/favicon.ico' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://www.beta.formula1-ro.tech' },
        { property: 'twitter:title', content: 'Formula1-ro - Știri, clasificari si rezultate actualizate permanent' },
        { property: 'twitter:description', content: 'Formula1-ro este sursa ta completă de informații despre Formula 1' },
        { property: 'twitter:image', content: 'https://www.beta.formula1-ro.tech/favicon.ico' },
        { name: 'canonical', href: 'https://www.beta.formula1-ro.tech' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap', rel: 'preload', as: 'style' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Formula1-ro",
            "url": "https://www.beta.formula1-ro.tech",
            "author": {
              "@type": "Person",
              "name": "Lucas"
            },
            "inLanguage": "ro"
          })
        }
      ]
    }
  }
})