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

If you want to simulate flagship environment, you can add the `PUBLIC_SIMULATE_FLAGSHIP=true` var and uncomment code in `index.ejs` before running `yarn build`. It'll simulate a splashscreen during the loading of the application and simulate a call to `hideSplashscreen`.
