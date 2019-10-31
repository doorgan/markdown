import { BlockRule } from "../rules";
export const heading: BlockRule = {
  name: "header",
  terminal: true,
  test: ([token]) => {
    return token.type === "header";
  },
  process: ([token]) => {
    return {
      type: "header",
      data: {
        text: token.value,
        level: token.metadata!.level
      }
    };
  }
};
