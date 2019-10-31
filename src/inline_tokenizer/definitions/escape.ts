import { InlineDefinition } from "../definitions";

export const escape: InlineDefinition = {
  token: "escape",
  terminal: true,
  test: (input, index) => {
    return input[index] === "\\";
  },
  get_value: () => {
    return "\\";
  }
};