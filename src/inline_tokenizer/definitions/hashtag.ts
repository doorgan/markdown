import { InlineDefinition } from "../definitions";

export const hashtag: InlineDefinition = {
  token: "hashtag",
  terminal: true,
  test: (input, index) => {
    let test_string = input.slice(index, input.length);
    return /^#([\w+]{2,100})/.test(test_string);
  },
  get_value: (input, index) => {
    input = input.slice(index, input.length);
    return /^#([\w+]{2,100})/.exec(input)![0];
  }
}