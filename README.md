
# Not Only 24

A highly extensible solver for "24-point" style problems, featuring support for custom operators

## Introduction

You may have heard of the card game "24":

> - Draw 4 cards at random from a standard deck (excluding Jokers)
> - Use basic arithmetic operations to make the total equal 24
> - Each card must be used exactly once; parentheses are allowed to change the order of operations

Today, we are implementing a more versatile and generalized version of this classic game

## Features

In this solver:

- **Unlimited Input**: Supports any number of real numbers, no longer restricted to just 4 cards
- **Flexible Targets**: Set your goal to 42, 100, or even 114514 instead of just 24
- **N-ary Operators**: Supports unary, binary, and even multi-operand operators beyond standard arithmetic
- **Custom Operators**: Easily define new rules by implementing a simple interface

## API

Refer to `demo.ts` for usage examples.

### interface `Operator<N>`

The file `operator.ts` includes several built-in operators (addition, subtraction, multiplication, division, power, log, modulo, factorial, combinations, etc.) and exposes a generic interface `Operator<N>` for customization.

For example, defining a "Ternary Average" operator:

```ts
import type { Operator } from "./operator.ts";

const avg: Operator<3> = {
	symbol: Symbol("avg3"),
	arity: 3,
	mapping: (a, b, c) => (a + b + c) / 3,
	isInDomain: (a, b, c) => true,
	format: (a, b, c) => `(${a}+${b}+${c})/3`,
};
```

### interface `SolveConfig`

The parameter type for the `solve` function:

```ts
interface SolveConfig {
	nums: number[];
	oprs?: Operator<number>[];
	tgt?: number;
}
```

### function `solve`

`solve({ nums, oprs?, tgt? }: SolveConfig): Generator<PrefixExpr>`

- `nums`: The sequence of numbers to be used in calculations.
- `oprs`: The set of allowed operators (defaults to basic arithmetic).
- `tgt`: The target value (defaults to 24).

Returns a iterator containing all feasible solutions (in prefix expression format).

```ts
import { solve } from "./solver.ts";
```

### function `hasSolution`

`hasSolution({ nums, oprs?, tgt? }: SolveConfig): boolean`

- `nums`: The sequence of numbers to be used in calculations.
- `oprs`: The set of allowed operators (defaults to basic arithmetic).
- `tgt`: The target value (defaults to 24).

Returns whether a solution exists.

```ts
import { hasSolution } from "./solver.ts";
```

### function `prefixExprTostr`

`prefixExprTostr(expr: PrefixExpr): string`

Converts a prefix expression into a human-readable format.

```ts
import { prefixExprTostr } from "./utils.ts";
```

### function `memoize`

`memoize(fn): memoizedFn`

Caches the intermediate calculation results of a function; can be used for `operator.mapping`.

```ts
import { memoize } from "./utils.ts";
```

> For fast functions, it's probably unnecessary; for expensive functions, TypeScript (JavaScript) might not be well-suited for CPU-intensive tasks anyway.

## To be continued...

As you can see, the core algorithm is based on recursive backtracking (brute force enumeration), so please be cautious with the scale of the input sequence.

Regarding precision, if you are concerned that JavaScript's native `number` type is insufficient, consider using big number libraries, fraction libraries, or even complex number libraries.

For unary operators, since there are no constraints on the number of times an operator can be used, this remains a tricky aspect to manage.

Additionally, for constants, we borrow functional concepts and imagine them as an `Operator`, for example:

```ts
export const e: Operator<0> = {
	symbol: Symbol("e"),
	arity: 0,
	mapping: () => Math.E,
	isInDomain: () => true,
	format: () => "e",
};
```

As for pruning optimization and deduplication of equivalent expressions: since we already obtain the prefix expressions for all feasible solutions, handling commutative and associative laws is not a big deal.

Of course, there are other projects on GitHub offering more excellent approaches, but this project is more than sufficient for general 24-point problems.

After all, I'm a "package-caller"; I have no desire to reinvent the wheel.
