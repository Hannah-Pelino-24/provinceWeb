const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
var numRequest = require('./numRequest')
var readJSON = require('./readJSON')
var updateJSON = require('./updateJSON')

app.set('view engine', 'pug')

app.use(function (req, res, next) {
    console.log('url', req.originalUrl)
    numRequest.numRequest(req, res, req.originalUrl);
    next();
})

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.get('/provinces/:provinceName', (req, res) => {
    var province = req.params.provinceName
    // var pingCount = "";
    var data = JSON.parse(readJSON.readJSON(province));
    numRequest.numRequest()
    res.render('index', data);
})

app.get('/rate', (req, res) => {
    var id = req.query.id;
    var province = req.query.province;
    var data = JSON.parse(readJSON.readJSON(province));
    data.ratings.push(Number(id))
    var sum = 0;
    data.ratings.forEach(rating => {
        sum += Number(rating)
    });
    data.averageRate = sum / 2
    console.log(data.averageRate)
    updateJSON.updateJSON(province, data)
    res.end("" + data.averageRate)
})

app.listen(8080, function () {
    console.log('Server running...')
})