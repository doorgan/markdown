import { BlockDefinition } from "../definitions";
export const code_fence: BlockDefinition = {
  name: "code_fence",
  pattern: /^```([a-zA-Z0-9]+)?$/,
  terminal: true,
  tokenize(line) {
    let lang = /^```([a-zA-Z0-9]+)?$/.exec(line)![1];
    if (!lang)
      lang = "";
    return { type: "code_fence", metadata: { lang }, terminal: true };
  }
};
