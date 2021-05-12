const client = require('../index')

client.on("messageDelete", async (messageDelete) => {
    event.emit("message", message)
    var channel = messageDelete.channel.id;
    var e = "813241046171254795";
    var embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle("Log: Message Deleted")
    .setDescription(`Message deleted in <#${channel}>.`)
    .addField("Sent by", message.author, false)
    .setColor("RED")
    .setTimestamp();
    e.send(embed);
    })