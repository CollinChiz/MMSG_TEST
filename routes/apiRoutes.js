var axios = require("axios");
var parseString = require("xml2js").parseString;

module.exports = function(app) {

    app.get("/", function(req, res) {
        fetchData()
        .then(function(data) {
            res.json(data);
            
        })
    });

    app.post("/", function(req, res) {
        fetchData()
        .then(function(data) {

                var userData = req.query;

                var target_amount = "";
                var base_currency = "";
                var base_currencyRate = "";
                var base_amount = "";
                var target_currency = "";
                var conversionObject = {};
                        
            for(i=0; i<data.data.length; i++) {
                var currentCurrency = data.data[i];
                if(currentCurrency.currency === userData.currency){
                    base_currencyRate = currentCurrency.rate;
                    base_amount = userData.base_amount;
                    base_currency = base_amount / base_currencyRate;
                    
                } else{
                    // console.log("not found");
                }
                if(currentCurrency.currency === userData.target_currency){
                    var targetRate = currentCurrency.rate;
                    target_amount = base_currency * targetRate;
                    target_currency = userData.target_currency;
                    conversionObject = {
                        currency: target_currency,
                        amount: target_amount
                    }
                }
            };
            res.json(conversionObject)
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
