import { RequestOptions } from "../http";

export default new (class {
  async createRequest<T>(options: RequestOptions): Promise<T> {
    console.info(options)
    return await Promise.resolve({ msg: "uniapp" } as T);
  }
})();
