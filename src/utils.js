import jwt from "jsonwebtoken";
import config from "config";
export { isIP } from "net";

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

export function withoutRoot(fn = (root, args, ctx, info) => {}) {
  return (args, ctx, info) => fn({}, args, ctx, info);
}
