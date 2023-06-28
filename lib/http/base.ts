import { RequestOptions } from "./index";

export class Base {
  protected options: RequestOptions = {
    baseUrl: "",
    path: "",
    setHeaders: undefined,
    beforeResponse: undefined,
    method: "GET",
    contentType: "json",
    payload: {},
  };

  protected setHeaders(): Record<string, string> {
    return this.options.setHeaders ? this.options.setHeaders() : {};
  }

  protected setData(): string | FormData | Record<string, unknown> {
    return this.options.contentType === "json"
      ? JSON.stringify(this.options.payload)
      : Object.entries(this.options.payload).reduce((_, [key, value]) => {
          _.append(key, value as string | Blob);
          return _;
        }, new FormData());
  }

  protected setUrl(): string {
    return Object.entries(this.options.payload).reduce((_, [key, value]) => {
      if (_.includes(`{${key}}`)) {
        _ = _.replace(`{${key}}`, value as string);
      }
      return _;
    }, `${this.options.baseUrl}${this.options.path}`);
  }
}
