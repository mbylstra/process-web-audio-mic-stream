module.exports = function () {

    // monkeypatch getUserMedia
    navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    var options = {
        "audio": {
            "mandatory": {
                "googEchoCancellation": "false",
                "googAutoGainControl": "false",
                "googNoiseSuppression": "false",
                "googHighpassFilter": "false"
            },
            "optional": []
        }
    };

    return new Promise(function (resolve, reject) {
        navigator.getUserMedia(
            options,
            function (stream) { // success callback
                resolve(stream);
            },
            function (error) { //error callback
                reject(error);
            }
        );
    });
};



