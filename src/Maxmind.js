import path from "path";
import maxmind from "maxmind";

const instance = maxmind.openSync(
    path.resolve(__dirname + "/../geoip/GeoLite2-City.mmdb")
);

export default instance;
