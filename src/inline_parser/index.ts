import inline_rules from "./rules";
import { Node, InlineToken as Token } from "../types";
import { Rule } from "./rules";

export type Ast = Node[]

export const parse = (tokens: Token[]): Node[] => {
  return do_parse(tokens);
};

const do_parse = (tokens: Token[], ast: Node[] = []): Ast => {
  if (!tokens.length) return ast;
  let [current, ...rest] = tokens;
  const rule = inline_rules.find(x => x.test(current));
  if (!rule) {
    ast.push({ type: "text", data: { text: current.value } });
    return do_parse(rest, ast);
  }
  if (rule.terminal) {
    if (rule.process) {
      ast.push(process(rule, current, []));
    } else {
      ast.push({ type: rule.node, data: { text: current.value } });
    }
    return do_parse(rest, ast);
  }
  let content = [];
  let closing_token = rule.closing_token ? rule.closing_token : current.type;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i].type === closing_token && rest[i].value === current.value) {
      let node = process(rule, current, content);
      ast.push(node);
      return do_parse(rest.splice(i + 1), ast);
    }
    content.push(rest[i]);
  }
  ast.push({ type: "text", data: { text: current.value } });
  return do_parse(rest, ast);
};

const process = (rule: Rule, current: Token, content: any) => {
  if (rule.process) return rule.process(current, content, do_parse);
  let data = {};
  if (rule.recursive) {
    data = {
      children: do_parse(content)
    };
  } else {
    data = {
      text: flatten(content)
    };
  }
  return {
    type: rule.node,
    data
  };
};

export const flatten = (tokens: Token[]): string => {
  return tokens.reduce((acc: string, token: Token) => {
    return acc + token.original;
  }, "");
};
