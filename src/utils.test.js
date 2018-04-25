import jwt from "jsonwebtoken";
import config from "config";
import * as utils from "./utils";

const makeDebugToken = (content = { test: true }) => {
  return jwt.sign(content, config.get("IssuersKeys.debug_key"), {
    algorithm: "RS256",
    subject: "stats",
    issuer: "debug"
  });
};

describe("Utils", () => {
  describe("authenticatedToken", () => {
    it("should authenticate debug token", () => {
      const token = makeDebugToken();

      expect(utils.authenticatedToken(token).test).toBe(true);
    });

    it("should fail on wrong token", () => {
      const token = makeDebugToken();

      expect(() => {
        utils.authenticatedToken(token + "a");
      }).toThrow("invalid signature");
    });
  });

  describe("authenticateRequest", () => {
    it("should authenticate request with debug token", () => {
      const token = makeDebugToken();

      const ctx = {
        request: {
          get: header => (header === "Authorization" ? "Bearer " + token : null)
        }
      };

      utils.authenticateRequest(ctx);

      expect(ctx.auth).toBeInstanceOf(Object);
      expect(ctx.auth.test).toBe(true);
    });

    it("should fail on false token", () => {
      const token = makeDebugToken();

      const ctx = {
        request: {
          get: header =>
            header === "Authorization" ? "Bearer " + token + "a" : null
        }
      };

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      expect(() => {
        utils.authenticateRequest(ctx);
      }).toThrow("Not authorized");

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.objectContaining({ message: "invalid signature" })
      );

      expect(ctx.auth).toBeFalsy();
    });
  });
});
