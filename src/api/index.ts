import { defineApiConfig } from "@jfbeatit/api-factory";

export default defineApiConfig({
  name: "index",
  baseUrl: "/",
  adapter: "uni",
  setHeaders: () => {
    return {};
  },
  beforeResponse: () => {
    console.log("beforeResponse");
  },
  apiList: {
    user: {
      query: { path: "/users", method: "GET" },
      create: { path: "/users", method: "POST" },
      update: { path: "/users/{id}", method: "PUT" },
      destroy: { path: "/users/{id}", method: "DELETE" },
    },
  },
});
