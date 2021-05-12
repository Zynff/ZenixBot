const { MessageEmbed } = require("discord.js")

module.exports ={
name: 'serverinfo',
description: 'Server Info!',
run : async(client, message) => {
    const embed = new MessageEmbed()
    .setTitle("Server Info")
    .setDescription("Zynf's World's Server Info!")
    .setColor("GREEN") //hex color or for ex "RED", "BLUE", "GREEN" etc! - Zynf
    .addField("Owner", message.guild.owner, true)
    .addField("Channels", message.guild.channels.cache.size, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField("Emojis", message.guild.emojis.cache.size, true)
    .addField("Verification Level", message.guild.verificationLevel, true)
    .addField("Region", `${message.guild.region}`, true)
    .addField("Members", `Total: ${message.guild.members.cache.size}`, true)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(`ID: ${message.guild.id}, Created • ${message.guild.createdAt.toDateString()}`)

    message.channel.send(embed)
 }
}