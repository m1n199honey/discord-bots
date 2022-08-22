const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(command) {
    try {
      await command.reply('Pong!');
    }
    catch (e) {
      console.log(e);
    }
    let msg = await command.channel.send(':ping_pong:');
    msg.edit(`
    :ping_pong:
    Uptime: ${command.client.uptime / 1000} seconds
    Websocket heartbeat: ${command.client.ws.ping}ms.
    Roundtrip latency: ${msg.createdTimestamp - command.createdTimestamp}ms
    `);
  },
};
