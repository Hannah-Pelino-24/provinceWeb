exports.numRequest = function (req, res, url) {
    const fs = require('fs');
    if (url!= undefined) {
        
    fs.appendFile('requestURL.txt', url+',', function (err) {
        if(err){

        }else{
            fs.readFile('requestURL.txt', function (err, data) {
                if (err) console.log(err);
                var dataText = data.toString();
                var splittedData = dataText.split(",");
                 
                // console.log(splittedData);
                fs.writeFile('request.txt', splittedData.length-1, function (err) {
                    if (err) console.log(err);
                })
        
            })
        }
    })
}    
}