# metsu Discord Music Bot

## Features

### Highlights

* Audio filters (bassboost)
* YouTube, Facebook and Vimeo support

### Commands

Here are all the available commands in the bot!

|      Name      |            Description             |  Options  |
|:---------------|:----------------------------------:|----------:|
|   **/back**    |      Play the previous track       |           |
| **/bassboost** |      Toggle bass boost filter      |           |
|   **/clear**   |      Clear the current queue.      |           |
|  **/history**  |     Display the queue history      |  \<page>  |
|   **/jump**    |      Jump to a specific track      | \<tracks> |
|   **/loop**    |           Set loop mode            |  \<mode>  |
|    **/np**     | See what's currently being played  |           |
|   **/pause**   |       Pause the current song       |           |
|   **/play**    |      Play a song from youtube      | \<query>  |
| **/playnext**  | Add a song to be played next       | \<query>  |
|   **/queue**   |           See the queue            |  \<page>  |
|  **/remove**   |      Remove a specific track       | \<track>  |
|  **/resume**   |      Resume the current song       |           |
|   **/skip**    |      Skip  the current song        |           |
|   **/stop**    |          Stop the player           |           |

## About

The project uses the following libraries:
* **[discordjs](https://github.com/discordjs/discord.js)** for all the other requests to the Discord API
* **[@discordjs/voice](https://github.com/discordjs/voice)** for all the **voice** requests to the Discord API
* **[@discordjs/opus](https://github.com/discordjs/opus)** as the opus library
* **[FFMPEG](https://ffmpeg.org)** to encode the stream

## Installation

### Manual
## follow these steps for complete setup 
* **clone metsu-music directory using** `https://github.com/hachimetsu/discord-bots.git`
* **type command** `npm run setup`
* **open config.json and add these values**

        {
            "TOKEN": "<YOUR BOT TOKEN here ...>",
            "guildID": "<SERVER/GUILD ID here >",
            "clientID": "BOT/CLIENT ID here..."
        }
        
* **If runing bot 1st time command must be deployed first...** `npm run deploy`
        
* **next time u can run bot (if u have not changed command ) using ...** `npm run bot`

# contributer 
* 