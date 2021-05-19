const { ADD_VOTE, GET_UPDATED_OPTIONS } = require("./socket-events");

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/create-vote", (req, res) => {
  // should save the options array in db
});

io.on("connection", function (socket) {
  console.log("New user connected!");
  socket.on(ADD_VOTE, (updatedOptions) => {
    io.emit(GET_UPDATED_OPTIONS, updatedOptions);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
