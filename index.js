'use strict';

/**
 * Dependencies
 */
const Raven = require('raven');

//Initialize client
let client = null;

//Export configuring function that returns the client
module.exports = function(DSN, config, cb) {

  //No config passed and no client initialized yet?
  if (!client && !DSN) {
    throw new Error(
      'Trying to use Raven without having initialized it. Please call ' +
      'the service with a Sentry DSN parameter first.'
    );
  }

  //Initialize
  if (DSN) {

    //Extract config params
    config = config || {};

    //Use node environment if not specified
    if (!config.environment) {
      config.environment = process.env.NODE_ENV;
    }

    //Use default install callback if none provided
    cb = cb || function() {
      console.log('Exiting due to uncaught exception');
      process.exit(1);
    };

    //Configure
    Raven.config(DSN, config).install(cb);

    //Set client
    client = Raven;
  }

  //Return client
  return client;
};
