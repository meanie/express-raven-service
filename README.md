# meanie-express-raven-service

## Deprecated

This package has been deprecated in favour of using a simple initialisation script for error handling and using Raven directly:

```js
'use strict';

/**
 * Dependencies
 */
const raven = require('raven');
const {SENTRY_DSN, SENTRY_CONFIG} = require('./config');

//Use sentry
if (SENTRY_DSN) {

  //Get config
  const config = Object.assign({
    environment: process.env.APP_ENV || process.env.NODE_ENV,
  }, SENTRY_CONFIG);

  //Create callback
  const cb = function() {
    console.log('Exiting due to uncaught exception');
    process.exit(1);
  };

  //Configure
  raven
    .config(SENTRY_DSN, config)
    .install(cb);
}
```

Then later just use Raven directly:

```js
const raven = require('raven');
raven.captureException(error, data);
```

Or make use of the `trackWithSentry` middleware from [@meanie/express-error-handling](https://www.npmjs.com/package/@meanie/express-error-handling).

## License
(MIT License)

Copyright 2016-2017, [Adam Reis](https://adam.reis.nz)
