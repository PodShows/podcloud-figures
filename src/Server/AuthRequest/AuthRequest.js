import jwt from "jsonwebtoken";
import config from "config";

export default function AuthRequest(request) {
  const authorization = request.get("authorization");
  const auth = { isAuthenticated: false, scope: null, user: null };
  if (authorization && authorization.startsWith("Bearer")) {
    const payload = authorization.replace(/Bearer\s+/, "");
    const decoded = jwt.decode(payload);
    if (decoded && decoded.sub === "stats") {
      const issuer_key_path = `IssuersKeys.${decoded.iss}`;
      if (config.has(issuer_key_path)) {
        try {
          const verified = jwt.verify(payload, config.get(issuer_key_path), {
            algorithms: ["RS256"]
          });

          const now = new Date() / 1000;
          const two_minutes_ago = now - 2 * 60;
          const two_minutes_from_now = now + 2 * 60;

          if (two_minutes_ago < verified.stamp) {
            if (verified.stamp < two_minutes_from_now) {
              auth.issuer = verified.iss;
              auth.isAuthenticated = true;
              auth.scope = null;
            } else {
              console.error("DeLorean token not supported");
            }
          } else {
            console.error("Token expired");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("No public key for issuer " + decoded.iss);
      }
    } else {
      console.error("Cannot find a valid JWT with stats subject.");
      console.error("found:", decoded ? decoded.sub : decoded);
    }
  }

  request.auth = auth;

  return auth;
}
