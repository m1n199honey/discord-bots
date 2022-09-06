const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");

// const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Set loop mode")
        .addIntegerOption((option) => option
            .setName("mode")
            .setDescription("Loot type (choose no 1-4)")
            .addChoices(
                { name: "OFF", value: QueueRepeatMode.OFF },
                { name: "TRACK", value: QueueRepeatMode.TRACK },
                { name: "QUEUE", value: QueueRepeatMode.QUEUE },
                { name: "AUTOPLAY", value: QueueRepeatMode.AUTOPLAY },
            )
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
// ---------------------------------------------

        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    },
};
