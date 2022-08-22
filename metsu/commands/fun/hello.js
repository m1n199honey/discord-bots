const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with hello!"),
  async execute(command) {
    await command.reply("olleh !");
  },
};
