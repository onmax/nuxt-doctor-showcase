import type { DoctorCheckContext } from '@nuxt/schema'
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
    nuxt.hook('doctor:check', (ctx: DoctorCheckContext) => {
      if (!options.trackingId) {
        ctx.addCheck({
          id: 'ANALYTICS_MISSING_ID',
          name: 'Analytics',
          status: 'error',
          message: 'missing required config',
          source: 'analytics',
          details: [
            'trackingId is required but not set',
            'Add analytics.trackingId to nuxt.config.ts'
          ],
          suggestion: 'Add analytics: { trackingId: "UA-XXXXX-Y" } to nuxt.config.ts',
          url: 'https://analytics.google.com/',
          data: { configKey: 'analytics.trackingId' }
        })
      } else {
        ctx.addCheck({
          name: 'Analytics',
          status: 'success',
          message: `configured (${options.trackingId})`,
          source: 'analytics',
          data: { trackingId: options.trackingId }
        })
      }
    })
  }
})
