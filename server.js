var express = require("express");
var cors = require("cors");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});