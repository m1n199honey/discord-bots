const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bassboost")
        .setDescription("Toggle bassboost filter"),
    async execute(interaction, client) {
        // --------------------------------------------
        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes("bassboost"),
            normalizer2: !queue.getFiltersEnabled().includes("bassboost"),
            // because we need to toggle it with bass
        });

        setTimeout(() => {
            return void interaction.followUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!` });
        }, queue.options.bufferingTimeout);
    },


};