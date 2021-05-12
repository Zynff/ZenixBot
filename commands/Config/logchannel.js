const db = require("quick.db")

module.exports = {
    name: 'logchannel',
    description: 'Enables modlog channel!',
    timeout : 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `The modlog channel has been set to ${channelName.name}!`
        );
      } else
        return message.channel.send(
          "Please mention a channel or input a channel id"
        );
    }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("Please Enter A Valid Text Channel!");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("This channel has already been set as a modlog channel")
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("Modlog channel has been set!")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`Modlog channel has been set to ${channel.name}`)
            }
        } catch {
            return message.channel.send("Error: Wrong channel or you do not have permissions");
        }
    }
};