# Stanley Ipkiss

A Photo Editor application template with simple, easy support for image editing using Sticker like stories.

## Features

- [x] Facial recognition with [face-api.js](https://github.com/justadudewhohacks/face-api.js/)
- [x] Multiple stickers type
- [x] CSS 3D transformations
- [x] GitHub Pages deploy

## Run Locally

Use this [template](https://github.com/stakefish/stanley-ipkiss/generate) and clone the project.

```bash
$  git clone https://link-to-project
```

Go to the project directory.

```bash
$  cd my-project
```

Install dependencies.

```bash
$  yarn install
```

Start the server.

```bash
$  yarn start
```

## Workflow

GitHub needs a `ACCESS_TOKEN` secret to use in your workflow.
Before you start please create an encrypted secret for your [project](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

When code is pushed or a pull request is raised the following steps occur:

1. Install
2. Code style and type checking
3. Build for production (only if the code pushed is on the `main` branch)
4. Deploy to GitHub Pages (only if the code pushed is on the `main` branch)

## Deploy

Add homepage property to `package.json` file.

```json
  "homepage": "http://stakefish.github.io/my-mask-app"
```

In case you are using Github pages with custom domain make sure you edit the `deploy` steps located at `.github/workflows/deploy.yml` and add the domain name as `fqdn`.

```yaml
with:
  target_branch: gh-pages
  build_dir: build
  fqdn: example.com
```
