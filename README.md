# nw_automation_demo

Nightwatch.js QA Automation demo.

Nightwatch.js is an integrated, easy to use End-to-End testing solution for web applications and websites, written in Node.js. It uses the W3C WebDriver API to drive browsers in order to perform commands and assertions on DOM elements.

## Getting up and running

This project includes a sample application, and a complementary test suite to demonstrate the basic workflow of using Nightwatch.js for QA SDET automation. Ideally one should be able to get a feel for structuring and writing E2E test cases, as well as extend or refactor these existing tests to build up confidence in working within SDET.

1. Project Setup & Installation:

```sh
# Nightwatch.js Setup
$ git clone && cd into this repo
$ npm install
```

2. Configure `.env` file with the following in order for the test cases to work:

```md
USERNAME=tomsmith
PASSWORD=SuperSecretPassword!
```

> Note: The USERNAME & PASSWORD can be located on the main testing web page.

3. Execute Nightwatch.js E2E test suite:

```sh
$ npm run test
```

---

## Technologies & Frameworks

- [Nightwatch.js](https://nightwatchjs.org/)
- [Selenium](https://www.selenium.dev/)
- [Node.js](https://nodejs.org/)
- Special thanks to [the-internet](http://the-internet.herokuapp.com/) as a test platform!
