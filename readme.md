# Wuxing Calendar

Based on [Wuxing Five Phases](<https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)>) concept, I built an hour, solar and lunar calendars

## Structure

This monorepo is divided in two packages

### [five phases](./five-phases/readme.md)

core API that given an object `Date` calculate hour, solar and lunar phases

### [Web](./web/readme.md) [![Netlify Status](https://api.netlify.com/api/v1/badges/1dec2e62-3301-428e-8b9a-0cfbc6d02f0e/deploy-status)](https://app.netlify.com/sites/upbeat-jennings-4cf80f/deploys)

[React][react] app that service an interface for [five phases](./five-phases/readme.md) API, published in [https://calendar.pataruco.com][site]

## Installation

1. Clone this repo

   ```sh
   git clone git@github.com:pataruco/wuxing-calendar.git
   ```

2. Install dependencies

   ```sh
   yarn
   ```

## Deployment

### Web

A [Github action][gh-actions] is set to deal with deployments to prod. To trigger a deployment

- Create a git release [tag][git-tag] with the following convention `R.<number>.<number>.<number>`

  ```sh
  git tag R.1.0
  ```

- Push tag to remote

  ```sh
  git push --tags
  ```

- You can check CI/CD build [here](https://github.com/pataruco/wuxing-calendar/actions/workflows/ci.yml)

- Make a tea 🫖

- Check [site][site] live

- 🚀

[site]: https://calendar.pataruco.com
[react]: https://reactjs.org/
[git-tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[gh-actions]: https://github.com/features/actions
