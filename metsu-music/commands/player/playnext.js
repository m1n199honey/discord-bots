const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("playnext")
        .setDescription("Add a song to the top of the queue")
        .addStringOption((option) => option
            .setName("query")
            .setDescription("The song you want to play next")
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// --------------------------------------------

        const searchResult = await client.player
            .search(interaction.options.get("query").value, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })
            // eslint-disable-next-line no-empty-function
            .catch(() => { });

        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" });
        queue.insert(searchResult.tracks[0]);
        await interaction.followUp({ content: "⏱ | Loading your track..." });
    },
};
