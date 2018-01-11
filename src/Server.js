import express from "express"
import compression from "compression"

const sendResponse = function(res, status = 200, content = "ok") {
  res.status(status)
  res.send(content)
}

const send500 = function(res, content = "An error occured") {
  sendResponse(res, 500, content)
}

const send404 = function(res, content = "Not found") {
  sendResponse(res, 404, content)
}

const requestHandler = function(req, res) {
  sendResponse(res)
}

class Server {
  constructor(listen) {
    this.listen = listen
    this.app = express()
    this.app.use(compression())
    this.app.get("*", requestHandler)
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
