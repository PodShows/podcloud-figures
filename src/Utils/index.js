import path from "path";
import jwt from "jsonwebtoken";
import config from "config";
import crypto from "crypto";
import isBot from "./isBot";
import CheckAndParseSorting from "./CheckAndParseSorting";

export { isIP } from "net";
export { isBot, CheckAndParseSorting };

export function isString(s) {
  return typeof s === "string";
}

export function isEmpty(s) {
  return (
    (isString(s) && s.trim().length < 1) || (Array.isArray(s) && s.length < 1)
  );
}

export function isGUID(s) {
  return isString(s) && s.match("^[0-9a-fA-F]{24}$");
}

export function withoutRoot(fn = (root, args, ctx, info) => {}) {
  return (args, ctx, info) => fn({}, args, ctx, info);
}

export const archiveUrl = file => {
  return (
    (isString(file) &&
      !isEmpty(file) &&
      path.join(
        "/archives",
        ...path.basename(file, path.extname(file)).match(/.{1,2}/g),
        file
      )) ||
    null
  );
};

export const RandomFakeFeedID = () => {
  return crypto
    .createHash("sha256")
    .update("" + Math.floor(+new Date() * Math.random()))
    .digest("hex")
    .substring(0, 24);
};
