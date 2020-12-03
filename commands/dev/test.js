module.exports = {
    name: "dev",
    aliases: ["test"],
    category: "dev",
    adminOnly: true,
    description: "A bot test command",
    usage: "<preifx>test",
    run: async (bot) => {
      let {client, message, f} = bot;
      message.channel.send('Test!')
    }
  }