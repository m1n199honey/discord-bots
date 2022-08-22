const { SlashCommandBuilder } = require("discord.js");
const path = require('node:path');
const { version } = require(path.join(__dirname, '..', '..', 'package.json'));
const { prefix } = require(path.join(__dirname, '..', '..', 'config.json'));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Replies with bot info!"),
    async execute(command) {
        await command.reply('wait a little fatching data...');
      const aboutObj = {
        footer: {
          text: 'Made with 💖 & discord.js',
          icon_url: 'https://i.imgur.com/U4U2cPU.png',
          proxy_icon_url: 'https://images-ext-1.discordapp.net/external/CMaZlkTJ__mjsFwpDAFFiJen1GnEd7SI56dOcgoAXu8/https/i.imgur.com/U4U2cPU.png',
        },
        fields: [
          {
            name: 'Language',
            value: '[Javascript](https://www.javascript.com/)',
            inline: true,
          },
          {
            name: 'Framework',
            value: '[Discord.js](https://discord.js.org/)',
            inline: true,
          },
          {
            name: 'Github',
            value: '[Link](https://github.com/Yakiyo/Yume-Bot)',
            inline: true,
          },
        ],
        color: 1212125,
        type: 'rich',
        description: `
        ##Metsu bot is a discord bot dedicated to the hachi discord server.
        Made by hachimetsu#7929.
        **Current Version:** ${version}
        \nMy prefix is \`${prefix}\`. 
        For a list of my commands do \`${prefix}help\`.
        \nDiscord: [join my server](https://discord.gg/q2zDU5bGnh)
        `,
        title: 'metsu Bot',
      };
        command.channel.send({ embeds: [aboutObj] });
    },
};