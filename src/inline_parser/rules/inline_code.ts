import { InlineRule } from "../rules";
export const inline_code: InlineRule = {
  node: "inline_code",
  terminal: true,
  test: token => {
    return token.type === "inline_code";
  },
  process: token => {
    return {
      type: "inline_code",
      data: {
        text: token.value,
        delimiter: token.delimiter
      }
    };
  }
};
