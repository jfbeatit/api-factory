type RequestMethod = ["GET", "POST", "PUT", "DELETE"][number];

export type ApiConfigOptions = {
  baseUrl: string;
  adapter?: ["fetch", "uni"][number];
  setHeaders?: () => Record<string, string>;
  beforeResponse?: (response: { status: number }) => void;
  apiList: {
    [prop: string]: {
      [prop: string]: {
        path: string;
        method: RequestMethod;
        contentType?: "form" | "json";
      };
    };
  };
};

export type ApiMapped<T, R> = {
  [K in keyof T]: T[K] extends infer F
    ? { [P in keyof F]: (payload?: Record<string, unknown>) => Promise<R> }
    : never;
};

export function defineApiConfig<T extends ApiConfigOptions>(options: T): T;

export function apiFactory<
  R = { code: number; msg: string; data: Array<Record<string, unknown>> }
>(loadConfig: Promise<unknown>): ApiMapped<unknown, R>;
