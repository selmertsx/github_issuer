import octokit from "@octokit/rest";

export class Issuer {
  private readonly octokit: any;
  private readonly owner: string;
  private readonly repo: string;

  constructor(owner: string, repo: string) {
    this.octokit = new octokit();
    this.owner = owner;
    this.repo = repo;
  }

  public authenticate(): void {
    return this.octokit.authenticate({
      type: "token",
      token: process.env.GITHUB_TOKEN
    });
  }

  public async create(title: string): Promise<any> {
    return this.octokit.issues.create({
      owner: this.owner,
      repo: this.repo,
      title
    });
  }
}
