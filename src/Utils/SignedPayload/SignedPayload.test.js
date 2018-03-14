/* eslint-env jest */
import { InvalidPayloadError, InvalidIssuerPayloadError } from "./Errors"
import * as jwt from "jsonwebtoken"
import { privateKey } from "./IssuersKeys/mock"

let mockedSignedPayload = ({ mocked = true } = {}) => {
  if (mocked) {
    jest.mock("./IssuersKeys", () => require("./IssuersKeys/mock"))
  }

  const SignedPayload = require("./SignedPayload").default

  if (mocked) {
    jest.unmock("./IssuersKeys")
  }

  return SignedPayload
}

describe("SignedPayload", () => {
  describe("decodeAndVerify", () => {
    describe("should throw an error", () => {
      test("for a not valid JWT Token", async () => {
        const SignedPayload = mockedSignedPayload()

        await expect(SignedPayload.decodeAndVerify({})).rejects.toHaveProperty(
          "name",
          "InvalidPayloadError"
        )
        await expect(
          SignedPayload.decodeAndVerify(null)
        ).rejects.toHaveProperty("name", "InvalidPayloadError")
        await expect(
          SignedPayload.decodeAndVerify(undefined)
        ).rejects.toHaveProperty("name", "InvalidPayloadError")
        await expect(
          SignedPayload.decodeAndVerify("toto")
        ).rejects.toHaveProperty("name", "InvalidPayloadError")
      })

      test("for no issuer", async () => {
        const SignedPayload = mockedSignedPayload()

        const payloadDecode = () =>
          SignedPayload.decodeAndVerify(jwt.sign({}, "jest", {}))

        await expect(payloadDecode()).rejects.toHaveProperty(
          "name",
          "InvalidIssuerPayloadError"
        )

        await expect(payloadDecode()).rejects.toHaveProperty(
          "message",
          "No issuer found in payload"
        )
      })

      test("for an unknown issuer", async () => {
        const SignedPayload = mockedSignedPayload({ mocked: false })

        const payloadDecode = () =>
          SignedPayload.decodeAndVerify(
            jwt.sign({}, "jest", { issuer: "invalid" })
          )

        await expect(payloadDecode()).rejects.toHaveProperty(
          "name",
          "InvalidIssuerPayloadError"
        )
        await expect(payloadDecode()).rejects.toHaveProperty(
          "message",
          expect.stringMatching(/Could not find a readable issuer key at path/)
        )
      })

      test("for invalid algorithm", async () => {
        const SignedPayload = mockedSignedPayload()
        const payloadDecode = () =>
          SignedPayload.decodeAndVerify(
            jwt.sign({}, privateKey, {
              subject: "testing",
              issuer: "jest"
            })
          )

        await expect(payloadDecode()).rejects.toHaveProperty(
          "name",
          "InvalidPayloadError"
        )
        await expect(payloadDecode()).rejects.toHaveProperty(
          "message",
          expect.stringMatching(/^((?!Invalid subject).*)$/)
        )
      })

      test.skip("for invalid subject", async () => {
        const SignedPayload = mockedSignedPayload()
        const payloadDecode = () =>
          SignedPayload.decodeAndVerify(
            jwt.sign({}, privateKey, {
              subject: "testing",
              issuer: "jest",
              algorithm: "RS256"
            })
          )

        await expect(payloadDecode()).rejects.toHaveProperty(
          "name",
          "InvalidPayloadError"
        )
        await expect(payloadDecode()).rejects.toHaveProperty(
          "message",
          expect.stringMatching("Invalid subject")
        )
      })
    })

    describe("should resolve a token", () => {
      test("for invalid subject", async () => {
        const SignedPayload = mockedSignedPayload()
        const payloadDecode = () =>
          SignedPayload.decodeAndVerify(
            jwt.sign({}, privateKey, {
              subject: "stats",
              issuer: "jest",
              algorithm: "RS256"
            })
          )

        await expect(payloadDecode()).resolves.toHaveProperty("iss", "jest")
      })
    })
  })

  afterEach(() => {
    jest.resetModules()
  })
})
