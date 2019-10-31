import { Definition } from "../definitions";

export const strikethrough: Definition = {
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