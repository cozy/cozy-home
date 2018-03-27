# Cozy Collect Services

## Overview

Application may require background and offline process to analyse the user’s data and emit some notification or warning even without the user being on the application. These part of the application are called services.

In contrast to [konnectors](https://cozy.github.io/cozy-stack/konnectors.html), services have the same
permissions as the web application and are not intended to collect outside
informations but rather analyse the current set of collected information
inside the cozy. However they share the same mechanisms as the konnectors to
describe how and when they should be executed: via our trigger system.

When running a service, the stack will provide some environment variables which are:
- `COZY_URL` : url of the cozy instance
- `COZY_CREDENTIALS`: token which will gave the same permissions as the related application (necessary to communicate with the stack)
- `COZY_TYPE`: `node` since the service is a node script
- `COZY_LOCALE`: the locale/language of the cozy instance (user preference)

This document outlines the services available in Cozy Collect.

## Glossary

- **Service**: The script defined to be run on background by the stack with the same permisions than its related application. :warning: The service here is completly different from the service term used for intents.
- **Stack**: refers to [cozy-stack](https://github.com/cozy/cozy-stack/), the server-side part of the Cozy infrastructure.
- **Trigger**: A trigger is in charge of running jobs for a specific konnector accounts. Each account has a unique trigger and each trigger can have several jobs.
- **Job**: a job is a unique script running. The job is run only once, relaunching the trigger will create a new job.

## Services availables

### Trigger bouncing

This service will check all konnector jobs to detect if a trigger have to be relaunch automatically by the service or not.

For each trigger found:
- If there is only one last errored job, the trigger will be relaunched after one hour.
- If there are exactly two last errored jobs, the trigger will be relaunched after one day.
- For other cases (success or more than 2 errors), the trigger won't be relaunched, it will be in charge of the user.
- Here are error exceptions which are not took in account during this process since they are waiting a manipulation from the user:
    - `LOGIN_FAILED`
    - `USER_ACTION_NEEDED`


#### Manifest

The service is defined in the [`manifest.webapp`](https://github.com/cozy/cozy-collect/blob/master/manifest.webapp) and is configured to run hourly by the stack.

```json
  "services": {
    "trigger-bouncing": {
      "type": "node",
      "file": "/services/triggerBouncing.js",
      "trigger": "@cron 0 0 * * * *"
    }
  }
```
(See [cozy stack services](https://cozy.github.io/cozy-stack/apps.html#services) section for more informations)

#### Service

In collect, the service need a client to get jobs and relaunch triggers. For that, a custom `cozyFetch` is implemented in `src/lib/services/cozyFetch.js`.
It will need the following environment variables in production: `process.env.COZY_URL` and `process.env.COZY_CREDENTIALS`.

#### Development

To develop or run the service using your local cozy instance, the best way is to `yarn watch` the application.

```
yarn watch
```
It allows the service code to be transpiled. You may also run directly your service without transpiling it if it does not require application internal code, which may use for example some `import` instructions.

For `triggerBouncing` and `cleanOrphanAccount` services, which both use `cozyFetch` you need an app token to have the permission to request the stack. To generate a token with the same permissions than the application (here `collect` for `cozy.tools:8080`), you have to use the following command:
```
cozy-stack instances token-app cozy.tools:8080 collect
```
> Be aware that the token will expire after a short time.

`cozyFetch` will use two process environment variables: `COZY_URL` and `COZY_CREDENTIALS`. `COZY_URL` is the url of your cozy stack. In the most of case `http://cozy.tools:8080` (don't forget the `http` protocol), and `COZY_CREDENTIALS` is your previously generated token.


So to run the `triggerBouncing` service for example, run:
```
COZY_URL=http://cozy.tools:8080 COZY_CREDENTIALS=<your_token> node build/services/triggerBouncing.js
```
or even better:
```
COZY_URL=http://cozy.tools:8080 COZY_CREDENTIALS=$(cozy-stack instances token-app cozy.tools:8080 collect) node build/services/triggerBouncing.js
```
