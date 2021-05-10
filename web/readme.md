[![Netlify Status](https://api.netlify.com/api/v1/badges/1dec2e62-3301-428e-8b9a-0cfbc6d02f0e/deploy-status)](https://app.netlify.com/sites/upbeat-jennings-4cf80f/deploys)

# Web

[React][react] app that service an interface for [five phases](./five-phases/readme.md) API, published in [https://calendar.pataruco.com][site]

## Development

- Run local server

  ```sh
  yarn start
  ```

## Deployment

- Create a production build

  ```sh
  yarn workspace web build
  ```

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
