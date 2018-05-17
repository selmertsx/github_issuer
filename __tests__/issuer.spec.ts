import { Issuer } from "../src/issuer";

describe("Issuer", () => {
  test("authenticate", async () => {
    const issuer = new Issuer("selmertsx", "study");
    await issuer.authenticate();
    const response = await issuer.create("sample");
  });
});
