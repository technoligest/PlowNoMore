"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', function (req, res) {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World!');
    req.body;
});
router.get('/:name', function (req, res) {
    // Extract the name from the request parameters
    var name = req.params.name;
    // Greet the given name
    res.send("Hellos, " + name);
});
// Export the express.Router() instance to be used by server.ts
exports.APIController = router;
