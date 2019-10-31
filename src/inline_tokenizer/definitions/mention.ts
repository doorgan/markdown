import { InlineDefinition } from "../definitions";

export const mention: InlineDefinition = {
  token: "mention",
  terminal: true,
  test: (input, index) => {
    let test_string = input.slice(index, input.length);
    return /^@([-\w]*(?:\w+)*)/.test(test_string);
  },
  get_value: (input, index) => {
    input = input.slice(index, input.length);
    return /^@([-\w]*(?:\w+)*)/.exec(input)![0];
  }
}