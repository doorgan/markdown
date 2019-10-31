import { BlockRule } from "../rules";
export const paragraph: BlockRule = {
  name: "paragraph",
  recursive: true,
  test: ([token]) => {
    return token.type === "paragraph";
  }
};
