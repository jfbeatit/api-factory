import { type ApiMapped } from "../lib/api-factory";

declare module "../lib/api-factory" {
  export function apiFactory<
    R = { code: number; msg: string; data: Array<Record<string, unknown>> }
  >(
    loadConfig: Promise<typeof import("./api/index.ts")>
  ): ApiMapped<typeof import("./api/index.ts")["default"]["apiList"], R>;

  export function apiFactory<
    R = { code: number; msg: string; data: Array<Record<string, unknown>> }
  >(
    loadConfig: Promise<typeof import("./api/admin.ts")>
  ): ApiMapped<typeof import("./api/admin.ts")["default"]["apiList"], R>;
}
