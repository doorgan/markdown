import { Definition } from "../definitions";
import { InlineToken } from "../../types";

export const inline_code: Definition = {
  token: "inline_code",
  terminal: true,
  test: (input, index) => {
    return /^(`+)(.+?)(?<!`)\1(?!`)/.test(input.slice(index, input.length));
  },
  tokenize: (input: string, index: number): InlineToken => {
    let matches = /^(`+)(.+?)(?<!`)\1(?!`)/.exec(
      input.slice(index, input.length)
    );
    const full_match = matches![0];
    const delimiter = matches![1];
    const value = matches![2];
    return {
      type: "inline_code",
      value,
      delimiter,
      original: full_match
    };
  }
}