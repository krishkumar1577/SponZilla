require('dotenv').config();
const Sentry = require('@sentry/node');

const dsn = process.env.SENTRY_DSN || 'https://f05f5a233908900d6535a9f1eb41cf26@o4511573599453184.ingest.de.sentry.io/4511573627830352';

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  sendDefaultPii: true
});

module.exports = Sentry;
