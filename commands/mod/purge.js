const ms = require("ms")
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "purge",
	aliases: ["clear", 'prune', 'delete'],
	category: "mod",
	description: "Deletes an amount of messages from a channel!",
	usage: "<prefix>purge <amount of messages>",
	run: async (bot) => {
		let {client, message, args, prefix} = bot;
        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!");
      
    //check if they included a number of messages to delete
    if(!args[0]) return message.reply('You forgot to include a number!');
    message.channel.bulkDelete(args[0]); //bulk delete the specified number of messages
    }
}