const { GuildMember } = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // console.log(interaction);
        console.log('interaction event is triggered ...');
        if (!interaction.isChatInputCommand() || !interaction.guildId) return;

        if (!interaction.member.voice.channel || !(interaction.member instanceof GuildMember)) {
            return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }

        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try { await command.execute(interaction, client); }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
}