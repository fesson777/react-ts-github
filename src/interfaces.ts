export type Repo = {
  id: number;
  updated_at: Date;
  name: string;
  html_url: string;
  stargazers_count: number;
  owner: Obj;
  language: string;
};
