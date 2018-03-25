import config from "config"
import path from "path"

import express from "express"
import compression from "compression"

const sendResponse = function(res, status, content) {
  res.status(status)
  if (typeof content === "object") {
    res.jsonp(content)
  }
}

const send200 = function(res, content = "ok") {
  sendResponse(res, 200, content)
}

const send500 = function(res, content = "An error occured") {
  sendResponse(res, 500, content)
}

const send404 = function(res, content = "Not found") {
  sendResponse(res, 404, content)
}

const requestHandler = function(req, res) {
  try {
    sendResponse(res, 418, "Not implemented yet.")
  } catch (e) {
    console.error(e)
    send500(res)
  }
}

class Server {
  constructor(listen, geolookup) {
    this.listen = listen
    this.geolookup = geolookup
    this.app = express()
    this.app.use(compression())
    this.app.put("/p/:guid", requestHandler)
    this.app.get("/e/:guid", (req, res) =>
      sendResponse(res, 418, "Not implemented yet.")
    )
    this.app.all("*", (req, res) => send404(res))
  }

  start() {
    const address = isNaN(parseInt(this.listen, 10))
      ? this.listen
      : `http://localhost:${this.listen}/`
    this.app.listen(this.listen, () =>
      console.log(`RSS server is now running on ${address}`)
    )
  }
}

export default Server

export const ServerCommand = {
  command: "server",
  describe: "Launch a server waiting for connections",
  builder: {},
  handler() {
    const server = new Server(config.get("listen"))
    server.start()
  }
}
