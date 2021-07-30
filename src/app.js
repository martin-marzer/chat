const http = require("http");

const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


require("./sockets")(io);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting files
server.listen(PORT, () => {
    console.log("Todo correcto");

})



