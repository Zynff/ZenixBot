const { MessageEmbed } = require("discord.js")

module.exports ={
name: 'membercount',
description: 'Server Info!',
run : async(client, message) => {
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Members in ${message.guild}`)
    .addField("Members", `Total: ${message.guild.members.cache.size} | Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size} | Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(`ID: ${message.guild.id}, Created • ${message.guild.createdAt.toDateString()}`)

    message.channel.send(embed)
 }
}