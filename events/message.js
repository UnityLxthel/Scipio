const Discord = require("discord.js");
const db = require('quick.db')
module.exports = {
	name: "message",
	func: runAll,
};

function runAll(bot, message) {
	runCommands(bot, message);
}

async function runCommands(bot, message) {
	if (!message.guild) return;
	if (message.author.bot) return;
	let { client, config} = bot;
    if(message.content.startsWith('>')) {
        return;
    } else {
        if (message.channel.id === "783070457170624513") {
            message.react("👍");
            message.react("👎");
        }
    }
    let prefix = db.get(`prefix_${message.guild.id}`)
	if(!prefix || prefix == null) {
       prefix = "!"
	}
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (!command) return;
	if (command.adminOnly === true) {
		if (!config.admins.includes(message.author.id))
			return client.functions.get("functions").response(message, "This command requires bot owner permissions");
	}
	bot.message = message;
	bot.args = args;
	//add additional things you would like to pass to the command runners here
	try {
		await command.run(bot);
	} catch (err) {
		//accepts any error messages and returns to the user a custom message
		let errMsg = err.toString(); //just add `throw "?error message text"` anywhere in your code
		if (errMsg.startsWith("?"))
			//prefix any thrown errors with a "?" to distinguish it from other errors
			client.functions.get("functions").response(message, errMsg.replace(/\?/, ""));
		else console.log(err); //should log to console any errors that are not purposely thrown
	}
}
