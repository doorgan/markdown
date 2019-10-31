import { InlineRule } from "../rules";
export const link: InlineRule = {
  node: "link",
  terminal: true,
  test: token => {
    return token.type === "link";
  },
  process: token => {
    return {
      type: "link",
      data: {
        text: token.metadata!.text,
        url: token.metadata!.url
      }
    };
  }
};
