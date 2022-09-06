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
        const page = interaction.options.getInteger("page") > 0 ? interaction.options.get("page").value : 1;



        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });


        if (pageStart > queue.tracks.length) {
            return void interaction.followUp({ content: `:x: | That page doesn#t exist.` })
        }

        return void interaction.followUp({
            embeds: [
                {
                    title: "Server Queue",
                    description: `**Currently playing:**\n🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))\n
                    ${tracks.join("\n")}${queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ""
                        }`,
                    color: 0xff0000,
                },
            ],
        });
    },
};