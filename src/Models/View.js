import Mongoose from "mongoose"
import URL from "url"

const ObjectId = Mongoose.Schema.Types.ObjectId

const ViewSchema = new Mongoose.Schema(
  {
    source: String,

    country: String,
    city: String,
    ip: String,
    user_agent: String,
    referer: String,
    referer_host: String,

    daily_timecode: Number,
    monthly_timecode: Number,

    daily_timecode_with_ip: String,
    monthly_timecode_with_ip: String,

    feed_id: ObjectId,

    created_at: Date,
    updated_at: Date
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)

const View = Mongoose.model("View", ViewSchema)
View.ObjectId = Mongoose.Types.ObjectId

export default View
