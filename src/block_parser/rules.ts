import { BlockToken, Node, Ast } from "../types";
import { code_block } from "./rules/code_block";
import { heading } from "./rules/heading";
import { paragraph } from "./rules/paragraph";

export interface BlockRule {
  name: string,
  recursive?: boolean,
  terminal?: boolean,
  multiline?: boolean,
  test: (tokens: BlockToken[]) => boolean,
  process?: (tokens: BlockToken[], content?: string[], next?: Function) => Node
}

const rules: BlockRule[] = [
  paragraph,
  heading,
  code_block
];

export default rules;