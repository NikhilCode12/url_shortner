import request from "supertest";
import app from "../../app.js";

describe("POST /shorten", () => {
  it("should return a shortened URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "https://github.com/NikhilCode12" });
    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toBeDefined();
  });

  it("should return 400 if URL is invalid", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "invalid-url" });
    expect(response.status).toBe(400);
  });
});
