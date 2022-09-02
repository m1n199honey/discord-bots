console.log('In bot.js .....(/)');
require('dotenv').config();
const {TOKEN, guildID, clientID, authorID, audioID} = process.env
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages
        
    ] });
    client.commands = new Collection();

// ---------------------------------------------------------------

// ---------------------------------------------------------------
require(path.join(__dirname, 'handleEvents.js'))(client);
client.handleEvents();
// console.log(TOKEN);
client.login(TOKEN);