need 2 thing from .env TOKEN && voice channel ID
 
have to send 'join' in discord to add bot in voice channel


OUTPUT:-
    In bot.js .....(/)
    Discord.js client is ready!
    Song is ready to play!
    got a message 
    request for join !...(join msg from discord)
    AbortError: The operation was aborted(30 sec time out)
 
 problem is conection never go to ready state
 using below fuctions...

connection.on(VoiceConnectionStatus.Ready, (oldState,newState) => {
      console.log('Connection is in the Ready state!');
});
connection.on('stateChange', (oldState, newState) => {
    console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
});

player.on('stateChange', (oldState, newState) => {
   console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
});

 OUTPUT in other system...
Connection transitioned from signalling to connecting
Connection transitioned from connecting to connecting
Connection transitioned from connecting to connecting
Connection transitioned from connecting to connecting
Audio player transitioned from buffering to playing
Connection transitioned from connecting to ready
Connection is in the Ready state!

but in mine none...
with excet code (all essential packges are installed ffmpeg-static)

