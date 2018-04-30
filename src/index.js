import Server from "./server";

const server = new Server();
server.start({ port: 5000 }, () =>
  console.log("Server is running on http://localhost:5000")
);
