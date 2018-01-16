import Mongoose from "mongoose"
Mongoose.Promise = global.Promise

const Mongo = {
  connect(conn_str) {
    const mongo = Mongoose.connect(
      conn_str,
      {
        useMongoClient: true
      },
      err => {
        if (err) {
          console.error("Could not connect to MongoDB on port 27017")
        }
      }
    )

    return mongo
  }
}.freeze()

export default Mongo