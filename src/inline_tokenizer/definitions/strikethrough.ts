import { InlineDefinition } from "../definitions";

export const strikethrough: InlineDefinition = {
  token: "strikethrough",
  terminal: false,
  test: (input, index) => {
    let test_string = input.slice(index, input.length);
    return /^~~/.test(test_string);
  },
  get_value: () => {
    return "~~";
  }
}