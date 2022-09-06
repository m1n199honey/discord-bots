const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skip the song !"),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const success = queue.skip();
        return void interaction.followUp({
            content: success ? `✅ | Skipped **${queue.current}**!` : "❌ | Something went wrong!",
        });
    },
};