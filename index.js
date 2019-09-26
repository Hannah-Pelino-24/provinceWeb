const path = require('path')
const express = require('express')
const app = express()
var numRequest = require('./numRequest')
var readJSON = require('./readJSON')
var updateJSON = require('./updateJSON')

app.set('view engine', 'pug')

app.use(function (req, res, next) {
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
    console.log(req.query)
    var data = JSON.parse(readJSON.readJSON(province));
    var average = Number(data.averageRate) + Number(id)
    if (data.averageRate == 0) {
        data.averageRate = average;
        data.averageRate = Number(Number(data.averageRate).toFixed(1))
        updateJSON.updateJSON(province, data)
        res.end((data.averageRate).toString())
    } else {
        data.averageRate = average;
        data.averageRate = Number(Number(data.averageRate / 2).toFixed(1))
        updateJSON.updateJSON(province, data)
        res.end((data.averageRate).toString())
    }
})

app.listen(8080, function () {
    console.log('Server running...')
})