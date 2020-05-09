"use strict";
exports.__esModule = true;
function convertArrayToString(date) {
    var heure = date[0] + '';
    var minute = date[1] + '';
    var second = date[2] + '';
    if (date[0] < 10) {
        heure = '0' + date[0];
    }
    if (date[1] < 10) {
        minute = '0' + date[1];
    }
    if (date[2] < 10) {
        second = '0' + date[2];
    }
    return heure + ':' + minute + ':' + second;
}
exports.convertArrayToString = convertArrayToString;
function convertStringToArray(date) {
    var _a = date.split(':'), debut = _a[0], fin = _a[1], second = _a[2];
    return [parseInt(debut, 10), parseInt(fin, 10), parseInt(second, 10)];
}
exports.convertStringToArray = convertStringToArray;
function convertStringNumber(date) {
    var _a = date.split(':'), heure = _a[0], minute = _a[1], second = _a[2];
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000));
}
exports.convertStringNumber = convertStringNumber;
function betweenTwoString(debut, fin) {
    if (debut && fin) {
        var stock = convertStringNumber(fin) - convertStringNumber(debut);
        if (stock < 0) {
            return stock + (24 * 60 * 60 * 1000);
        }
        else {
            return stock;
        }
    }
    else {
        return 0;
    }
}
exports.betweenTwoString = betweenTwoString;
function convertDateToArray(seconds) {
    // var minute = second / 60 * 1000
    var heure = parseInt((Math.abs(seconds / (60 * 60 * 1000)) + '').split('.')[0], 10);
    var minute = Math.abs(Math.round((seconds - (heure * 60 * 60 * 1000)) / (60 * 1000)));
    var second = Math.abs(seconds - (heure * (60 * 60 * 1000)) - (minute * (60 * 1000)));
    return [heure, minute, second];
}
exports.convertDateToArray = convertDateToArray;
// export function convertDateToString(second: number): string {
//      return convertArrayToString(convertDateToArray(second))
// }
function betweenTwoDate(begin, end) {
    var stock = convertStringNumber(convertArrayToString(end)) - convertStringNumber(convertArrayToString(begin));
    var day = '07';
    if (stock < 0) {
        day = '08';
    }
    var start = new Date('1996-07-22T' + convertArrayToString(begin) + ':00').valueOf();
    var finish = new Date('1996-' + day + '-22T' + convertArrayToString(end) + ':00').valueOf();
    var between = finish - start;
    return convertDateToArray(between);
}
exports.betweenTwoDate = betweenTwoDate;
function isBetweenTwoDate(debut, fin, date) {
    var secondDebut = convertStringNumber(debut);
    var secondFin = convertStringNumber(fin);
    var secondDate = convertStringNumber(date);
    if (secondFin < secondDebut) {
        secondFin = secondFin + (24 * 60 * 60 * 1000);
    }
    // if ()
    return (secondDebut < secondDate && secondDate < secondFin);
}
exports.isBetweenTwoDate = isBetweenTwoDate;
