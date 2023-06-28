import { defineApiConfig } from "@jfbeatit/api-factory";

export default defineApiConfig({
  name: "admin",
  baseUrl: "http://localhost",
  setHeaders: () => {
    return { Authorization: "Bearer jfbeatit" };
  },
  beforeResponse: (response) => {
    console.log(response.status);
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
