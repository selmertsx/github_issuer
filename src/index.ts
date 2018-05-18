import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";

import { Issuer } from "./issuer";
import { Message } from "./message";
import { ISlackPayload } from "./slack";
import { SlackClient } from "./slack_client";

function buildResponse(statusCode: number, body?): APIGatewayProxyResult {
  return { statusCode, body: JSON.stringify(body) };
}

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  if (!event.body) {
    return buildResponse(400);
  }

  const payload: ISlackPayload = JSON.parse(event.body);
  if (event.headers["X-Slack-Retry-Reason"] === "http_timeout") {
    return buildResponse(200, { status: "OK" });
  }

  if (payload.type === "url_verification") {
    return buildResponse(200, { challenge: payload.challenge });
  }

  const args = payload.event.text.match(/\s(.*)\s(.*)\s(.*)/);
  const issuer = new Issuer(args[1], args[2]);
  issuer.authenticate();

  const response = await issuer.create(args[3]);
  const client = new SlackClient(payload.event.channel);
  const message = new Message(response);
  await client.postMessage(message.text(), message.attachments());

  return buildResponse(200);
}
