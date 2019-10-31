import { InlineToken } from "../types";
import { open_bold } from "./definitions/open_bold";
import { close_bold } from "./definitions/close_bold";
import { open_emphasis } from "./definitions/open_emphasis";
import { close_emphasis } from "./definitions/close_emphasis";
import { escape } from "./definitions/escape";
import { hashtag } from "./definitions/hashtag";
import { inline_code } from "./definitions/inline_code";
import { link } from "./definitions/link";
import { mention } from "./definitions/mention";
import { post_ref } from "./definitions/post_ref";
import { strikethrough } from "./definitions/strikethrough";

export interface InlineDefinition {
  token: string,
  terminal: boolean,
  get_value?: (input: string, index: number) => string,
  to_eat?: number,
  test?: (input: string, index: number) => boolean,
  tokenize?: (input: string, index: number) => InlineToken
}

const definitions: InlineDefinition[] = [
  open_bold,
  close_bold,
  open_emphasis,
  close_emphasis,
  escape,
  hashtag,
  inline_code,
  link,
  mention,
  post_ref,
  strikethrough,
];

export default definitions;