console.log('In bot.js .....(/)');
require('dotenv').config();
const { TOKEN, audioID } = process.env
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages

    ]
});
const {
    joinVoiceChannel,
    VoiceConnectionStatus,
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    entersState
} = require('@discordjs/voice');
client.login(TOKEN);

client.on('ready', async () => {
    console.log('Discord.js client is ready!');
    const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, 'aurora.mp3'));
    const channel = client.channels.cache.get(audioID);
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    player.play(resource);
    entersState(player, AudioPlayerStatus.Playing, 50_000);
    player.on(AudioPlayerStatus.Ready, (oldState, newState) => {
        console.log('Audio player is in ready state!');
        console.log('Song is ready to play!');
    });
    // connection.on(VoiceConnectionStatus.Ready, () => { never fire
    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
        const subscription = connection.subscribe(player);
        if (subscription) {
            console.log("working !");
            setTimeout(() => { console.log("unsubscribe !"); subscription.unsubscribe() }, 40_000);
        }
    });
});



