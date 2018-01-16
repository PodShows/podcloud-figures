import Mongoose from "mongoose"
import URL from "url"

const ObjectId = Mongoose.Schema.Types.ObjectId

const ViewSchema = new Mongoose.Schema({
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
})

const View = Mongoose.model("View", ViewSchema)

View.fromRequest = (request, geolookup) => {
  const ip = request.ip
  const city = (geolookup && geolookup.city) || ""
  const country = (geolookup && geolookup.country) || ""

  const referer = req.headers.referer || ""
  const referer_host = () => {
    try {
      return new URL(referer).hostname
    } catch (e) {}

    return null
  }

  const now = new Date()

  const daily_timecode = +Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0,
    0,
    0,
    0
  )

  const monthly_timecode = +Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    0,
    0,
    0,
    0,
    0
  )

  return new View({
    source: "feed",
    ip,
    user_agent: request.headers["user-agent"],
    city,
    country,
    referer,
    referer_host: daily_timecode,
    daily_timecode_with_ip: daily_timecode + "_" + ip,
    monthly_timecode,
    monthly_timecode_with_ip: monthly_timecode + "_" + ip
  })
}

export default View
