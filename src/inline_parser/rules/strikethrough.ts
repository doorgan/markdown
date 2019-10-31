import { InlineRule } from "../rules";
export const strikethrough: InlineRule = {
  node: "strikethrough",
  recursive: true,
  test: token => {
    return token.type === "strikethrough";
  }
};
