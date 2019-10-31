import { Rule } from "../rules";
export const strikethrough: Rule = {
  node: "strikethrough",
  recursive: true,
  test: token => {
    return token.type === "strikethrough";
  }
};
