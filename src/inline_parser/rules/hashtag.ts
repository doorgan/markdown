import { Rule } from "../rules";
export const hashtag: Rule = {
  node: "hashtag",
  terminal: true,
  test: token => {
    return token.type === "hashtag";
  }
};
