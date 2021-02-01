"use strict";
exports.__esModule = true;
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function generetatePhrase(len) {
    var maxWordLen = 5;
    var response = '';
    var codeAscii = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var j = 0;
    var k = getRandomArbitrary(1, maxWordLen - 1);
    for (var i = 0; i < len; i++) {
        if (j > k) {
            response += ' ';
            j = 0;
            k = getRandomArbitrary(1, maxWordLen);
        }
        else {
            response += codeAscii[getRandomArbitrary(0, codeAscii.length - 1)];
            j++;
        }
    }
    return response;
}
exports.generetatePhrase = generetatePhrase;
