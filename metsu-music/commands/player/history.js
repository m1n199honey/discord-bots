const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("history")
        .setDescription("Display the queue history")
        .addIntegerOption((option) => option
            .setName("page")
            .setDescription("Enter page number")
            .setRequired(false)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        // -------------------------------------------

        const previousTracks = require('../../events/player/allEvents.js').previousTracks;
        const page = (interaction.options.getInteger("page") || interaction.options.getInteger("page") > 0) ? interaction.options.get("page").value : 1;
        const pageStart = (page - 1) * 10 + 1;
        const pageEnd = pageStart + 10;
        if (pageStart > previousTracks.length) {
            return void interaction.followUp({ content: `:x: | That page doesn't exist.` })
        }
        const currentTrack = queue.current;
        const tracks = previousTracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart}. **${m.title}** ([link](${m.url}))`;
        });

        return void interaction.followUp({
            embeds: [
                {
                    title: "Server Queue History",
                    description: `**Currently playing:**\n🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))\n
                    ${tracks.join("\n")}${previousTracks.length > pageEnd
                            ? `\n...${previousTracks.length - pageEnd} more track(s)`
                            : ""
                        }`,
                    color: 0xff0000
                },
            ],
        });

    },
};