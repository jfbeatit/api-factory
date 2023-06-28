import { Http, type RequestMethod, type RequestOptions } from "./http";
import adapterConfig from "./adapter.config";

interface ApiConfigOptions {
  baseUrl: string;
  adapter?: keyof (typeof adapterConfig)["loader"];
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
}

export type ApiMapped<T, R> = {
  [K in keyof T]: T[K] extends infer F
    ? { [P in keyof F]: (payload?: Record<string, unknown>) => Promise<R> }
    : never;
};

export function defineApiConfig<T extends ApiConfigOptions>(options: T): T {
  return options;
}

async function createRequest<T>(
  options: RequestOptions,
  name?: keyof (typeof adapterConfig)["loader"]
): Promise<T> {
  const adapter = await adapterConfig["loader"][
    name ?? (adapterConfig["default"] as keyof (typeof adapterConfig)["loader"])
  ]();
  return await new Http<T>(adapter["default"]).request(options);
}

export function apiFactory<T>(loadConfig: Promise<{ default: ApiConfigOptions }>): unknown {
  return new Proxy(
    {},
    {
      get(_target, module: string) {
        return new Proxy(
          {},
          {
            get(_target, action: string) {
              return async (payload: Record<string, unknown>) => {
                const {
                  adapter,
                  baseUrl,
                  setHeaders,
                  beforeResponse,
                  apiList,
                } = (await loadConfig)['default'];
                if (!apiList[module][action]) {
                  throw new Error(
                    `Action ${action} not found of module ${module}`
                  );
                }
                const { path, method, contentType } = Reflect.get(
                  apiList[module],
                  action
                );
                return await createRequest<T>(
                  {
                    baseUrl,
                    setHeaders,
                    beforeResponse,
                    path,
                    method,
                    contentType: contentType ?? "json",
                    payload: payload ?? {},
                  },
                  adapter
                );
              };
            },
          }
        );
      },
    }
  );
}
