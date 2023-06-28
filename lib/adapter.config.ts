export default {
  default: "fetch",
  loader: {
    fetch: () => import("./adapters/fetch"),
    uni: () => import("./adapters/uni"),
  },
};
