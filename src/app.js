import Server from "~/Server"
import config from "config"
import maxmind from "maxmind"
import path from "path"

maxmind.open(path.join(__dirname, "/geoip/GeoLite2-City.mmdb"), (err, iplookup) => {
    if(err) throw err;
    const server = new Server(config.get("listen"))
    server.start()
});