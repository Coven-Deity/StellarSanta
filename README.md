# StellarSanta (note: incomplete, still in developement)
StellarSanta is a Stellar lumens and other Stellar assets tipping bot for Discord.

```
git clone https://github.com/Coven-Deity/StellarSanta.git
```
```
cd ./StellarSanta
```
```
npm install --save cron
```
```
npm install --save discord.js
```
```
npm install --save @stellar/stellar-sdk
```
```
node index.js
```
- Copy your `Discord ID` to the `.private/config.json` file as "botOwnerId"
- Copy your `Discord Server ID` to the `.private/config.json` file as "botBaseGuildId"
## Discord Developer Portal Instructions
**Create a new application**:
  - Go to [Discord Developer Portal](https://discord.com/developers/applications).
  - Click `New Application` and follow the prompts.
    - Copy the `APPLICATION ID` to the `.private/config.json` file as "botId"
    - Set `PUBLIC KEY` to the `.private/config.json` as "botPublicKey"
  - Select `Bot` on the left sidebar.
  - Reset Token:
    - Copy the token to `.private/config.json` as "botToken".
  - Enable Intents:
    - PRESENCE INTENT
    - SERVER MEMBERS INTENT
    - MESSAGE CONTENT INTENT
  - Select `OAuth2` on the left sidebar.
    - select `bot` checkbox
    - select `Administrator` in the bottom section
    - Copy the `GENERATED URL` to `.private/config.json` as "botInviteLink"
  - Close the [Discord Developer Portal]
  - Invite the bot to your server using the link you copied.
## Install Service
- Follow the instructions in the StellarSanta.service file to install the bot as a service
## Updating
```
git add --all
```
```
git commit --message "brief concise description of the commit"
```
```
git push origin main
```
# Tested on
Ubuntu 22.04
- node v20.17.0
- npm 10.8.2
- @stellar/stellar-sdk 13.0.0
- cron 3.2.1
- discord.js 14.16.3
# References
- Stellar Developer Docs
```
https://developers.stellar.org
```
- js-stellar-sdk
```
https://github.com/stellar/js-stellar-sdk
```
- js-stellar-sdk DOCS
```
https://stellar.github.io/js-stellar-sdk/
```
- Stellar Developers Discord server
```
https://discord.com/invite/stellardev
```
