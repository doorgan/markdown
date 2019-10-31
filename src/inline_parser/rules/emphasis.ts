import { InlineRule } from "../rules";
export const emphasis: InlineRule = {
  node: "emphasis",
  recursive: true,
  test: token => {
    return token.type === "open_emphasis";
  },
  closing_token: "close_emphasis",
  process: (token, content, next) => {
    return {
      type: "emphasis",
      data: {
        delimiter: token.value,
        children: next(content)
      }
    };
  }
};
