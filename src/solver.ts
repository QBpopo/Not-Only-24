import type { Operator } from "./operator.ts";
import { add, sub, mul, div } from "./operator.ts";
import type { PrefixExprNode, PrefixExpr } from "./types.ts";
import * as utils from "./utils.ts";


// `Number.EPSILON` is 2.220446049250313e-16, which is too small
const EPSILON = 1e-12;

function* _solve(
	nums: number[],
	expr: PrefixExprNode[],
	oprs: Operator<number>[],
	tgt: number,
	depth: number = 0,
): Generator<{ expr: PrefixExprNode[]; depth: number }> {
	if (nums.length === 1 && Math.abs(nums[0]! - tgt) < EPSILON) {
		yield { expr, depth };
	}
	for (const opr of oprs) {
		if (nums.length < opr.arity) continue;
		for (const indice of utils.getAllPermutations(Array.from({ length: nums.length }, (_, i) => i), opr.arity)) {
			const x = indice.map(i => nums[i]!);
			if (!opr.isInDomain(...x)) continue;
			yield* _solve(
				nums.filter((_, i) => !indice.includes(i))
					.concat(opr.mapping(...x)),
				nums.map((_, i) => expr[i]!)
					.filter((_, i) => !indice.includes(i))
					.concat([[opr, ...indice.map(i => expr[i]!)]]),
				oprs, tgt, depth + 1,
			);
		}
	}
}

interface SolveConfig {
	nums: number[];
	oprs?: Operator<number>[];
	tgt?: number;
}

export function* solve(config: SolveConfig): Generator<PrefixExpr> {
	const { nums, oprs = [add, sub, mul, div], tgt = 24 } = config;
	const sortedArr = [...nums].sort((a, b) => a - b);
	for (const { expr, depth } of _solve(sortedArr, sortedArr, oprs, tgt)) {
		yield (expr as unknown[]).flat(depth) as PrefixExpr;
	}
};

export const hasSolution = (config: SolveConfig): boolean => {
	return !solve(config).next().done;
};
