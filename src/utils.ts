import type { PrefixExpr } from "./types.ts";

export function* permuteUnique<T>(arr: T[], n: number): Generator<T[]> {
	if (n < 0 || n > arr.length) throw new Error("Invalid n");
	const sorted = [...arr].sort();
	const used = Array.from({ length: sorted.length }, () => false);
	const path: T[] = [];
	yield* (function* backtrack(): Generator<T[]> {
		if (path.length === n) return yield [...path];
		for (let i = 0; i < sorted.length; i++) {
			if (used[i]) continue;
			if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
			used[i] = true;
			path.push(sorted[i]!);
			yield* backtrack();
			path.pop();
			used[i] = false;
		}
	})();
}
export const prefixExprToStr = (expr: PrefixExpr): string => {
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

const _memoize = <Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R => {
	type CacheNode = { childNodes: Map<unknown, CacheNode>; value?: R; isCached?: boolean };
	const root: CacheNode = { childNodes: new Map() };
	return (...args: Args) => {
		let node = root;
		for (const arg of args) {
			let nextNode = node.childNodes.get(arg);
			if (!nextNode) {
				nextNode = { childNodes: new Map() };
				node.childNodes.set(arg, nextNode);
			}
			node = nextNode;
		}
		if (!node.isCached) {
			node.value = fn(...args);
			node.isCached = true;
		}
		return node.value as R;
	};
};

export const memoize = _memoize<number[], number>;
