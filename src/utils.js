import jwt from "jsonwebtoken";
import config from "config";
export { isIP } from "net";

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

export function isString(s) {
  return typeof s === "string";
}

export function isEmpty(s) {
  return (
    (isString(s) && s.trim().length < 1) || (Array.isArray(s) && s.length < 1)
  );
}

export function isGUID(s) {
  return (
    isString(s) &&
    s.match(
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    )
  );
}
