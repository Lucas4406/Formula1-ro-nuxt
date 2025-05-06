// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_LINK
    }
  },
  app: {
    head: {
      title: 'Formula1-ro', // default fallback title
      htmlAttrs: {
        lang: 'ro',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo-f1.ico' },
      ]
    }
  }
})