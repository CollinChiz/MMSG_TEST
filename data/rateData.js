var axios = require("axios");
var parseString = require('xml2js').parseString;
var inspect = require("eyes").inspector({maxLength: false});

var fetchData = function () {
    var refData;

    axios.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml").then(function(response) {
        var dataResult;
        var xml = response.data;
            parseString(xml, {explicitArray: "false"}, function(err, result) {
                dataResult = result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
            });
            console.log(dataResult);
            refData = JSON.stringify(dataResult)
            return refData;
        })
        console.log(refData);
}
fetchData();

// module.exports = refData;
    
    