import { Definition } from "../definitions";

export const escape: Definition = {
  token: "escape",
  terminal: true,
  test: (input, index) => {
    return input[index] === "\\";
  },
  get_value: () => {
    return "\\";
  }
};