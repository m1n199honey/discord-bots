var fs = require('fs');
var path = require('node:path');
var { ch102ID } = process.env;
// ------------------------------------------------
var word = '';
var flag = 0;
function guess(obj, arry) {
    var keys = Object.keys(obj);
    keys.forEach((key) => {
        var inKey = key.split(/,\s?/);
        inKey.forEach((l) => {
            l == arry[0] && (word += inKey[0]) && guess(obj[key], arry.slice(1));
        });
    });
    !arry[0]&&(flag=obj.flag);
}
// ---------------------------------------------------
var guessLetters;
fs.readFile(path.join(__dirname,'forbidenWord.json'), 'utf8', function (err, data) {
    if (err) throw err;
    guessLetters = JSON.parse(data);
});
// --------------------------------------------------
module.exports = {
    name: 'messageCreate',
    async execute(message) {
        console.log('message event is triggered ...');
        if (message.channelId == ch102ID)
            require(path.join(__dirname, 'makeThreads.js'))(message);
        // guess(guessLetters,message.content.split(''));
        // try {
        //     if (flag){
        //         flag = 0;
        //         return await message.reply("ban :upside_down: ?");
        //     }
        //     }
        // catch (error) { console.error(error); }
    }
}