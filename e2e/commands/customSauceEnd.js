exports.command = function () {
  const SauceLabs = require('saucelabs')

  const saucelabs = new SauceLabs({
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY
  })

  const sessionid = this.capabilities['webdriver.remote.sessionid']
  const jobName = this.currentTest.module
  const passed = this.currentTest.results.failed === 0

  saucelabs.updateJob(sessionid, {
    passed,
    name: jobName
  })
  this.end()
}
