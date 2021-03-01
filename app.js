var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser")
var initRouter = require('./routers/index')
var logger = require("morgan")
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

initRouter(app);
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "./views/index.html"))
// })

app.listen(3000, function() {
        console.log("ddang ket noi tai cong 3000");
    })
    // ll