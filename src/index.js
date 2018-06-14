import Server from "./server";
const db = new postgres.Client();

const app = (trying = 0) => {
  const db = new postgres.Client();
  db.connect()
    .then(
      function() {
        const server = new Server();
        return server.start({ port: 5000, db }, () =>
          console.log("Server is running on http://localhost:5000")
        );
      },
      err => {
        // 1 second minimum, 12 seconds maximum
        const retry_sec = Math.max(1, Math.min(12, trying + trying));
        console.error(`\n${err}\nRetrying in ${retry_sec} seconds...`);
        setTimeout(app, retry_sec * 1000, retry_sec);
      }
    )
    .then(() => {
      return db.end();
    });
};

app();
