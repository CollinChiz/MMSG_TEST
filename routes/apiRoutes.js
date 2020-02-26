
var refData = require("../data/rateData");
// console.log(refData);

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.json(refData);
        // console.log(refData);
    });
}