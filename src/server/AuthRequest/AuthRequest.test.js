import AuthRequest from "./AuthRequest";
import jwt from "jsonwebtoken";
import config from "config";

const FakeRequest = (headers) => ({ get: (header) => (headers[header]) })

const MakeDebugToken = (content = { test: true }, opts = {}) => {
  return jwt.sign(content, config.get("IssuersKeys.debug_key"), {
    algorithm: "RS256",
    subject: "stats",
    issuer: "debug",
    ...opts
  });
};

describe("AuthRequest", () => {
  describe("should not authenticate", () => {
    it("with no authorization header", () => {
      const auth = AuthRequest(FakeRequest({}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with invalid authorization header", () => {
      const auth = AuthRequest(FakeRequest({Authorization: "nope"}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with basic authorization header", () => {
      const auth = AuthRequest(FakeRequest({Authorization: "Basic toto"}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with invalid jwt", () => {
      const auth = AuthRequest(FakeRequest({Authorization: "Bearer blabla"}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with unknown issuer jwt", () => {
      const auth = AuthRequest(FakeRequest({Authorization: `Bearer ${MakeDebugToken({}, {issuer: "invalid"})}`}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });
    
    it("with unknown subject jwt", () => {
      const auth = AuthRequest(FakeRequest({Authorization: `Bearer ${MakeDebugToken({}, {subject: "invalid"})}`}));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

  });
});
