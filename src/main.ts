import { tokenize } from "./block_tokenizer"
import { parse } from "./block_parser"
import { render } from "./renderer"

interface Options {
	inline_tokenizer?: Function,
	inline_parser?: Function,
	block_tokenizer?: Function,
	block_parser?: Function,
	renderer?: Record<any, any>
}

const format = (input: string, options?: Options): string => {
	const tokens = tokenize(input);
	const ast = parse(tokens);
	const rendered = render(ast, options ? options.renderer : null);
	return rendered;
}

export default format;