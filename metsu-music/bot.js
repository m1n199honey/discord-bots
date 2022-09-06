console.log('In bot.js .....(/)');
const path = require('node:path');
require('dotenv').config();
const config = require("./config.json");
// ------------------------
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
});
client.commands = new Collection();

// ------------------------
// const {
//     joinVoiceChannel,
//     VoiceConnectionStatus,
//     AudioPlayerStatus,
//     createAudioPlayer,
//     createAudioResource,
//     entersState
// } = require('@discordjs/voice');
const { Player } = require("discord-player");
client.player = new Player(client);
// ------------------------
client.login(config.TOKEN);

client.once('ready', () => {
    require(path.join(__dirname, 'handleEvents.js'))(client);
    client.handleEvents();
    console.log("done...");
});
client.on("error", console.error);
client.on("warn", console.warn);