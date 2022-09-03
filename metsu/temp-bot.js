console.log('In bot.js .....(/)');
require('dotenv').config();
const { TOKEN, guildID, clientID, authorID, audioID } = process.env
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState } = require('@discordjs/voice');
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages

    ]
});

client.on("ready", () => {
    const channel = client.channels.cache.get(audioID);
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const resource = createAudioResource(path.join(__dirname,'aurora.mp3'));
    const player = createAudioPlayer();
    

    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
        player.play(resource);
        const subscription = connection.subscribe(player);
        if (subscription) {
            console.log("working !");
            setTimeout(() => { console.log("player stop !"); player.stop() }, 30_000);
            setTimeout(() => { console.log("unsubscribe !"); subscription.unsubscribe() }, 60_000);
        }
    });
        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
        console.log('Connection is in the Ready state!');
        playSong();

    });
    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
    });

    player.on('stateChange', (oldState, newState) => {
        console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
    });

}); 

client.login(TOKEN);