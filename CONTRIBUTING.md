# How to contribute to Cozy Home?

Thank you for your interest in contributing to Cozy! There are many ways to contribute, and we appreciate all of them.

## Security Issues

If you discover a security issue, please bring it to our attention right away! Please **DO NOT** file a public issue, instead send your report privately to security AT cozycloud DOT cc.

Security reports are greatly appreciated and we will publicly thank you for it. We currently do not offer a paid security bounty program, but are not ruling it out in the future.

## Bug Reports

While bugs are unfortunate, they're a reality in software. We can't fix what we don't know about, so please report liberally. If you're not sure if something is a bug or not, feel free to file a bug anyway.

Opening an issue is as easy as following [this link][issues] and filling out the fields. Here are some things you can write about your bug:

* A short summary
* What did you try, step by step?
* What did you expect?
* What did happen instead?
* What is the version of the Cozy Drive?

## Pull Requests

Please keep in mind that:

* Pull-Requests point to the `master` branch
* You need to cover your code and feature by tests
* You may add documentation in the `/docs` directory to explain your choices if needed
* We recommend to use [task lists][checkbox] to explain steps / features in your Pull-Request description
* you do _not_ need to build app to submit a PR
* you should update the Transifex source locale file if you modify it for your feature needs (see [Localization section in README][localization])

### Workflow

Pull requests are the primary mechanism we use to change Cozy. GitHub itself has some [great documentation][pr] on using the Pull Request feature. We use the _fork and pull_ model described there.

#### Step 1: Fork

Fork the project on GitHub and [check out your copy locally][forking].

```
$ git clone github.com/cozy/cozy-home.git
$ cd cozy-home
$ git remote add fork git://github.com/yourusername/cozy-home.git
```

#### Step 2: Branch

Create a branch and start hacking:

```
$ git checkout -b my-branch origin/master
```

#### Step 3: Code

Well, we think you know how to do that. Just be sure to follow the coding guidelines from the community ([standard JS][stdjs], comment the code, etc).

#### Step 4: Test

Don't forget to add tests and be sure they are green:

```
$ cd cozy-home
$ npm run test
```

#### Step 5: Commit

Writing [good commit messages][commitmsg] is important. A commit message should describe what changed and why.

#### Step 6: Rebase

Use `git rebase` (_not_ `git merge`) to sync your work from time to time.

```
$ git fetch origin
$ git rebase origin/master my-branch
```

#### Step 7: Push

```
$ git push -u fork my-branch
```

Go to <https://github.com/yourusername/cozy-home> and select your branch. Click the 'Pull Request' button and fill out the form.

Alternatively, you can use [hub] to open the pull request from your terminal:

```
$ git pull-request -b master -m "My PR message" -o
```

Pull requests are usually reviewed within a few days. If there are comments to address, apply your changes in a separate commit and push that to your branch. Post a comment in the pull request afterwards; GitHub doesn't send out notifications when you add commits.

## Writing documentation

Documentation improvements are very welcome. We try to keep a good documentation in the `/docs` folder. But, you know, we are developers, we can forget to document important stuff that look obvious to us. And documentation can always be improved.

## Translations

Localization and translations are handled by [Transifex][tx], which is used by all Cozy's apps.

As a _translator_, you can login to [Transifex][tx-signin] (using your Github account) and claim an access to the [app repository][tx-app]. Transifex will then create pull request on the repository, and the locales are merged after validating the pull request. [This tutorial][tx-start] can help you to learn how to make your first steps here. If you have any question, don't hesitate to ask us!

As a _developer_, you just have to modify json in `/src/locales`. New locales will be automatically added to Transifex. If you need to pull or push manually locales, you can use [Transifex CLI](tx-cli). If you were using a [transifex-client](tx-client), you must move to [Transifex CLI](tx-cli) to be compatible with the v3 API.

## Community

You can help us by making our community even more vibrant. For example, you can write a blog post, take some videos, answer the questions on [the forum][forum], organize new meetups, and speak about what you like in Cozy!

[issues]: https://github.com/cozy/cozy-home/issues/new

[pr]: https://help.github.com/categories/collaborating-with-issues-and-pull-requests/

[forking]: http://blog.campoy.cat/2014/03/github-and-go-forking-pull-requests-and.html

[stdjs]: http://standardjs.com/

[commitmsg]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

[localization]: https://github.com/cozy/cozy-home/blob/master/CONTRIBUTING.md#translations

[hub]: https://hub.github.com/

[tx]: https://www.transifex.com/cozy/
[tx-signin]: https://www.transifex.com/signin/
[tx-app]: https://www.transifex.com/cozy/cozy-home/dashboard/
[tx-cli]: https://developers.transifex.com/docs/cli
[tx-client]: https://github.com/transifex/transifex-client
[tx-start]: https://help.transifex.com/en/articles/6248698-getting-started-as-a-translator

[forum]: https://forum.cozy.io/
