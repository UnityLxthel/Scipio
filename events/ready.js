const Discord = require('discord.js')
module.exports = {
	name: "ready",
	func: runAll,
};
function runAll(bot) {
    login(bot);
    status(bot);
}
        

function login(bot){
    const {client} = bot;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log("")
    console.log(`   Logged in as ${client.user.tag}!   `);
    console.log("")
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
}

function status(bot){
    let {client} = bot;
    const prefix = "!"
   	const activities = [
        {
            status: `${client.users.cache.size} Members | ${prefix}help`,
            type: "WATCHING"
        },
        {
        	status: `${client.guilds.cache.size} Servers | ${prefix}help`,
            type: "WATCHING"
        },
        {
            status: `${client.guilds.cache.size} Channels | ${prefix}help`,
            type: "WATCHING"
        }
    ]
    
    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.status, {
            type: activity.type
        });
    }, 5000);
}