export default defineNuxtConfig({
  modules: [
    '@nuxt/a11y',
    './modules/analytics',  // Local module with missing config
  ],
  compatibilityDate: '2024-11-01',
  
  // A11y config - report mode shows violations
  a11y: {
    enabled: false,
    report: { enabled: true }
  },

  // Analytics config - intentionally missing trackingId to show error
  // analytics: {
  //   trackingId: 'UA-XXXXX-Y'
  // },

  // Experimental feature that triggers a warning
  experimental: {
    viewTransition: true
  }
})
