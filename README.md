# StellarSanta
StellarSanta Discord bot.

```
git clone https://github.com/Coven-Deity/StellarSanta.git
```
```
mkdir .logs
```
```
mkdir .private
```
```
npm install --save cron
```
```
npm install --save discord.js
```

## Discord Developer Portal Instructions
**Create a new application**:
  - Go to [Discord Developer Portal](https://discord.com/developers/applications).
  - Click `New Application` and follow the prompts.
    - Copy the `APPLICATION ID` to the config.json file as "botId"
    - Set `PUBLIC KEY` to the config.json as "botPublickey"
  - Select `Bot` on the left sidebar.
  - Reset Token:
    - Copy the token to `config.json` as "botToken".
  - Enable Intents:
    - PRESENCE INTENT
    - SERVER MEMBERS INTENT
    - MESSAGE CONTENT INTENT
  - Select `OAuth2` on the left sidebar.
    - select `bot` checkbox
    - select `Administrator` in the bottom section
    - Copy the `GENERATED URL` to config.json as "invitelink"
  - Close the [Discord Developer Portal]
  - Invite the bot to your server using the link you copied.

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