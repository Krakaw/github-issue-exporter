<h1 align="center">Welcome to Github Issue Exporter 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Krakaw/github-issue-exporter#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/Krakaw/github-issue-exporter/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/Krakaw/github-issue-exporter/blob/master/LICENSE">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" target="_blank" />
  </a>
</p>

> Pull issues and export them to Asana / CSV

### 🏠 [Homepage](https://github.com/Krakaw/github-issue-exporter#readme)

## Install

```sh
npm install
```

## Usage

```sh
# Output issues to stdout in a csv
./cli.js -o Krakaw -r github-issue-exporter
```

```sh
# A more complex example
./cli.js    --type asana \
            --asana-key=ASANA_API_KEY \
            --asana-project=ASANA_PROJECT_ID \
            --asana-workspace=ASANA_WORKSPACE_ID \
            --owner=Krakaw \
            --repos="github-issue-exporter" "another-repo" \
            --github-key=GITHUB_AUTH_TOKEN \
            --github-user-agent=GITHUB_USER_NAME \
            --labels="on or more" "labels" \
            --issue-state=[open,closed,all]
```
```sh
# Use environment variables from a .env files
# --github-user-agent
IE_GITHUB_USER_AGENT=
# --github-key
IE_GITHUB_KEY=
# --asana-key
IE_ASANA_KEY=
# --asana-workspace
IE_ASANA_WORKSPACE=
# --asana-project
IE_ASANA_PROJECT=
```

## Run tests

```sh
npm run test
```

## Author

👤 **Krakaw**

* Github: [@Krakaw](https://github.com/Krakaw)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Krakaw/github-issue-exporter/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Krakaw](https://github.com/Krakaw).<br />
This project is [ISC](https://github.com/Krakaw/github-issue-exporter/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
