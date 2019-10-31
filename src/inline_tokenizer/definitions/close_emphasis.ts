import { InlineDefinition } from "../definitions";

export const close_emphasis: InlineDefinition = {
  token: "close_emphasis",
  terminal: false,
  to_eat: 1,
  test: (input, index) => {
    const prev_char = /(\S)/.test(input[index - 1]);
    return (
      prev_char && /^(\*|_)(?:[^\S])?/.test(input.slice(index, input.length))
    );
  },
  get_value: (input, index) => {
    return input[index];
  }
}