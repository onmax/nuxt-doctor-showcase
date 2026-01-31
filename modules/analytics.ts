import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'analytics',
    configKey: 'analytics'
  },
  defaults: {
    trackingId: undefined as string | undefined
  },
  setup(options, nuxt) {
    // Doctor hook - check for missing config
    nuxt.hook('doctor:check', (ctx: any) => {
      if (!options.trackingId) {
        ctx.addCheck({
          name: 'Analytics',
          status: 'error',
          message: 'missing required config',
          source: 'analytics',
          details: [
            'trackingId is required but not set',
            'Add analytics.trackingId to nuxt.config.ts'
          ]
        })
      } else {
        ctx.addCheck({
          name: 'Analytics',
          status: 'success', 
          message: `configured (${options.trackingId})`,
          source: 'analytics'
        })
      }
    })
  }
})
