import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";

import { Issuer } from "./issuer";
import { ISlackEvent, ISlackEventCallback } from "./slack";

function buildResponse(statusCode: number, body?): APIGatewayProxyResult {
  return { statusCode, body: JSON.stringify(body) };
}

export async function createIssue(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  if (!event.body) {
    return buildResponse(400);
  }

  const payload: ISlackEvent = JSON.parse(event.body);
  if (event.headers["X-Slack-Retry-Reason"] === "http_timeout") {
    return buildResponse(200, { status: "OK" });
  }

  if (payload.type === "url_verification") {
    return buildResponse(200, { challenge: payload.challenge });
  }

  const args = payload.event.text.match(/issue\s(.*)\s(.*)\s(.*)/);
  const issuer = new Issuer(args[1], args[2]);
  issuer.authenticate();
  const response = await issuer.create(args[3]);
  return buildResponse(200, response);
}
