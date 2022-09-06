const { SlashCommandBuilder } = require("discord.js");
// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear the current queue."),
    async execute(interaction, client) {
        // --------------------------------------------
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guild);
        if (!queue) return void interaction.followUp({ content: "❌ | No music in the queue!" });

        queue.clear();

        interaction.followUp({ content: "❌ | Queue cleared." });
    },
};