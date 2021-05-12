const db = require('quick.db');

module.exports = {
    name: 'disablelogchannel',
    description: 'Disables ModLogs!',
    timeout : 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permissions of [ADMINISTRATOR]")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send('This channel wasnt a modlog channel')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("Modlog channel has been disabled")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`Modlog channel has been disabled. Before: ${channel.name}`)
            }
            return;
        } catch {
            return message.channel.send("Error: Wrong channel or you do not have permissions")
        }
    }
}