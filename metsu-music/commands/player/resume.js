const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// -------------------------------
        const paused = queue.setPaused(false);
        return void interaction.followUp({ content: paused ? "▶ | Resumed!" : "❌ | Something went wrong!" });
    },
};