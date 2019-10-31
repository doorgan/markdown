import { InlineDefinition } from "../definitions";

export const close_bold: InlineDefinition = {
  token: "close_bold",
  terminal: false,
  test: (input, index) => {
    const prev_char = /(\S)/.test(input[index - 1]);
    return (
      prev_char &&
      /^(\*\*|__)(?:[^\S])?/.test(input.slice(index, input.length))
    );
  },
  get_value: (input, index) => {
    return input[index] + input[index];
  }
}