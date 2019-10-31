import escape from "../../escape_html"
import { Node } from "../../types";
import { Renderer, Renderers } from "../index";

const renderers: Renderers = {
  text: node => {
    return escape(node.data!.text);
  },
  code_block: node => {
    return `<pre><code class="${node.data!.lang}">${escape(
      node.data!.text
    )}</code></pre>`;
  },
  bold: (node, next) => {
    return `<strong>${next!(node.data!.children)}</strong>`;
  },
  emphasis: (node, next) => {
    return `<em>${next!(node.data!.children)}</em>`;
  },
  strikethrough: (node, next) => {
    return `<del>${next!(node.data!.children)}</del>`;
  },
  inline_code: node => {
    return `<code>${escape(node.data!.text)}</code>`;
  },
  break: () => {
    return "<br>";
  },
  paragraph: (node, next) => {
    return `<p>${next!(node.data!.children)}</p>`;
  },
  mention: node => {
    const name = node.data!.text!.slice(1, node.data!.text!.length);
    return `@<a href="">${name}</a>`;
  },
  hashtag: node => {
    const name = node.data!.text!.slice(1, node.data!.text!.length);
    return `<a href="">#${name}</a>`;
  },
  post_ref: node => {
    const name = node.data!.text!.slice(2, node.data!.text!.length);
    return `>><a href="">${name}</a>`;
  },
  greentext: node => {
    return `<p class="greentext">${escape(node.data!.text)}</p>`;
  },
  header: node => {
    const level = node.data!.level;
    const text = escape(node.data!.text);
    return `<h${level}>${text}</h${level}>`;
  },
  link: node => {
    return `<a href="${node.data!.url}">${escape(node.data!.text)}</a>`;
  }
}

export default renderers;
