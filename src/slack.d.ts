export declare type ISlackPayload = ISlackUrlVerification | ISlackAppMention;

export interface ISlackUrlVerification {
  type: "url_verification";
  token: string;
  challenge: string;
}

export interface ISlackAppMention {
  type: "event_callback";
  token: string;
  team_id: string;
  api_app_id: string;
  event: ISlackEvent;
  authed_users: string[];
  event_id: string;
  event_time: number;
}

export interface ISlackEvent {
  type: string;
  event_ts: string;
  user: string;
  ts: string;
  text: string;
  channel: string;
}
