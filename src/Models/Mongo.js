import Mongoose from "mongoose"
import connectionStates from "mongoose/lib/connectionstate"

Mongoose.Promise = global.Promise

const Mongo = {
  connect(conn_str) {
    return new Promise((resolve, reject) => {
      Mongoose.connect(conn_str).then(() => {
        resolve(Mongoose.connection)
      }, reject)
    })
  },
  getConnection() {
    return Mongoose.connection
  }
}

export default Mongo
