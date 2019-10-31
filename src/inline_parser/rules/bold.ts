import { Rule } from "../rules";
export const bold: Rule = {
  node: "bold",
  recursive: true,
  test: token => {
    return token.type === "open_bold";
  },
  closing_token: "close_bold",
  process: (token, content, next) => {
    return {
      type: "bold",
      data: {
        delimiter: token.value,
        children: next(content)
      }
    };
  }
};
