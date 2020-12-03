const ms = require("ms")
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "unmute",
	aliases: [],
	category: "mod",
	description: "Unmute People",
	usage: "<prefix>unmute @user",
	run: async (bot) => {
		let {client, message, args, prefix} = bot;
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
      message.channel.send("You don't have permission to unmute someone.");
    } else if(!args[0]){
      //if there is no first arg
      message.channel.send("You have to enter a user to unmute.");
    } else {
      try{
        const unmuted = message.mentions.members.first(); //get the first member mentioned
        const unmuter = message.author.tag; //get the user that sent the command
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs"); //look for the mod-logs channel

        //check if the user to be unmuted exists
        if(unmuted) {
          //check if the unmuted user can be unmuted
          if(unmuted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
              message.channel.send("You can't unmute that person.");
          } else {
            //have to add the muted role id here
            let mutedRole = message.guild.roles.cache.get('435186879407849482'); //look for the role with this id

            //if the role exists
            if(mutedRole) {
              unmuted.roles.remove(mutedRole); //remove the role from the user

              //create an embed with the unmute info and send it to the mod-logs channel
              const embed = new MessageEmbed()
                .setColor(purple_medium)
                .setTitle(`Member unmuted by ${unmuter}`)
                .addField('Unmuted Member', `${unmuted}`, true)
                .addField('Server', `${message.guild.name}`, true)
                .setTimestamp()
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

              channel.send(embed);
            } else {
              message.channel.send("Can't find the muted role.");
            }
          }
        } else {
          message.channel.send("Member not found.");
        }
      } catch(e) {
        console.error(e); //log any errors in he console
      }
    }
	}
}
