import { tokenize } from "./block_tokenizer"
import { parse } from "./block_parser"
import { render } from "./renderer"

import { InlineDefinition } from "./inline_tokenizer/definitions";
import { InlineRule } from "./inline_parser/rules";
import { BlockDefinition } from "./block_tokenizer/definitions";
import { BlockRule } from "./block_parser/rules";
import { Renderers } from "./renderer"

export interface Options {
	inline_definitions?: InlineDefinition[],
	inline_rules?: InlineRule[],
	block_definitions?: BlockDefinition[],
	block_rules?: BlockRule[],
	renderers?: Renderers
}

export const format = (input: string, options?: Options): string => {
	const tokens = tokenize(input, options);
	const ast = parse(tokens, options);
	const rendered = render(ast, options);
	return rendered;
}