'use strict';

var getUserAudio = require('./getUserAudio');

/**
 * @callback processAudioCallback
 * @param {Float32Array} audioData
 */

/**
 * @param {processAudioCallback} processAudio
 *     A function that is called each time a new buffer is ready to be processed.
 *     This function is called roughly 86 times per second.
 * @param {AudioContext} [audioContext]
 *
 * @returns {Promise}
 *     Resolves/rejects once the user has allowed/disallowed the use of the microphone
 */
var processWebAudioMicStream = function processWebAudioMicStream(processAudio) {
    var audioContext = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return getUserAudio().then(function (stream) {
        if (!audioContext) {
            audioContext = new AudioContext();
        }
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);
        var scriptProcessorNode = audioContext.createScriptProcessor(512);
        // a buffer size of 512 will return 86 times per second at 44100hz,
        // which is plentiful for achieving 60 FPS animation

        scriptProcessorNode.onaudioprocess = function (event) {
            var buffer = event.inputBuffer.getChannelData(0);
            processAudio(buffer);
        };

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        scriptProcessorNode.connect(audioContext.destination);

        mediaStreamSource.connect(scriptProcessorNode);
    });
};
module.exports = processWebAudioMicStream;