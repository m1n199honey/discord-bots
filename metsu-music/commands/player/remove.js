const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Remove a specific track")
        .addIntegerOption((option) => option
            .setName("track")
            .setDescription("number of tracks to remove")
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// -------------------------------
        const trackIndex = interaction.options.get("track").value;
        if (queue.tracks.length > trackIndex > 0) {
            const trackName = queue.tracks[trackIndex + 1 ].title;
            interaction.followUp({ content: `❌ | Removed track ${trackName}.` });
            queue.remove(trackIndex);
        }
        else {
            interaction.followUp({ content: "❌ | Nothing Removed try again with correct value" });
        }

    },
};