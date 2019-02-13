const util = require('util')
const events = require('events')

function WaitForURLEquals () {
  events.EventEmitter.call(this)
  this.expectedURL = null
  this.startTimer = null
  this.cb = null
  this.ms = null
  this.abortOnFailure = typeof this.client.api.globals
    .abortOnAssertionFailure === 'undefined' || this.client.api.globals.abortOnAssertionFailure
  this.rescheduleInterval = this.client.api.globals
    .waitForConditionPollInterval || this.client.options.waitForConditionPollInterval || 500
}

util.inherits(WaitForURLEquals, events.EventEmitter)
WaitForURLEquals.prototype
  .command = function commandFn (expectedURL, opts) {
    this.startTimer = new Date().getTime()
    if (opts) {
      this.ms = this.setMilliseconds(opts.milliseconds)
      this.cb = opts.callback || function () {}
      if (opts.abortOnFailure) {
        this.abortOnFailure = opts.abortOnFailure
      }
      if (opts.rescheduleInterval) {
        this.rescheduleInterval = opts.rescheduleInterval
      }
      this._stackTrace = commandFn.stackTrace
      // support for a custom failure message
      this.message = null
      if (opts.message) {
        this.message = opts.message
      }
    } else {
      this.ms = this.setMilliseconds()
      this.cb = function () {}
    }

    this.expectedURL = expectedURL
    this.checkURL()
    return this
  }

WaitForURLEquals.prototype.complete = function (result) {
  const args = [result]
  args.push(this)
  this.cb.apply(this.client.api, args)
  this.emit('complete')
  return this
}

WaitForURLEquals.prototype.URLEqual = function (result, now) {
  const defaultMsg = 'Wait for URL passed'
  return this.pass(result, defaultMsg, now - this.startTimer)
}

WaitForURLEquals.prototype.URLNotEqual = function (result, now) {
  if (now - this.startTimer < this.ms) {
    // URL was not what we expected, schedule another check
    this.reschedule()
    return this
  }

  const defaultMsg = 'Wait for URL failed'
  return this.fail({ value: false }, result.value, this.expectedURL, defaultMsg)
}

WaitForURLEquals.prototype.reschedule = function () {
  setTimeout(() => {
    this.checkURL()
  }, this.rescheduleInterval)
}

WaitForURLEquals.prototype.pass = function (result, defaultMsg, timeMs) {
  this.message = `${defaultMsg}. URL was equal to ${this.expectedURL} after ${timeMs} milliseconds.`
  this.client.assertion(true, null, null, this.message, this.abortOnFailure)
  return this.complete(result)
}

WaitForURLEquals.prototype.fail = function (result, actual, expected, defaultMsg) {
  if (!this.message) {
    this.message = `${defaultMsg}. URL was not equal to ${this.expectedURL}. Was ${actual}`
  }
  this.client
    .assertion(false, actual, expected, this.message, this.abortOnFailure, this._stackTrace)
  return this.complete(result)
}

/*!
 * Will start checking if the URL is correct and if not re-schedule the check
 * until the timeout expires or the condition has been met
 */
WaitForURLEquals.prototype.checkURL = function () {
  const self = this
  this.getProtocolCommand(result => {
    const now = new Date().getTime()

    if (result.value && result.value === this.expectedURL) {
      return self.URLEqual(result, now)
    }
    return self.URLNotEqual(result, now)
  })
}

WaitForURLEquals.prototype.getProtocolCommand = function (callback) {
  this.client.api.url(callback)
}

WaitForURLEquals.prototype.setMilliseconds = function (timeoutMs) {
  if (timeoutMs && typeof timeoutMs === 'number') {
    return timeoutMs
  }

  const globalTimeout = this.client.api.globals.waitForConditionTimeout

  if (typeof globalTimeout !== 'number') {
    throw new Error('WaitForURLEquals expects second parameter to have a global defaut ' +
      '(waitForConditionTimeout) to be specified if not passed as the second parameter ')
  }

  return globalTimeout
}

module.exports = WaitForURLEquals
