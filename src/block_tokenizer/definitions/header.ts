import { BlockDefinition } from "../definitions";
export const header: BlockDefinition = {
  name: "header",
  pattern: /^#{1,5} /,
  tokenize(line) {
    let level = /(#{1,5}) /.exec(line)![1].length;
    return {
      type: "header",
      value: line.slice(level + 1),
      metadata: {
        level
      }
    };
  }
};
