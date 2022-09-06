const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("play the song !")
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('which song ?')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        // --------------------------------------------
        await interaction.deferReply();

        const player = client.player;
        const searchResult = await player
            .search(interaction.options.get("query").value, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => { });
        if (!searchResult || !searchResult.tracks.length)
            return void interaction.followUp({ content: "No results were found!" });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            void player.deleteQueue(interaction.guildId);
            return void interaction.followUp({ content: "Could not join your voice channel!" });
        }

        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();

    },
};