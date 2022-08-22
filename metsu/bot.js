console.log('In bot.js .....(/)');
require('dotenv').config();
const {TOKEN, guildID, clientID, authorID} = process.env
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages

    ] });
client.commands = new Collection();


require(path.join(__dirname, 'handleEvents.js'))(client);
client.handleEvents();
// console.log(TOKEN);
client.login(TOKEN);