import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "config";

const checkRequestHash = (request, hash) =>
  crypto
    .createHash("sha256")
    .update(request.body.toString(), "utf-8")
    .digest("hex") == hash;

export default function AuthRequest(request) {
  const authorization = request.get("authorization");
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

          if (
            checkRequestHash(request, verified.stamp)
          ) {
            request.auth = {
              issuer: verified.iss,
              isAuthenticated: true,
              scope: null
            };
          } else {
            console.error("Request hash mismatch");
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
  
  if (!request.auth) {
    request.auth = { isAuthenticated: false, scope: null, user: null };
  }

  return request.auth;
}
