import html_renderers from "./renderers/html";
import { Node, Ast } from "../types";

export type Renderer = (ast: Ast, next?: (ast: Ast) => string) => string;
export type Renderers = { [type: string]: Renderer };

export const render = (ast: Ast, renderers?: Renderers): string => {
  if (!renderers) renderers = html_renderers;
  const do_render = build_renderer(renderers)
  return do_render(ast);
}

const build_renderer = (renderers: Renderers) => {

  const do_render = (ast: Ast): string => {

    return ast.reduce((acc: string, node: Node): string => {

      const renderer = renderers[node.type];
      if (renderer) return acc + renderer(node, do_render);
      return acc + renderers["text"](node);

    }, "");
  }

  return do_render;
}