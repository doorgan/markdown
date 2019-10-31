import { InlineDefinition } from "../definitions";
import { no_punctuation_re } from "../../utils";

export const open_emphasis: InlineDefinition = {
  token: "open_emphasis",
  terminal: false,
  to_eat: 1,
  test: (input, index) => {
    const no_prev_char =
      !input[index - 1] || no_punctuation_re.test(input[index - 1]);
    return (
      no_prev_char && /^(\*|_)(?:\S)/.test(input.slice(index, input.length))
    );
  },
  get_value: (input, index) => {
    return input[index];
  }
}