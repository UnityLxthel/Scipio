const Discord = require("discord.js");
module.exports = {
	name: "help",
	aliases: ["h"],
	category: "info",
	description: "Returns all commands, or one specific command's info",
	usage: "[command | alias]",
	run: async (bot) => {
		let {client, message, args, prefix} = bot;
		if (args[0]) return getCMD(client, message, args[0]);
		else return getAll(client, message, prefix);
	},
};
function getAll(client, message, prefix) {
    let reacts = {
        tools: ":tools:",
        moneybag: ":moneybag:",
        info: ":information_source:",
        mod: ":cop:"
    }
    let { tools, moneybag, info, mod} = reacts;
	let embedfields = [];
	client.categories.forEach(c => {
		if (c == "hidden") return;
		embedfields.push([
			c,
			client.commands
				.filter(cmd => cmd.category === c)
				.map(cmd => `\`${cmd.name}\``)
				.join(", "),
		]);
	});
	for (var i = 0; i < embedfields.length; i++) {
		embedfields[i][0] = `${reacts[i]} ${embedfields[i][0][0].toUpperCase() +
			embedfields[i][0].substring(1)}`;
	}
	//FIX change image to bot pfp auto link
    let dev = '`eval`, `execute`, `reload`, `test`'
    let ecomony = '`balance`, `deposit`, `pay`, `rob`, `withdraw`, `work`'
    let cmdinfo = '`help`, `ping`, `serverinfo`, `whois`, `uptime`'
    let modcmd = '`ban`, `kick`, `mute`, `unmute`, `purge`'
	var em = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(
			`Bot Commands`,
			message.guild.iconURL({dynamic:true}),
			""
		)
		.addField(`${tools} Dev`, dev)
    	.addField(`${moneybag} Economy`, ecomony)
    	.addField(`${info} Info`, cmdinfo)
    	.addField(`${mod} Moderation`, modcmd)
	message.channel.send(
		em.setFooter(
			`Use ${prefix}help <command> for more info on a specific command\n[Command count: ` +
				client.commands.array().length +
				"]"
		)
	);
}
function getCMD(client, message, input) {
	const embed = new Discord.MessageEmbed();
	const cmd =
		client.commands.get(input.toLowerCase()) ||
		client.aliases.get(input.toLowerCase());
	let info = `No information found for command **${input.toLowerCase()}**`;
	if (!cmd)
		//no specified command
		return message.channel.send(embed.setColor("RED").setDescription(info));

	if (cmd.name) info = `**Command name**: ${cmd.name}`;
	if (cmd.aliases)
		info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter(`Syntax: <> = required, [] = optional`);
	}
	return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
