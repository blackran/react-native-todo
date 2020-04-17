"use strict";
exports.__esModule = true;
function removeJump(data) {
    var loop = true;
    while (loop) {
        loop = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i]['rang'] !== i) {
                data[i]['rang'] = i;
                loop = true;
            }
        }
    }
    return data;
}
exports.removeJump = removeJump;
function moveTo(data, column, value, to) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][column] === value) {
            data[i][column] = to;
        }
        else if (data[i][column] >= to) {
            data[i][column] = data[i][column] + 1;
        }
    }
    return data;
}
exports.moveTo = moveTo;
function order(data, column) {
    var copy = data.map(function (value) {
        return value[column];
    }).sort();
    var newData = [];
    for (var i = 0; i < copy.length; i++) {
        for (var j = 0; j < copy.length; j++) {
            if (data[j][column] === copy[i]) {
                newData.push(data[j]);
            }
        }
    }
    return newData;
}
exports.order = order;
