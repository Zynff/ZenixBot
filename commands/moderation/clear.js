const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = {
  name : 'clear',
  aliases : ['purge'],
  run : async(client, message, args) => {
      if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
      if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
      if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
      await message.channel.bulkDelete(parseInt(args[0]) + 1)
          .catch(err => console.log(err))
      message.channel.send('Deleted ' + args[0]  + " messages.")
  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (channel == null) return;

  if (!channel) return;

  const embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription('Deleted ' + args[0]  + " messages.")
      .setTitle("Messages Cleared")
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp();

  var sChannel = message.guild.channels.cache.get(channel)
  if (!sChannel) return;
  sChannel.send(embed)
  return message.channel.send(`**${message}**`)
  }
}