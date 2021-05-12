const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: 'Kicks a user!',
    timeout : 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");

            if (!args[0]) return message.channel.send('**Enter A User To Kick!**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**User Is Not In The Guild!**");

            if (kickMember.id === message.member.id) return message.channel.send("**You Cannot Kick Yourself!**")

            if (!kickMember.kickable) return message.channel.send("**Cannot Kick This User!**")
            if (kickMember.user.bot) return message.channel.send("**Cannot Kick A Bot!**")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("User Kicked")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Member:", `${member}`, true)
                .addField("User:", `${message.author.username}`, true)
                .addField("Reason:", `${reason}`)
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}