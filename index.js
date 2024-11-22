const { setTimeout } = require('node:timers/promises');
const { join } = require('node:path');
const { userInfo } = require('node:os');
const { existsSync, mkdirSync, readdirSync, writeFileSync } = require('node:fs');
const mainEntryDir = __dirname;
const foldersPath = join(__dirname, 'commands');
const eventsPath = join(__dirname, 'events');
const commandFolders = readdirSync(foldersPath);
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const serviceFilePath = `${mainEntryDir}/StellarSanta_test.service`;
const configFilePath = `${mainEntryDir}/.private/config_test.json`;
const osUsername = userInfo().username;
createDir(`${mainEntryDir}/.logs`);
createDir(`${mainEntryDir}/.private`);
const serviceContent = `## sudo cp ${mainEntryDir}/StellarSanta.service /etc/systemd/system/
## sudo systemctl daemon-reload
## sudo systemctl enable StellarSanta.service
## sudo systemctl start StellarSanta.service
##
## /etc/systemd/system/StellarSanta.service
## sudo systemctl stop StellarSanta.service
## sudo systemctl restart StellarSanta.service
[Unit]
Description=StellarSanta daemon
After=network.target
After=syslog.target
Wants=network-online.target

[Service]
Restart=always
WorkingDirectory=${mainEntryDir}
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
ExecStart=/usr/bin/node ${mainEntryDir}/index.js
ExecStop=pskill -9 npm; pskill -9 node
Group=${osUsername}
User=${osUsername}
StandardOutput=append:${mainEntryDir}/.logs/service.log
StandardError=append:${mainEntryDir}/.logs/service_error.log

[Install]
WantedBy=multi-user.target
`;
const configContent = {
	botId: '<botId>',
	botOwnerId: '<botOwnerID>',
	botBaseGuildId: '<botBaseGuildId>',
	botName: "StellarSanta",
	botPublicKey: '<botPublicKey>',
	botToken: '<botToken>',
	botInviteLink: `https://discord.com/oauth2/authorize?client_id=<botId>&permissions=8&integration_type=0&scope=bot`
};
createFile(serviceFilePath, serviceContent);
createFile(configFilePath, JSON.stringify(configContent, null, 2));
const configFile = require('./.private/config.json');
const { Client, Collection, IntentsBitField, Partials } = require('discord.js');
const _partials = [
	Partials["User"],
	Partials["Channel"],
	Partials["GuildMember"],
	Partials["Message"],
	Partials["Reaction"],
];
const _intents = new IntentsBitField([
	"Guilds",
	"GuildModeration",
	"GuildEmojisAndStickers",
	"GuildIntegrations",
	"GuildBans",
	"GuildInvites",
	"GuildMembers",
	"GuildMessageReactions",
	"GuildMessageTyping",
	"GuildMessages",
	"GuildPresences",
	"GuildScheduledEvents",
	"GuildVoiceStates",
	"GuildWebhooks",
	"DirectMessages",
	"DirectMessageTyping",
	"DirectMessageReactions",
	"MessageContent",
	"AutoModerationConfiguration",
	"AutoModerationExecution"
]);
global.client = new Client({ partials: _partials, intents: _intents });
client.commands = new Collection();

client.utils = {
	configFile,
	sleep: async function (milliseconds) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, milliseconds);
		});
	}
}

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => {
		return file.endsWith('.js') && !file.endsWith('_main.js');
	});
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(configFile.botToken);

function createDir(directoryPath) {
	if (!existsSync(directoryPath)) {
		mkdirSync(directoryPath, { recursive: true }, (error) => {
			if (error) {
				console.error('Error creating directory:', error);
			}
		});
	}
}

function createFile(filePath, content) {
	if (!existsSync(filePath)) {
		writeFileSync(filePath, content, (error) => {
			if (error) {
				console.error('Error creating file:', error);
			}
		});
	}
}