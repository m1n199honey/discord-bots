const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("jump")
        .setDescription("Jump to a specific track")
        .addIntegerOption((option) => option
            .setName("tracks")
            .setDescription("number of tracks to skip")
            .setRequired(true),
            ),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// -------------------------------------------------
        const trackIndex = interaction.options.get("tracks").value;
        if (queue.tracks.length > trackIndex > 0) {
                const trackName = queue.tracks[trackIndex + 1].title;
                queue.jump(trackIndex);
                interaction.followUp({ content: `⏭ | **${trackName}** has jumped the queue!` });
            }
            else {
                interaction.followUp({ content: "⏭ on same track ..!" });

            }

        },
    };
