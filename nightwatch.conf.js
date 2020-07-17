require("env2")(".env");
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");
const PKG = require("./package.json");
const SCREENSHOT_PATH =
  "./node_modules/nightwatch/screenshots/" + PKG.version + "/";

const config = {
  src_folders: ["e2e/test_cases"],
  output_folder: "./node_modules/nightwatch/reports",
  custom_commands_path: "e2e/commands",
  page_objects_path: "e2e/page_objects",
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: "",
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": chromedriver.path,
      "webdriver.gecko.driver": geckodriver.path,
    },
  },
  test_workers: { enabled: true, workers: "auto" },
  test_settings: {
    default: {
      globals: {
        waitForConditionTimeout: 30000,
        waitForConditionPollInterval: 100,
      },
      launch_url: "${LAUNCH_URL}",
      selenium_port: 4444,
      selenium_host: "localhost",
      silent: true,
      persist_globals: true,
      screenshots: {
        enabled: false,
        path: "",
      },

      desiredCapabilities: {
        autoAcceptAlerts: true,
        browserName: "Browser",
        javascriptEnabled: true,
        acceptSslCerts: true,
        avoidProxy: true,
      },
    },

    chrome: {
      launch_url: "${LAUNCH_URL}",
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        autoAcceptAlerts: true,
        chromeOptions: {
          args: ["window-size=1280,800"],
          w3c: false,
        },
      },
    },

    firefox: {
      launch_url: "${LAUNCH_URL}",
      desiredCapabilities: {
        browserName: "firefox",
        javascriptEnabled: true,
        acceptSslCerts: true,
        cssSelectorsEnabled: true,
        handlesAlerts: true,
        pageLoadStrategy: "eager",
        acceptInsecureCerts: true,
        "moz:webdriverClick": false,
        waitForConditionTimeout: 30000,
        waitForConditionPollInterval: 100,
      },
    },
  },
};

module.exports = config;

function padLeft(count) {
  // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? "0" + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : "any");
  meta.push(a.version ? a.version : "any");
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join("~").toLowerCase().replace(/ /g, "");
  return SCREENSHOT_PATH + metadata + "_" + padLeft(FILECOUNT++) + "_";
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
