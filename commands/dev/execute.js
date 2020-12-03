const exec = require('child_process').exec;
const Discord = require('discord.js')

module.exports = {
    name: "execute",
    aliases: ["ex", 'exec'],
    category: "dev",
    adminOnly: true,
    description: "runs commands in terminal",
    usage: "<preifx>exec",
    run: async (bot) => {
    let { client, message, args, config} = bot; 
    if(!args[0])return message.channel.send("Send me something to execute pls")

    const start = process.hrtime();
    exec(`${args.join(" ")}`, (error, stdout) => {
      let response = (error || stdout);
      if (response.length > 1024) console.log(response), response = 'Output too long.';
      const end = process.hrtime(start);
        
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Blob Bot - Executed")
        .setDescription(`${response}`)
        message.channel.send(embed)
    })

    }
  }
  