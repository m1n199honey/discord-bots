## need 2 thing from .env TOKEN && voice channel ID<br>
    TOKEN=bibib636*%057cj_-+
    audioID=57657954536586970
## have to send 'join' in discord to add bot in voice channel


## OUTPUT:-<br>
    In bot.js .....(/)
    Discord.js client is ready!
    Song is ready to play!
    got a message 
    request for join !...(join msg from discord)
    AbortError: The operation was aborted(30 sec time out)
 
 ## problem is conection never go to ready state<br>
 ## using below fuctions...

    connection.on(VoiceConnectionStatus.Ready, (oldState,newState) => {
          console.log('Connection is in the Ready state!');
    });

    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
    });

    player.on('stateChange', (oldState, newState) => {<br>
       console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
    });

 ## OUTPUT in other system...<br>
     Connection transitioned from signalling to connecting
     Connection transitioned from connecting to connecting
     Connection transitioned from connecting to connecting
     Connection transitioned from connecting to connecting
     Audio player transitioned from buffering to playing
     Connection transitioned from connecting to ready
     Connection is in the Ready state!

## but in mine none...<br>
## it stop at VoiceConnectionStatus.Ready<br>
## with excet code (all essential packges are installed ffmpeg-static)<br>

