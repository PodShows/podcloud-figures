import AuthRequest from "./AuthRequest";
import jwt from "jsonwebtoken";
import config from "config";
import crypto from "crypto";

const FakeRequest = (headers, body) => ({
  get: header => headers[header],
  body: body
});

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
      const auth = AuthRequest(FakeRequest({ authorization: "nope" }));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with basic authorization header", () => {
      const auth = AuthRequest(FakeRequest({ authorization: "Basic toto" }));
      expect(auth).toHaveProperty("isAuthenticated", false);
    });

    it("with invalid jwt", () => {
      const spy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
      const auth = AuthRequest(FakeRequest({ authorization: "Bearer blabla" }));

      expect(auth).toHaveProperty("isAuthenticated", false);
      expect(spy).toHaveBeenCalledWith(
        expect.stringMatching("Cannot find a valid JWT")
      );
      spy.mockReset();
      spy.mockRestore();
    });

    it("with invalid issuer jwt", () => {
      const spy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
      const auth = AuthRequest(
        FakeRequest({
          authorization: `Bearer ${MakeDebugToken({}, { issuer: "invalid" })}`
        })
      );

      expect(auth).toHaveProperty("isAuthenticated", false);
      expect(spy).toHaveBeenCalledWith(
        expect.stringMatching("No public key for issuer")
      );
      spy.mockReset();
      spy.mockRestore();
    });

    it("with invalid subject jwt", () => {
      const spy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
      const auth = AuthRequest(
        FakeRequest({
          authorization: `Bearer ${MakeDebugToken({}, { subject: "invalid" })}`
        })
      );

      expect(auth).toHaveProperty("isAuthenticated", false);
      expect(spy).toHaveBeenCalledWith(
        expect.stringMatching("Cannot find a valid JWT with stats subject.")
      );
      spy.mockReset();
      spy.mockRestore();
    });
  });

  it("should authenticate with valid signature", () => {
    const body = new Date().toString();
    const stamp = crypto
      .createHash("sha256")
      .update(body)
      .digest("hex");
    const auth = AuthRequest(
      FakeRequest(
        { authorization: `Bearer ${MakeDebugToken({ stamp })}` },
        body
      )
    );
    expect(auth).toHaveProperty("isAuthenticated", true);
  });
});
