var fs = require('fs');
exports.readJSON = function (province) {
    var content=fs.readFileSync('./views/' +province + '.json','utf8');
    return content;
}