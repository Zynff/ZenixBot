const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "setnick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You Dont Have Permissions To Change Nickname! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("Provide a user to change nick.!")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("Provide a user to change nick.!");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('Cannot change the username of this person!')

        if (!args[1]) return message.channel.send("Provide the users new nickname!");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Changed Nickname of ${member.displayName} to ${nick}`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("No Permission")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setTitle("Nickname Changed")
            .setColor("BLUE")
            .addField("User", member.user.username, true)
            .addField("Moderator", message.author.username, true)
            .addField("Changed To", args[1])
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}