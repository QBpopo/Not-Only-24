
# Not Only 24

A highly extensible solver for "24-point" style problems, featuring support for custom operators

## Introduction

You may have heard of the card game "24":

> * Draw 4 cards at random from a standard deck (excluding Jokers)
> * Use basic arithmetic operations to make the total equal 24
> * Each card must be used exactly once; parentheses are allowed to change the order of operations

Today, we are implementing a more versatile and generalized version of this classic game

## Features

In this solver:

* **Unlimited Input**: Supports any number of real numbers, no longer restricted to just 4 cards
* **Flexible Targets**: Set your goal to 42, 100, or even 114514 instead of just 24
* **N-ary Operators**: Supports unary, binary, and even multi-operand operators beyond standard arithmetic
* **Custom Operators**: Easily define new rules by implementing a simple interface

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

### function `solve`

`solve(nums, oprs?, tgt?)`

* `nums`: The sequence of numbers to be used in calculations.
* `oprs`: The set of allowed operators (defaults to basic arithmetic).
* `tgt`: The target value (defaults to 24).

Returns an array of all feasible solutions, where each solution is stored as a prefix expression (Polish notation).

```ts
import { solve } from "./solver.ts";
```

### function `prefixExpr2str`

`prefixExpr2str(expr)`

Converts a prefix expression into a human-readable format.

```ts
import { prefixExpr2str } from "./solver.ts";
```

## To be continued...

As you can see, the core algorithm is based on **recursive backtracking (DFS)**, so please be cautious with the scale of the input sequence.

Regarding **precision**: If JavaScript's native `number` type is insufficient for your needs, consider integrating big number, fraction, or even complex number libraries.

For **unary operators**: Since there are no constraints on the number of times an operator can be used, this remains a tricky aspect to manage.

As for **pruning optimization** and **deduplication** of equivalent expressions: Since we already have the prefix expressions for all feasible solutions, handling commutative and associative laws is manageable.

Of course, there are other projects on GitHub offering more sophisticated approaches, but this project is more than sufficient for general 24-point problems.

After all, I'm a "package-caller" (API enthusiast)—I have no desire to reinvent the wheel.
