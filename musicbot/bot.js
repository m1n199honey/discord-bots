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

    try {
        await playSong();
        console.log('Song is ready to play!');
    } catch (error) {
        console.error(error);
    }
});
const player = createAudioPlayer();
function playSong() {
    const resource = createAudioResource(path.join(__dirname,'aurora.mp3'));

    player.play(resource);

    return entersState(player, AudioPlayerStatus.Playing, 50_000);
}

client.on('messageCreate', async (message) => {
    console.log("got a message ");
    // if (!message.guild) return;

    if (message.content === 'join') {
        console.log("request for join !...")
        const channel = client.channels.cache.get(audioID);

        if (channel) {
            try {
                const connection = await connectToChannel(channel);
                connection.subscribe(player);
                message.reply('Playing now!');
            } catch (error) {
                console.error(error);
            }
        } else {
            message.reply('Join a voice channel then try again!');
        }
    }
});
async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
}




// client.on('ready',() => {
    
//     const channel = client.channels.cache.get(audioID);
//     const connection = joinVoiceChannel({
//         channelId: channel.id,
//         guildId: channel.guild.id,
//         adapterCreator: channel.guild.voiceAdapterCreator,
//     });

//     connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
//         console.log('Connection is in the Ready state!');
//         playSong();

//     });

//     player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
//         console.log('Audio player is in the Playing state!');
//     });
//     connection.on('stateChange', (oldState, newState) => {
//         console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
//     });

//     player.on('stateChange', (oldState, newState) => {
//         console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
//     });
// });


