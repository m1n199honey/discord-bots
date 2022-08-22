module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // console.log(message);
        console.log('message event is triggered ...');

        try { if (message.content.startsWith('ping')) 
                return await message.reply("pong");
            }
        catch (error) { console.error(error); }
    }
}