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
Before you start please create an encrypted secret for your project by following the steps below.

1. On GitHub, navigate to the main page of the repository
2. Under your repository name, click _Settings_
3. In the left sidebar, click _Secrets_
4. Click _New repository secret_
5. Type `ACCESS_TOKEN` the Name input box
6. Enter the value for your secret
7. Click Add secret

The following steps occur when code is pushed:

1. Install
2. Code style and type checking
3. Build for production (only if the code pushed is on the `main` branch)
4. Deploy to GitHub Pages (only if the code pushed is on the `main` branch)

## Deploy

Add homepage property to `package.json` file.

```json
  "homepage": "http://stakefish.github.io/my-mask-app"
```
