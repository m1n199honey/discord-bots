const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("np")
        .setDescription("See what's currently being played"),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// ---------------------------------

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.followUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress == "Infinity" ? "Live" : perc.progress + "%"}\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress.replace(/ 0:00/g, " ◉ LIVE"),
                        },
                    ],
                    color: 0xffffff,
                },
            ],
        });
    },
};
