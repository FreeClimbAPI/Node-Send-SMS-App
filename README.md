# Send SMS App

This project serves as a guide to help you build an application with FreeClimb. Specifically, the project will:

- Receive an incoming call
- Get digits (phone number) from the caller 
- Send an SMS to the phone number the caller input

## Setting up your new app within your FreeClimb account

To get started using a FreeClimb account, follow the instructions [here](https://docs.freeclimb.com/docs/getting-started-with-freeclimb).

## Setting up the Send SMS App locally

1. Download and install [Node.js](https://nodejs.org)
2. Install yarn globally [Mac OS](https://yarnpkg.com/lang/en/docs/install/#mac-stable) | [Windows](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
3. Clone or download this repo
4. Install packages
  ```bash
    $ yarn install
  ```
5. Configure environment variables (this tutorial uses the [dotenv package](https://www.npmjs.com/package/dotenv))

   | ENV VARIABLE | DESCRIPTION |
   | ------------ | ----------- |
   | ACCOUNT_ID | Account ID which can be found under [API Keys](https://www.freeclimb.com/dashboard/portal/account/authentication) in Dashboard |
   | AUTH_TOKEN | Authentication Token which can be found under [API Keys](https://www.freeclimb.com/dashboard/portal/account/authentication) in Dashboard |
   | HOST_URL | URL for hosted Send SMS Application |

## Using the Send SMS Application

1. Run the application using command:

   ```bash
   $ node index.js
   Running the application on port 80.
   ```

2. Call your FreeClimb number and follow the prompts!

## Getting Help

If you are experiencing difficulties, [contact support](https://freeclimb.com/support).
