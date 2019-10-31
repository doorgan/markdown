import block_rules from "./rules";
import { BlockRule } from "./rules";
import { tokenize as tokenize_node } from "../inline_tokenizer";
import { parse as parse_node } from "../inline_parser";
import { BlockToken, Ast, Node } from "../types";

export const parse = (tokens: BlockToken[], ast: Ast = []): Ast => {
  if (!tokens.length) return ast;
  const [current, ...rest] = tokens;
  const block_rule = block_rules.find(x => x.test(tokens));
  if (block_rule) {
    if (block_rule.terminal) {
      let node = process_token(current, block_rule);
      return parse(rest, [...ast, node]);
    }
    if (block_rule.recursive) {
      const lines = current.value!.split("\n");
      const children = lines
        .map(line => {
          return parse_node(tokenize_node(line));
        })
        .reduce((acc, lines) => {
          acc.push(...lines);
          acc.push({ type: "break" });
          return acc;
        }, []);
      const node = {
        type: block_rule.name,
        data: {
          children
          //text: current.value
        }
      };
      return parse(rest, [...ast, node]);
    }
    if (block_rule.multiline) {
      const { eaten, lines } = rest.reduce(
        (acc, token) => {
          if (acc.break) return acc;
          if (token.type === current.type) {
            acc.eaten++;
            acc.break = true;
            return acc;
          }
          acc.eaten++;
          acc.lines.push(token.value!);
          return acc;
        },
        <{ eaten: number, lines: string[], break: boolean }>{ eaten: 0, lines: [], break: false }
      );
      let node = process_node(tokens, lines, block_rule);
      return parse(rest.slice(eaten), [...ast, node]);
    }
  }
  const node = { type: current.type, data: { text: current.value } };
  return parse(rest, [...ast, node]);
};

const process_node = (tokens: BlockToken[], lines: string[], rule: BlockRule): Node => {
  if (rule.process) {
    return rule.process(tokens, lines, parse_node);
  } else {
    return {
      type: rule.name,
      data: {
        text: lines.join("\n")
      }
    };
  }
};

const process_token = (token: BlockToken, rule: BlockRule) => {
  if (rule.process) {
    return rule.process([token]);
  } else {
    return {
      type: rule.name,
      data: {
        text: token.value
      }
    };
  }
};
