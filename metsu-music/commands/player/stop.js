const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("stop the song !"),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// -------------------------------
        queue.destroy();
        return void interaction.followUp({ content: "🛑 | Stopped the player!" });
    },
};