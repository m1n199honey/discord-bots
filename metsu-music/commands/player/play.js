const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song from youtube")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("which song ?")
                .setRequired(true),
        ),
    async execute(interaction, client) {
        await interaction.deferReply();
// --------------------------------------------

        const searchResult = await client.player
            .search(interaction.options.get("query").value, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })
            // eslint-disable-next-line no-empty-function
            .catch(() => { });
        if (!searchResult || !searchResult.tracks.length)
            // eslint-disable-next-line curly
            return void interaction.followUp({ content: "No results were found!" });

        const queue = await client.player.createQueue(interaction.guild, {
            ytdlOptions: {
                filter: "audioonly",
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: interaction.channel,
        });
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        // eslint-disable-next-line brace-style
        } catch {
            void client.player.deleteQueue(interaction.guild);
            return void interaction.followUp({ content: "Could not join your voice channel!" });
        }

        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    },


};