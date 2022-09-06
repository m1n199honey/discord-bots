const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("see the queue ")
        .addIntegerOption((option) => option
            .setName("page")
            .setDescription("Enter page number in queue")
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        // -------------------------------------------------
        const page = interaction.options.get("page").value;
        if (page > 0) {

            const pageStart = 10 * (page - 1);
            if (pageStart > queue.tracks.length) {
                const pageEnd = pageStart + 10;
                const currentTrack = queue.current;
                const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
                    return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
                });

                return void interaction.followUp({
                    embeds: [
                        {
                            title: "Server Queue",
                            description: `${tracks.join("\n")}${queue.tracks.length > pageEnd
                                ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                                : ""
                                }`,
                            color: 0xff0000,
                            fields: [{ name: "Now Playing", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }],
                        },
                    ],
                });
            }
        }
    },
};