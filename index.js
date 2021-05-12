const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const mongoose = require('mongoose');
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setActivity(`${prefix}help | ${client.users.cache.size} servers`)
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on("message", async message => {
    function Check(str) {
      if (
        client.emojis.cache.find(emoji => emoji.name === str) ||
        message.guild.emojis.cache.find(emoji => emoji.name === str)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (message.content.startsWith(":") && message.content.endsWith(":")) {
      let EmojiName = message.content.slice(1, -1);
  
      if (Check(EmojiName) === true) {
        const channel = client.channels.cache.get(message.channel.id);
        try {
          let webhooks = await channel.fetchWebhooks();
          let webhook = webhooks.first();
          if (webhook === undefined || null || !webhook) {
            let Created = channel
              .createWebhook("Bloxiphy", {
                avatar:
                  "https://cdn.discordapp.com/avatars/708580906880860171/a_229b573176f79643d7fa5f6f7d8aed63.gif?size=256"
              })
              .then(async webhook => {
                const emoji =
                  client.emojis.cache.find(e => e.name == EmojiName).id ||
                  message.guild.emojis.cache.find(e => e.name === EmojiName).id;
  
                await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                  username: message.author.username,
                  avatarURL: message.author.avatarURL({ dynamic: true })
                });
                message.delete();
              });
          }
  
          const emoji =
            client.emojis.cache.find(e => e.name == EmojiName).id ||
            message.guild.emojis.cache.find(e => e.name === EmojiName).id;
  
          await webhook.send(`${client.emojis.cache.get(emoji)}`, {
            username: message.author.username,
            avatarURL: message.author.avatarURL({ dynamic: true })
          });
          message.delete();
        } catch (error) {
          console.log(`Error :\n${error}`);
        }
      }
    }
  });
client.login(token)
