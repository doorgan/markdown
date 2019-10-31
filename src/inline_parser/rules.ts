import { Node, InlineToken } from "../types";
import { inline_code } from "./rules/inline_code";
import { bold } from "./rules/bold";
import { emphasis } from "./rules/emphasis";
import { strikethrough } from "./rules/strikethrough";
import { mention } from "./rules/mention";
import { hashtag } from "./rules/hashtag";
import { post_ref } from "./rules/post_ref";
import { link } from "./rules/link";

export interface InlineRule {
  node: string,
  terminal?: boolean,
  recursive?: boolean,
  closing_token?: string,
  test: (token: InlineToken) => boolean,
  process?: (token: InlineToken, content: string, next: Function) => Node
}

let rules: InlineRule[] = [
  inline_code,
  bold,
  emphasis,
  strikethrough,
  mention,
  hashtag,
  post_ref,
  link
];

export default rules;