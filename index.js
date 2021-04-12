const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const freeclimbSDK = require('@freeclimb/sdk')

const port = 80
const host = process.env.HOST
const accountId = process.env.accountId
const apiKey = process.env.apiKey
const freeclimb = freeclimbSDK(accountId, apiKey)

const _MESSAGE_ = 'This is a message sent by FreeClimb!'

// Specify this route with 'Voice URL' in App Config
app.post('/incomingCall', (req, res) => {

  const promptForNumber = freeclimb.percl.say('Welcome to the send a SMS sample Application! Please enter a phone number starting with a one.')
  // Create options for getDigits script
  const options = {
    prompts: freeclimb.percl.build(promptForNumber),
    maxDigits: 11,
    minDigits: 11,
    flushBuffer: true,
    initialTimeoutMs: 10000
  }
  const getDigits = freeclimb.percl.getDigits(`${host}/numberSelectDone`, options)
  const percl = freeclimb.percl.build(getDigits)
  res.status(200).json(percl)
})

app.post('/numberSelectDone', (req, res) => {
  const options = {
    notificationUrl: `${host}/notificationUrl`
  }

  const digits = req.body.digits
  
  const formattedNum = `+${digits}`
  const callbackReason = req.body.reason
  let percl

  if(digits[0] != '1'){
    const errorScript = freeclimb.percl.say('The phone number entered does not start with a one. Please call back to try again.')
    percl = freeclimb.percl.build(errorScript)
  }
  else if (callbackReason == freeclimb.enums.getDigitsReason.TIMEOUT) {
    const timeoutScript = freeclimb.percl.say('The phone call has timed out. Please call back to try again.')
    percl = freeclimb.percl.build(timeoutScript)
  }
  else if (callbackReason == freeclimb.enums.getDigitsReason.MAX_DIGITS) {
    // Create sms PerCL that sends sms to current caller using the number handling the request
    const smsCommand = freeclimb.percl.sms(req.body.to, formattedNum, _MESSAGE_, options)
    const sayCommand = freeclimb.percl.say('Your message has been sent.')
    const hangup = freeclimb.percl.hangup()
    percl = freeclimb.percl.build(smsCommand, sayCommand, hangup)
  }
  else {
    const errorScript = freeclimb.percl.say('The phone number entered is invalid or an error has occured. Please check FreeClimb Logs for more details.')
    percl = freeclimb.percl.build(errorScript)
  }

  res.status(200).json(percl)
})

// Receive status updates of the sms
app.post('/notificationUrl', (req, res) => {
  console.log('Outbound Message Status Change: ', req.body)
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on ${port}`)
})