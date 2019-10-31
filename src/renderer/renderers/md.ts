import { Renderers } from "../index";

const renderers: Renderers = {
  text: node => {
    return node.data!.text;
  },
  code_block: node => {
    return `\`\`\`${node.data!.lang}\n${node.data!.text}\n\`\`\`\n`;
  },
  bold: (node, next) => {
    return `${node.data!.delimiter +
      next!(node.data!.children) +
      node.data!.delimiter}`;
  },
  emphasis: (node, next) => {
    return `${node.data!.delimiter +
      next!(node.data!.children) +
      node.data!.delimiter}`;
  },
  strikethrough: (node, next) => {
    return `~~${next!(node.data!.children)}~~`;
  },
  inline_code: node => {
    return `${node.data!.delimiter + node.data!.text + node.data!.delimiter}`;
  },
  break: () => {
    return "\n";
  },
  paragraph: (node, next) => {
    return `${next!(node.data!.children)}\n`;
  },
  mention: node => {
    return node.data!.text;
  },
  hashtag: node => {
    return node.data!.text;
  },
  post_ref: node => {
    return node.data!.text;
  },
  greentext: node => {
    return `${node.data!.text}\n`;
  },
  header: node => {
    let hashes = "#".repeat(node.data!.level);
    return `${hashes} ${node.data!.text}\n\n`;
  },
  link: node => {
    return `[${node.data!.text}](${node.data!.url})`;
  }
};

export default renderers;