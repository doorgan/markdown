import { BlockRule } from "../rules";
export const code_block: BlockRule = {
  name: "code_block",
  multiline: true,
  test: ([token]) => {
    return token.type === "code_fence";
  },
  process: ([token], content) => {
    return {
      type: "code_block",
      data: {
        text: content!.join("\n"),
        lang: token.metadata!.lang
      }
    };
  }
};
