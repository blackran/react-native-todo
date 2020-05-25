"use strict";
exports.__esModule = true;
var Array_1 = require("./array/Array");
var listJours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
];
function loopObject(copyData) {
    var stockFinish = copyData[listJours[0]].filter(function (e) {
        var stock = Object.entries(copyData).map(function (_a) {
            var key = _a[0], subject = _a[1];
            var d = subject;
            var h = e;
            h.idTasks = 0;
            var w = d.filter(function (m) {
                m.idTasks = 0;
                return JSON.stringify(m) === JSON.stringify(h);
            });
            return w.length > 0;
        });
        return stock.indexOf(false) < 0;
    });
    var stockRest = JSON.parse(JSON.stringify(copyData));
    Object.entries(copyData).map(function (_a) {
        var key = _a[0], subject = _a[1];
        var r = subject;
        var stock = stockFinish.map(function (e) {
            r = r.filter(function (o) {
                var d = o;
                d.idTasks = 0;
                // console.log('=================================================================================')
                // console.log(d, e)
                return (JSON.stringify(d) !== JSON.stringify(e));
            });
        });
        stockRest[key] = r;
        return null;
    });
    // console.log(setTrueIdTasks(stockFinish, stockRest))
    return setTrueIdTasks(stockFinish, stockRest);
}
exports.loopObject = loopObject;
function convertStringNumber(date) {
    var _a = date.split(':'), heure = _a[0], minute = _a[1], second = _a[2];
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000));
}
function InverseLoopObject(data) {
    var finish = data['finish'];
    var rest = data['rest'];
    var listTasks = {
        Alahady: [],
        Alatsinainy: [],
        Talata: [],
        Alarobia: [],
        Alakamisy: [],
        Zoma: [],
        Sabotsy: []
    };
    var oneDay = 24 * 60 * 60 * 1000;
    Object.entries(rest).map(function (data, i) {
        var _a;
        // console.log('===============================================================================================')
        // @ts-ignore
        var subject = data[1];
        for (var j = 0; j < subject.length; j++) {
            subject[j]['idTasks'] = (oneDay * i) + convertStringNumber(subject[j]['heureDebut']);
            listTasks[listJours[i]].push(subject[j]);
        }
        finish.map(function (h) {
            h.idTasks = (oneDay * i) + convertStringNumber(h.heureDebut);
        });
        (_a = listTasks[listJours[i]]).push.apply(_a, finish);
    });
    Object.entries(listTasks).map(function (data, i) {
        var subject = data[1];
        subject = Array_1.order(subject, 'idTasks');
    });
    return listTasks;
}
exports.InverseLoopObject = InverseLoopObject;
function setTrueIdTasks(finish, rest) {
    var response = { finish: [], rest: [] };
    var stockRest = {
        Alahady: [],
        Alatsinainy: [],
        Talata: [],
        Alarobia: [],
        Alakamisy: [],
        Zoma: [],
        Sabotsy: []
    };
    var oneDay = 24 * 60 * 60 * 1000;
    Object.entries(rest).map(function (data, i) {
        // console.log('===============================================================================================')
        // @ts-ignore
        var subject = data[1];
        for (var j = 0; j < subject.length; j++) {
            subject[j]['idTasks'] = (oneDay * i) + convertStringNumber(subject[j]['heureDebut']);
            stockRest[listJours[i]].push(subject[j]);
        }
    });
    finish.map(function (h) {
        h.idTasks = (oneDay * 7) + convertStringNumber(h.heureDebut);
    });
    Object.entries(stockRest).map(function (data, i) {
        var subject = data[1];
        subject = Array_1.order(subject, 'idTasks');
    });
    var stockFinish = Array_1.order(finish, 'idTasks');
    //
    response['finish'] = stockFinish;
    response['rest'] = stockRest;
    return response;
}
exports.setTrueIdTasks = setTrueIdTasks;
