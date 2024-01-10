## Develop

### Install and run in dev mode

First, you need [setup a dev environment][setup].

You can then clone the app repository and install dependencies:

```sh
$ git clone https://github.com/cozy/cozy-home.git
$ cd cozy-home
$ yarn install
$ yarn start
```

[setup]: https://docs.cozy.io/en/tutorials/app/#install-the-development-environment "Cozy dev docs: Set up the Development Environment"

### Flagship mode

If you want to simulate flagship environment, you can edit the `__SIMULATE_FLAGSHIP__` var in the `webpack.config.cozy-home.js`. It'll simulate a splashscreen during the loading of the application and simulate a call to `hideSplashscreen`. 