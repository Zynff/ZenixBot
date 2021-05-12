const { Client, Message, MessageEmbed } = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'helpdev',
    description: 'dev commands',
    run: async(client, message, args) => {
        if(message.author.id !== '703037468001435728') return message.reply(`Sorry ${message.author.username} but this is for owner only!`)
        const embed = new MessageEmbed()
        .setTitle("Dev Commands")
        .setDescription("ye!")
        .setColor("GREEN") //hex color or for ex "RED", "BLUE", "GREEN" etc! - Zynf
        .addField("Reload", '.reload (command)', true)
        .addField("Eval", '.eval (idk)', true)
    
        message.channel.send(embed)
     }
    }