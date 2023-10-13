export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/nuxt-storage', ssr: false }],
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/global.css" as *;',
        },
      },
    },
  },
  app: {
    pageTransition: { name: 'v', mode: 'out-in' },
    head: {
      title: "Type Safer",
    },
  },
  css: ["~/assets/global.css", "animate.css/animate.min.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    ['@pinia/nuxt', { autoImports: ["defineStore", "acceptHMRUpdate"], },]
  ],
  imports: {
    dirs: ['stores'],
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
});
