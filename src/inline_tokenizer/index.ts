import token_definitions from "./definitions";
import { Token } from "../token";

const default_attrs: Token = {
  type: "text",
  terminal: true,
  value: "",
  original: ""
};

export const build_token = (attrs: object): Token => {
  let token = { ...default_attrs, ...attrs };
  if (!token.original) token.original = token.value;
  return token;
};

export const build_text_token = (text: string): Token => {
  return build_token({ type: "text", value: text });
};

export const tokenize = (input: string, index: number = 0, tokens: Token[] = [], text: string = ""): Token[] => {
  if (index >= input.length) {
    if (text.length) {
      tokens.push(build_text_token(text));
    }
    return tokens;
  }
  let token_def = token_definitions.find(x => x.test && x.test(input, index));
  if (token_def) {
    if (text.length) {
      tokens.push(build_text_token(text));
      text = "";
    }
    let tokenized;
    if (token_def.tokenize) {
      tokenized = token_def.tokenize(input, index);
    } else {
      tokenized = {
        type: token_def.token,
        value: token_def.get_value!(input, index),
        terminal: token_def.terminal
      };
    }
    let token = build_token(tokenized);

    let to_eat = token_def.to_eat ? token_def.to_eat : token.original.length;

    tokens.push(token);
    return tokenize(input, index + to_eat, tokens, text);
  }
  text += input[index];
  return tokenize(input, index + 1, tokens, text);
};
