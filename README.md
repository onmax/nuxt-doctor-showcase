# Nuxt Doctor Showcase

Demo project showcasing `nuxt doctor` - a diagnostic command for Nuxt projects.

> **Note:** Uses `nuxi` from [nuxt/cli#1206](https://github.com/nuxt/cli/pull/1206) via pkg.pr.new and a patched `@nuxt/a11y` to demonstrate the `doctor:check` hook.

## Usage

```bash
git clone https://github.com/onmax/nuxt-doctor-showcase
cd nuxt-doctor-showcase
pnpm install
pnpm doctor
```

> **Note:** If `pnpm install` fails, wait for CI to publish via [pkg.pr.new](https://pkg.pr.new/nuxi@1206).

## Output

```
┌  Running diagnostics...
│
│  [✓] Versions - Node v24.12.0, Nuxt 4.3.0
│
│  [!] Config - 1 issue found
│      → experimental.viewTransition enabled - may affect SSR
│
│  [✓] Modules - 10 modules loaded
│      → @nuxt/a11y@1.0.0-alpha.1
│      → analytics
│      → @nuxt/devtools@3.1.1
│      → ...
│
│  [✗] A11y (via @nuxt/a11y) - 10 violations (3 critical, 5 serious)
│      → [critical] image-alt: Images must have alternate text (3 elements)
│      → [serious] color-contrast: Elements must have sufficient color contrast (5 elements)
│      → [moderate] link-name: Links must have discernible text (2 elements)
│
│  [✗] Analytics (via analytics) - missing required config
│      → trackingId is required but not set
│      → Add analytics.trackingId to nuxt.config.ts
│
└  Diagnostics complete with errors
```

## How it works

1. **Core checks** - Built into nuxi:
   - Versions (Node/Nuxt)
   - Config validation (deprecated options, misconfigurations)
   - Module compatibility

2. **Module hooks** - Modules contribute via `doctor:check`:
   ```ts
   nuxt.hook('doctor:check', (ctx) => {
     ctx.addCheck({
       name: 'MyModule',
       status: 'warning', // 'success' | 'warning' | 'error'
       message: 'something is wrong',
       source: 'my-module',
       details: ['detail 1', 'detail 2']
     })
   })
   ```

## Files

- `modules/analytics.ts` - Local module demonstrating config validation
- `patches/@nuxt__a11y*.patch` - Adds doctor hook to @nuxt/a11y (demo)

## Related

- [nuxt/cli#1205](https://github.com/nuxt/cli/issues/1205) - Original issue
- [nuxt/cli#1206](https://github.com/nuxt/cli/pull/1206) - Implementation PR
- [nuxt/a11y PR](#) - Add doctor hook to @nuxt/a11y (pending)
