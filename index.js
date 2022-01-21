// Import required components from ServerFire
const {Server, bodyparser, Router, route, generateMiddleware, tools} = require('serverfire');

const editForumPost = require("./edit.js");

// Create router middleware
const router = new Router();
const r = route(router);

// Create server
const server = new Server();
server.create();

// Add CORS; ideal for API development
server.use(tools.cors);
// Add bodyparser for parsing POST requests
server.use(bodyparser);
// Include router in server
server.use(r);

// POST request
router.post('/edit', (req, res) => {
    console.log(`Incoming edit from ${req.body.username} to post ${req.body.id}`);
    editForumPost(req.body.username, req.body.password, req.body.id, req.body.title, req.body.content);
    res.send("Success");
});


// Start server
server.listen(3000);
