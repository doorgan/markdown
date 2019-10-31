import { Rule } from "../rules";
export const mention: Rule = {
  node: "mention",
  terminal: true,
  test: token => {
    return token.type === "mention";
  }
};
