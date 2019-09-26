var fs= require('fs')
exports.updateJSON = function(province,data){
    fs.writeFile('./views/'+( province).toLowerCase()+ ".json", JSON.stringify(data), function (err) {
        console.log('Updated!!!')
      });
}