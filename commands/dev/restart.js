module.exports = {
    name: "restart",
    aliases: [],
    category: "dev",
    adminOnly: true,
    description: "Restarts the bot",
    usage: "<preifx>restart",
    run: async (bot) => {
      	let {client, message, f} = bot;
        message.channel.send('Restarting...').then(() => {
            process.exit();
        })
    }
}