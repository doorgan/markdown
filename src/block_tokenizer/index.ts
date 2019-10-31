import default_definitions from "./definitions";
import { BlockDefinition } from "./definitions";
import { BlockToken } from "../types";

import { Options } from "../main";


export const tokenize = (input: string, options?: Options): BlockToken[] => {
  const lines = input.split(/\r\n?|\n/);
  if (!options) options = {};
  if (!options.block_definitions) {
    options.block_definitions = default_definitions;
  }
  return do_tokenize(lines, options);
};

const do_tokenize = (lines: string[], options: Options = {}, tokens: BlockToken[] = [], text: string[] = []): BlockToken[] => {
  if (!lines.length) {
    if (text.length) {
      let value = text.join("\n");
      if (
        tokens[tokens.length - 1] &&
        tokens[tokens.length - 1].type === "paragraph"
      ) {
        tokens[tokens.length - 1].value += `\n${value}`;
      } else {
        tokens.push({ type: "paragraph", value });
      }
    }
    return tokens;
  }
  let [current, ...rest] = lines;
  const block_def = options.block_definitions!.find(x => x.pattern.test(current));
  if (!block_def) {
    text.push(current);
    return do_tokenize(rest, options, tokens, text);
  }
  if (text.length) {
    let value = text.join("\n");
    if (
      tokens[tokens.length - 1] &&
      tokens[tokens.length - 1].type === "paragraph"
    ) {
      tokens[tokens.length - 1].value += `\n${value}`;
    } else {
      tokens.push({ type: "paragraph", value });
    }
  }
  let token = block_def.tokenize
    ? block_def.tokenize(current)
    : {
      type: block_def.name,
      value: current
    };
  tokens.push(token);
  return do_tokenize(rest, options, tokens);
};