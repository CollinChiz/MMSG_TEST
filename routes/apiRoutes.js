var axios = require("axios");
var parseString = require("xml2js").parseString;

module.exports = function(app) {

    app.get("/", function(req, res) {
        console.log(res);
        fetchData()
        .then(function(data) {
            res.json(data);
            
        })
    });

    app.post("/", function(req, res) {
        fetchData()
        .then(function(data) {
            var conversionParams = {
                base_currency: "",
                base_amount: "",
                target_currency: ""
            }
            var userData = req.body;
            
            for(i=0; i<data; i++) {
                var currentCurrency = data[i];
                if(currentCurrency.currency === userData.base_currency){
                    conversionParams.base_currency = currentCurrency.currency;
                    conversionParams.base_amount = userData.base_amount;
                    conversionParams.target_currency = userData.target_currency;
                } else{
                    alert("Currency Not Found");
                }
            };
            console.log(conversionParams);


        })
    })

    function fetchData () {
        return axios
                .get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml")
                .then(function(response) {
                  var refArray = [];
                  var parseResult;
                  var xml = response.data;
                  parseString(xml, { explicitArray: "false" }, function(err, result) {
                    parseResult =
                      result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
                  });
                  for (i = 0; i < parseResult.length; i++) {
                   refArray.push(parseResult[i].$);
                }
                       return refObject = {
                           data: refArray
                       }
            })
    }
}
