import { Rule } from "../rules";
export const post_ref: Rule = {
  node: "post_ref",
  terminal: true,
  test: token => {
    return token.type === "post_ref";
  }
};
