import Mongoose from "mongoose"
import process from "process"
import connectionStates from "mongoose/lib/connectionstate"

const MONGOOSE_CONNECT_OPTIONS = { autoReconnect: true }

let lastConnStr = null

const Mongo = {
  connect(conn_str) {
    if (lastConnStr == null) {
      // First time
      Mongoose.Promise = global.Promise

      Mongoose.connection.on("connecting", function() {
        console.log("connecting to MongoDB...")
      })

      Mongoose.connection.on("error", function(error) {
        console.error("Error in MongoDB connection: " + error)
        Mongoose.disconnect()
      })

      Mongoose.connection.on("connected", function() {
        console.log("MongoDB connected!")
      })

      Mongoose.connection.once("open", function() {
        console.log("MongoDB connection opened!")
      })

      Mongoose.connection.on("reconnected", function() {
        console.log("MongoDB reconnected!")
      })

      Mongoose.connection.on("disconnected", function() {
        console.log("MongoDB disconnected!")
        if (!mongoClosingExiting && lastConnStr) {
          console.log("Reconnecting using last connection string !")
          console.log(lastConnStr)
          Mongoose.connect(lastConnStr, MONGOOSE_CONNECT_OPTIONS)
        }
      })

      let mongoClosingExiting = false
      const mongoCloseOnExit = function() {
        mongoClosingExiting = true
        Mongoose.connection.close(function() {
          console.log(
            "Mongoose default connection disconnected through app termination"
          )
        })
      }
      process.on("exit", mongoCloseOnExit)
      process.on("SIGINT", mongoCloseOnExit)
    }

    lastConnStr = conn_str

    return new Promise((resolve, reject) => {
      Mongoose.connect(conn_str, { useNewUrlParser: true }).then(() => {
        resolve(Mongoose.connection, MONGOOSE_CONNECT_OPTIONS)
      }, reject)
    })
  },
  getConnection() {
    return Mongoose.connection
  }
}

export default Mongo
