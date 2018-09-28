"use strict";
/* app/server.ts */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// Import WelcomeController from controllers entry point
var controllers_1 = require("./controllers");
var controllers_2 = require("./controllers");
// Create a new express application instance
var app = express_1.default();
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
app.use(body_parser_1.default.json());
// The port the express app will listen on
var port = 3000;
// Mount the WelcomeController at the /welcome route
app.use('/welcome', controllers_1.WelcomeController);
app.use('/api', controllers_2.APIController);
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
