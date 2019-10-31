# Markdown
A custom, incomplete, untested and extensible markdown parser

## Installation
With npm:
```
npm install @embers-pw/markdown
```

With yarn:
```
yarn add @embers-pw/markdown
```

## Usage

```js
import {format} from "@embers-pw/markdown";

console.log("# Hello, *world!*");
// "<h1>Hello, <em>world!</em></h1>"
```

## How it works

Markdown consists of a tokenizer and a parser for both block and inline rules.

Tokenzers scan the input text, if they find a pattern matching a token
definition, they convert it into a `Token`. The result of a tokenizer run is
an array of `Token`s for the parser to consume.
If there isn't a definition, it will default to a text token.

Parsers receive the `Token` stream and produce a tree of `Node`s resembling an `Ast` based on the
provided rules. If the rule is *recursive*, the parser will run recursively
on the `Node` contents.
If no rule matches, it will default to a text node.

Finally, the renderer will take an `Ast` and run a renderer function for each
`Node`. The renderer functions receive a `next` function that can be use to
recursively render the `Node`.

When running `format` the tokenizers and parsers are ran in the order:
- Block Tokenizer
- Block Parser
- - Inline tokenizer?*
- - Inline parser?*
- Renderer

\* Inline tokenizer and parser are ran if the block is *recursive*.