export type RequestMethod = ["GET", "POST", "PUT", "DELETE"][number];

export interface RequestOptions {
  baseUrl: string;
  setHeaders?: () => Record<string, string>;
  beforeResponse?: (response: { status: number }) => void;
  path: string;
  method: RequestMethod;
  contentType?: "form" | "json";
  payload: Record<string, unknown>;
}

export type RequestAdapter<T> = {
  createRequest: (options: RequestOptions) => Promise<T>;
};

export class Http<T> {
  constructor(private adapter: RequestAdapter<T>) {
    this.adapter = adapter;
  }

  public async request(options: RequestOptions): Promise<T> {
    return await this.adapter.createRequest(options);
  }
}
