const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "ping",
    aliases: ["p"],
    category: "dev",
    description: "Returns bot's latency",
    usage: "<preifx>ping",
    run: async (bot) => {
      var {client, message, f} = bot;
        const msg = await message.channel.send(`Main bot Pinging...`);
        let embed = new MessageEmbed()
        	.setTitle('Pong!')
        	.setDescription(`API: ${Math.round(client.ws.ping)}ms\nBot: ${msg.createdAt - message.createdAt}ms\nUptime: ${client.functions.get("functions").formatTime(client.uptime)}`)
        message.channel.send(embed)
    }
  }
 