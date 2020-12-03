const ms = require('ms');
module.exports = {
	name: "uptime",
	aliases: [],
	category: "info",
	description: "Sends the bot's uptime.",
	usage: "<prefix>uptime",
	run: async (bot) => {
		let {client, message, args, prefix} = bot
        message.channel.send(`I have been online for: \`${ms(client.uptime, { long: true })}\``);
    }
}