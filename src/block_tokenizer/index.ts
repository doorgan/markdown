import block_definitions from "./definitions";
import { BlockDefinition } from "./definitions";
import { BlockToken } from "../types";

interface TokenizerOpts {
  definitions?: BlockDefinition[]
}

export const tokenize = (input: string, opts?: TokenizerOpts): BlockToken[] => {
  const options = {
    definitions: (opts) ? opts.definitions : block_definitions
  }
  const lines = input.split(/\r\n?|\n/);
  return do_tokenize(lines, options);
};

const do_tokenize = (lines: string[], options: TokenizerOpts, tokens: BlockToken[] = [], text: string[] = []): BlockToken[] => {
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
  const block_def = block_definitions.find(x => x.pattern.test(current));
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