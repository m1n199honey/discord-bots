var { time } = require('discord.js');
module.exports = (message) => {
    console.log('inside makeThreads...');
    var sec = message.createdTimestamp;
    const date = new Date(sec);
    var d = '';
    if(date.getDate() < 10) d += '0';
        d += date.getDate() + '-';
    if(date.getMonth() < 10) d += '0';
        d += date.getDate()+1 + '-' + date.getFullYear();
    
    message.startThread({
        name: `${message.author.username} (${d})`,
        autoArchiveDuration: 60,
        reason: 'make threads on client\'s message',
    })
        .catch(console.error);
}