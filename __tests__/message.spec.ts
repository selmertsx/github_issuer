import * as fs from "fs";
import { Message } from "../src/message";

const response = JSON.parse(
  fs.readFileSync("./__mocks__/create_issue_response.json", "utf8")
);

describe("Message", () => {
  test("attachment", async () => {
    const message = new Message(response);
    expect(message.attachments()).toEqual({
      title: "sample",
      title_link: "https://github.com/selmertsx/study/issues/1"
    });
  });
});
