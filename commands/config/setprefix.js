const db = require("quick.db");
const prefix = require("/home/container/config.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "config",
    adminOnly: false,
    description: "Changes bot prefix",
    usage: "<preifx>prefix <newbotprefix>",
    run: async (bot) => {
        let {message, client, config, args} = bot  
        if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "265240267215339522") {
        let embed = new MessageEmbed();
        embed.setDescription(`You do not have the \`MANAGE_GUILD\` permission!`)
        embed.setColor("#228B22")
        return message.reply(embed)
        //return message.channel.send(`You do not have the \`MANAGE_GUILD\` permission`)
    }
    if(!args[0]) {
        return message.channel.send("You need to enter a prefix to change!")
    }
    if(args[1]) {
        return message.channel.send("No double args")
    }
    if(args.length > 10) {
        return message.channel.send("You cannot set a prefix longer than 3 characters!")
    }
    if(args.join("") === prefix) {
        db.delete(`prefix_${message.guild.id}`)
        return await message.channel.send(`Prefix has been reset`)
    }
    if(args[0] == "delete" || args[0] == "reset") {
        db.delete(`prefix_${message.guild.id}`)
    return await message.channel.send(`Prefix for this guild has been reset`) 
    } else{
    db.delete(`prefix_${message.guild.id}`)
    db.set(`prefix_${message.guild.id}`, args[0])
    let e = new MessageEmbed()
    .setDescription(`Set bot prefix to ${args[0]}`)
    return await message.channel.send(e)
    //return await  message.channel.send(`Set bot prefix to ${args[0]}`) 
    }
    }
}