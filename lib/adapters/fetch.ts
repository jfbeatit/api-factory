import { Base } from "../http/base";
import { type RequestOptions, RequestAdapter } from "../http";

export default new (class<T> extends Base implements RequestAdapter<T> {
  async createRequest<T>(options: RequestOptions): Promise<T> {
    this.options = options;
    const response = await fetch(this.setUrl(), {
      method: options.method,
      headers: { ...this.setHeaders() },
      body:
        this.options.method === "GET"
          ? null
          : (this.setData() as string | FormData),
    });
    this.options.beforeResponse?.({ status: response.status });
    return response.json();
  }
})();
