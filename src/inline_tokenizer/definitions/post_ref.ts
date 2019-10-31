import { Definition } from "../definitions";
import { no_punctuation_re } from "../../utils";

export const post_ref: Definition = {
  token: "post_ref",
  terminal: true,
  test: (input, index) => {
    const no_prev_char =
      !input[index - 1] || no_punctuation_re.test(input[index - 1]);
    let test_string = input.slice(index, input.length);
    return no_prev_char && /^>>([-\w]*(?:\w+)*)/.test(test_string);
  },
  get_value: (input, index) => {
    input = input.slice(index, input.length);
    return /^>>([-\w]*(?:\w+)*)/.exec(input)![0];
  }
}