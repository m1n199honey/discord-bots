require('dotenv').config();
const config = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');
const {  Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' }).setToken(config.TOKEN);

// setting-commands--------------------------------------------------------------------------------------------------
    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');
    for (const folder of fs.readdirSync(commandsPath)) {
        const folderPath = path.join(commandsPath, folder);
        for (const file of fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"))) {
            commands.push(require(path.join(folderPath, file)).data.toJSON());
        }
    }


// inseart-commands--------------------------------------------------------------------------------------------------
    rest.put(Routes.applicationGuildCommands(config.clientID, config.guildID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);


// const commandId = '10656556585208';
// Delete-one-command-using-ID--------------------------------------------------------------------------------------------------
    // for guild-based commands
        // rest.delete(Routes.applicationGuildCommand(config.clientID, config.guildID, commandId))
        //             .then(() => console.log('Successfully deleted guild command'))
        //             .catch(console.error);

// for global commands--------------------------------------------------------------------------------------------------

        // rest.delete(Routes.applicationCommand(config.clientID, commandId))
        //     .then(() => console.log('Successfully deleted application command'))
        //     .catch(console.error);
        
// Delete-all-commands-at-once-------------------------------------------------------------------------------------------------
    // for guild-based commands
        // rest.put(Routes.applicationGuildCommands(config.clientID, config.guildID), { body: [] })
        //     .then(() => console.log('Successfully deleted all guild commands.'))
        //     .catch(console.error);

    // for global commands
        // rest.put(Routes.applicationCommands(config.clientID), { body: [] })
        //     .then(() => console.log('Successfully deleted all application commands.'))
        //     .catch(console.error);