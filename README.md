```
                         / _` | '_ \| |_____| |_ / _` |/ __| __/ _ \| '__| | | |
                        | (_| | |_) | |_____|  _| (_| | (__| || (_) | |  | |_| |
                         \__,_| .__/|_|     |_|  \__,_|\___|\__\___/|_|   \__, |
                              |_|                                         |___/
```

-- Make your http client api of modern frontend project easier to manage,maintain and extensible.

---

### Install

```bash
npm i @jfbeatit/api-factory
```

### Usage

1. mkdir in your project root, `mkdir api/definition -p`

2. and then `touch api/definition/index.ts` with the following code:

```ts
import { defineApiConfig } from "@jfbeatit/api-factory";

export default defineApiConfig({
  // the base url of your api
  baseUrl: "/",
  // `adapter` means the request api you want to use, default is `fetch`
  adapter: "fetch",
  // set http headers here
  setHeaders: () => {
    return { Authorization: "Bearer token" };
  },
  // the callback of the response
  beforeResponse: ({ status }) => {
    console.log(status);
  },
  apiList: {
    // just an example, you can define all the api you need here
    common: {
      upload: { path: '/api/upload', method: 'POST', contentType: 'form' // default is `json` },
    },
    user: {
      query: { path: "/api/users", method: "GET" },
      create: { path: "/api/users", method: "POST" },
      update: { path: "/api/users/{id}", method: "PUT" },
      destroy: { path: "/api/users/{id}", method: "DELETE" },
    },
    // ... any other api you need
  },
});
```

3. for TypeScript support, `touch api/api-factory.d.ts` with the following code:

```ts
import { type ApiMapped } from "@jfbeatit/api-factory";

declare module "@jfbeatit/api-factory" {
  export function apiFactory<
    R = { code: number; msg: string; data: Array<Record<string, unknown>> },
    T = typeof import("./definition/index.ts")
  >(loadConfig: Promise<T>): ApiMapped<T["default"]["apiList"], R>;
}
```

4. now, you can `touch api/index.ts` and define a helper function like this:

```ts
import { apiFactory } from "@jfbeatit/api-factory";

export function useApi<T = Array<Record<string, unknown>>>() {
  return apiFactory<{ code: number; msg: string; data: T>(import("./api/definition/index.ts"));
}
```
5. finally, just simply use it like this:

```ts
import { useApi } from "/api";

interface User {
  id: number;
  name: string;
  age: number;
  //...
}

async function uploadFile(e) {
  const file = e.target.files[0];
  const res = await useApi().common.upload({ file });
  console.info(res);
}

async function fetchUsers() {
  const res = await useApi<Array<User>>().user.query();
  console.info(res);
}

// or
async function createUser() {
  const res = await useApi<User>().user.create({ name: "test1" });
  console.info(res);
}

// or
async function updateUser() {
  const res = await useApi<User>().user.update({ id: 1, name: "test2" });
  console.info(res);
}

// or
async function destroyUser() {
  const res = await useApi().user.destroy({ id: 1 });
  console.info(res);
}
```

### License

MIT
