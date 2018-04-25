import jwt from "jsonwebtoken";
import config from "config";

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export function authenticatedToken(token) {
  const decoded = jwt.decode(token, null, { subject: "stats" });

  const issuer_pubkey = config.get(`IssuersKeys.${decoded.iss}`);

  return jwt.verify(token, issuer_pubkey);
}

export function authenticateRequest(ctx) {
  try {
    ctx.auth = authenticatedToken(
      ctx.request.get("Authorization").replace("Bearer ", "")
    );

    return ctx;
  } catch (e) {
    console.error(e);
  }

  throw new AuthError();
}
