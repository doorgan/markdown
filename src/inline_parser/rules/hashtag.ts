import { InlineRule } from "../rules";
export const hashtag: InlineRule = {
  node: "hashtag",
  terminal: true,
  test: token => {
    return token.type === "hashtag";
  }
};
