import type { PrefixExpr } from "./types.ts";

export const getAllPermutations = <T>(arr: T[], n: number): T[][] => {
	if (n === 0) return [[]];
	if (n > arr.length) throw new Error();
	arr.sort();
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i++) {
		if (i > 0 && arr[i] === arr[i - 1]) continue;
		const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
		const restPerms = getAllPermutations(rest, n - 1);
		for (const perm of restPerms) {
			result.push([arr[i]!, ...perm]);
		}
	}
	return result;
};

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
