An easy to use function that takes the boilerplate out of processing Web Audio microphone data.

# Usage example
```javascript
var processWebAudioMicStream = require('process-web-audio-mic-stream');
processWebAudioMicStream(function(audioData) {
    for (var i = 0; i < audioData.length; i++) {
        if (val > 0.9) {
            console.log('Oh No! Too loud!');
            return;
        }
    }
}).then(
    function() {
        // User has accepted the use of the microphone. Continue app code here.
    }, function(err) {
        // User has rejected the use of the microphone.
    }
);
```

# Docs
<a name="processWebAudioMicStream"></a>
## processWebAudioMicStream(processAudio, [audioContext]) ⇒ <code>Promise</code>
**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves/rejects once the user has allowed/disallowed the use of the microphone  

| Param | Type | Description |
| --- | --- | --- |
| processAudio | <code>[processAudioCallback](#processAudioCallback)</code> | A function that is called each time a new buffer is ready to be processed.     This function is called roughly 86 times per second. |
| [audioContext] | <code>AudioContext</code> |  |

<a name="processAudioCallback"></a>
## processAudioCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| audioData | <code>Float32Array</code> | 

