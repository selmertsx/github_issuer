export class Message {
  private readonly title: string;
  private readonly url: string;

  constructor(response: any) {
    this.url = response.data.html_url;
    this.title = response.data.title;
  }

  public text(): string {
    return "新しいIssueを作成しました";
  }

  public attachments(): object {
    return {
      title: this.title,
      title_link: this.url
    };
  }
}
