import { InlineRule } from "../rules";
export const mention: InlineRule = {
  node: "mention",
  terminal: true,
  test: token => {
    return token.type === "mention";
  }
};
