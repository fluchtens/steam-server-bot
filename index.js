const { Client, ActivityType } = require('discord.js');
const client = new Client({ intents: 1 });
const config = require("./config.json")
var steamServerStatus = require('steam-server-status');

client.on('ready', () => {
	console.log(`💻 ${client.user.tag} is started!`)

	const updateActivity = async () => {
		steamServerStatus.getServerStatus(config.IP, config.PORT, function(serverInfo) {
			if (serverInfo.error) {
				console.log(serverInfo.error);
				client.user.setActivity("server timed out.", { type: ActivityType.Watching })
			} else {
				client.user.setActivity(serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers + ' joueurs.', { type: ActivityType.Watching })
			}
		}
	)};
	
	updateActivity();
	setInterval(updateActivity, 60000);
});

client.login(config.TOKEN);