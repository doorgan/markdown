import { BlockToken } from "../types";
import { code_fence } from "./definitions/code_fence";
import { greentext } from "./definitions/greentext";
import { header } from "./definitions/header";
import { empty } from "./definitions/empty";

export interface BlockDefinition {
  name: string,
  pattern: RegExp,
  terminal?: boolean,
  tokenize?: (line: string) => BlockToken
}

const definitions: BlockDefinition[] = [
  empty,
  header,
  greentext,
  code_fence
];

export default definitions;