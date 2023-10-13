export default defineNuxtConfig({
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
  nitro: {
    preset: 'firebase'
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
    "@vueuse/nuxt",
    ['@pinia/nuxt', { autoImports: ["defineStore", "acceptHMRUpdate"], },]
  ],
  imports: {
    dirs: ['stores'],
  },
});
