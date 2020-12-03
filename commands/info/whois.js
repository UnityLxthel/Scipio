const moment = require('moment');
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: "whois",
	aliases: ["userinfo"],
	category: "info",
	description: "Send the info of the mentioned user.",
	usage: "<prefix>userinfo <member>",
	run: async (bot) => {
		let {client, message, args, prefix} = bot
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        if(args.length > 1) return message.channel.send('Only mention one user!');
        
        	let nitroBadge = member.user.avatarURL({dynamic: true})

    		let flags = member.user.flags.toArray().join(`\n`)

            if(!flags) {
                flags = "User doesn't have any flags."
            }
        

    	flags = flags.replace("HOUSE_BRAVERY", " <:HOUSE_BRAVERY:782480318065016852> ")
       	flags = flags.replace("EARLY_SUPPORTER"," <:EARLY_SUPPORTER:782480318389157888> ")
       	flags = flags.replace("EARLY_VERIFIED_DEVELOPER"," <:EARLY_VERIFIED_DEVELOPER:782480318044176395> ")
       	flags = flags.replace("HOUSE_BRILLIANCE"," <:HOUSE_BRILLIANCE:782480318023860264> ")
       	flags = flags.replace("HOUSE_BALANCE"," <:HOUSE_BALANCE:782480317960945694> ")
     	flags = flags.replace("DISCORD_PARTNER"," <:DISCORD_PARTNER:782480318103683092> ")
       	flags = flags.replace("HYPESQUAD_EVENTS"," <:HYPESQUAD_EVENTS:782480318003150880> ")
       	flags = flags.replace("DISCORD_CLASSIC"," <:NITRO:782506495194693653> ")
      	flags = flags.replace("VERIFIED_BOT"," <:VERIFIED_BOT:782480320477790248> ")
     	flags = flags.replace("TEAM_USER", ' `Team User` ')
    	flags = flags.replace("SYSTEM", ' `System` ')
   		flags = flags.replace("DISCORD_EMPLOYEE", ` <:DISCORD_EMPLOYEE:782485133260357632> `)
    	flags = flags.replace("BUGHUNTER_LEVEL_1", ` <:BUGHUNTER_LEVEL_1:782480318065541131> `)
     	flags = flags.replace("BUGHUNTER_LEVEL_2", ` <:BUGHUNTER_LEVEL_2:782480318053482546> `)

   			if(nitroBadge.includes("gif")) {
    			flags = flags + `<:NITRO:782506495194693653>`
   			}	
            if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
           	if (member.presence.status === 'online') member.presence.status = 'Online';
          	if (member.presence.status === 'idle') member.presence.status = 'Idle';
          	if (member.presence.status === 'offline') member.presence.status = 'Offline';
        
      		let status = member.presence.status;
            
      		if(member) {
        		let embed = new MessageEmbed()
                .setColor("RANDOM")
                  .setTitle("User Info")
                  .setThumbnail(nitroBadge)
                  .setAuthor(`${member.user.tag} (${member.id})`, nitroBadge)
                  .addField("**• Username**", `${member.user.tag}`)
                  .addField("**• ID**", `${member.user.id}`)
                  .addField("**• Status**", status)
                  .addField("**• Joined**", `${member.joinedAt.toLocaleString()}`)
                  .addField("**• Created**", `${member.user.createdAt.toLocaleString()}`)
                  .addField("**• Badges**", `${flags || "None"}`)
                  .addField("**• Roles**", `${member.roles.cache.map(role => role.toString()).join(' ')}`)
                  .setFooter(`${message.guild.me.displayName}`, client.user.displayAvatarURL());
                
        		message.channel.send(embed);
            }
    }
}