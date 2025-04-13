import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://a703a4a1139e42a81a1f19edc87941d3@o4509143628775425.ingest.us.sentry.io/4509143629037568',

  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})
