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

        const page = (interaction.options.get("page").value) ? 1 : interaction.options.get("page").value;
        const pageEnd = (-10 * (page - 1)) - 1;
        const pageStart = (pageEnd - 10);
        const currentTrack = queue.current;
        const tracks = queue.previousTracks.slice(pageStart, pageEnd).reverse().map((m, i) => {
            return `${i + (pageEnd * -1)}. **${m.title}** ([link](${m.url}))`;
        });

        return void interaction.followUp({
            embeds: [
                {
                    title: "Server Queue History",
                    description: `${tracks.join("\n")}${queue.previousTracks.length > (pageStart * -1)
                            ? `\n...${(queue.previousTracks.length + pageStart)} more track(s)`
                            : ""
                        }`,
                    color: 0xff0000,
                    fields: [{ name: "Now Playing", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }],
                },
            ],
        });

    },
};