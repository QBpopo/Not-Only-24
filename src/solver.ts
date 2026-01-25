
import type { Operator } from "./operator.ts";
import { add, sub, mul, div } from "./operator.ts";
import type { NestedArray } from "./utils.ts";
import * as utils from "./utils.ts";

type TreeExpr = NestedArray<Operator<number> | number>;
type PrefixExpr = (Operator<number> | number)[];

// `Number.EPSILON` is 2.220446049250313e-16, which is too small
const EPSILON = 1e-12;

export const solve = (
	nums: number[],
	oprs: Operator<number>[] = [add, sub, mul, div],
	tgt = 24,
): PrefixExpr[] => {
	const exprs: PrefixExpr[] = [];
	const sortedArr = [...nums].sort((a, b) => a - b);
	(function _solve(_nums: number[], _expr: TreeExpr, depth = 0) {
		if (_nums.length === 1 && Math.abs(_nums[0]! - tgt) < EPSILON) {
			exprs.push((_expr as unknown[]).flat(depth) as PrefixExpr);
		}
		for (const opr of oprs) {
			if (_nums.length < opr.arity) continue;
			for (const indice of utils.getAllPermutations(
				Array.from({ length: _nums.length }, (_, i) => i),
				opr.arity,
			)
			) {
				const x = [...indice.map(i => _nums[i]!)];
				if (!opr.isInDomain(...x)) continue;
				_solve(
					_nums.filter((_, i) => !indice.includes(i))
						.concat(opr.mapping(...x)),
					_nums.map((_, i) => _expr[i]!)
						.filter((_, i) => !indice.includes(i))
						.concat([[opr, ...indice.map(i => _expr[i]!)]]),
					depth + 1,
				);
			}
		}
	})(sortedArr, [...sortedArr]);
	return exprs;
};

export const prefixExpr2str = (expr: PrefixExpr): string => {
	const stack: string[] = [];
	for (let i = expr.length - 1; i >= 0; i--) {
		const token = expr[i]!;
		if (typeof token === "number") {
			stack.push(`${token}`);
		} else {
			const x: string[] = [];
			for (let j = 0; j < token.arity; j++) {
				x.push(stack.pop()!);
			}
			stack.push(i !== 0 ? `(${token.format(...x)})` : token.format(...x));
		}
	}
	return stack[0]!;
};
