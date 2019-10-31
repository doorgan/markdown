import { InlineRule } from "../rules";
export const post_ref: InlineRule = {
  node: "post_ref",
  terminal: true,
  test: token => {
    return token.type === "post_ref";
  }
};
