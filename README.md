# Stanley Ipkiss

# Install

```sh
$ yarn install
```

# Develop

```sh
$ yarn build
```

# Deploy

Update the given domain name to the CNAME file by adding `fqdn` option on the deploy step.

```
with:
  target_branch: gh-pages
  build_dir: build
  fqdn: example.com
```
