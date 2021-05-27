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

GitHub needs a `ACCESS_TOKEN` secret to use in your workflow. You can use the `ACCESS_TOKEN` to authenticate in a workflow run.
Read more about GitHub secrets [here](https://docs.github.com/en/actions/reference/encrypted-secrets).

1. On GitHub, navigate to the main page of the repository
2. Under your repository name, click _Settings_
3. In the left sidebar, click _Secrets_
4. Click _New repository secret_
5. Type `ACCESS_TOKEN` the Name input box
6. Enter the value for your secret
7. Click Add secret
