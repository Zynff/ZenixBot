const { Client, Message, MessageEmbed } = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    run: async(client, message, args) => {
        if(message.author.id !== '703037468001435728') return message.reply(`Sorry ${message.author.username} but this is for owner only!`)
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};