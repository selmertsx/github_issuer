import { WebClient } from "@slack/client";

export class SlackClient {
  private readonly channelID: string;
  private readonly token = process.env.SLACK_TOKEN;

  constructor(channelID: string) {
    this.channelID = channelID;
  }

  public async postMessage(text: string, attachments: any) {
    const client = new WebClient(this.token);
    return await client.chat.postMessage({
      channel: this.channelID,
      attachments,
      text
    });
  }
}
