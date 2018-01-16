import Server from "~/Server"
import config from "config"
import maxmind from "maxmind"
import path from "path"

const App = {
  run() {
    maxmind.open(path.join(__dirname, "/geoip/GeoLite2-City.mmdb"), (err, iplookup) => {
      if(err) throw err;
      const server = new Server(config.get("listen"))
      server.start()
    });
  }
}.freeze;

export default App;
