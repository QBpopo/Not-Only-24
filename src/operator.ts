import type { Tuple } from "./types.ts";

export interface Operator<N extends number> {
	readonly symbol: symbol;
	readonly arity: N;
	readonly mapping: (...a: Tuple<N, number>) => number;
	readonly isInDomain: (...a: Tuple<N, number>) => boolean;
	readonly format: (...a: Tuple<N, string>) => string;
}

export const numToOpr
	= (num: number, sym = Symbol(num), format = () => `${num}`): Operator<0> => ({
		symbol: sym,
		arity: 0,
		mapping: () => num,
		isInDomain: () => true,
		format,
	});

export const pi: Operator<0> = {
	symbol: Symbol("pi"),
	arity: 0,
	mapping: () => Math.PI,
	isInDomain: () => true,
	format: () => "π",
};

export const e: Operator<0> = {
	symbol: Symbol("e"),
	arity: 0,
	mapping: () => Math.E,
	isInDomain: () => true,
	format: () => "e",
};

export const identity: Operator<1> = {
	symbol: Symbol("identity"),
	arity: 1,
	mapping: a => a,
	isInDomain: _ => true,
	format: a => a,
};

export const add: Operator<2> = {
	symbol: Symbol("add"),
	arity: 2,
	mapping: (a, b) => a + b,
	isInDomain: _ => true,
	format: (a, b) => `${a}+${b}`,
};

export const sub: Operator<2> = {
	symbol: Symbol("sub"),
	arity: 2,
	mapping: (a, b) => a - b,
	isInDomain: _ => true,
	format: (a, b) => `${a}-${b}`,
};

export const mul: Operator<2> = {
	symbol: Symbol("mul"),
	arity: 2,
	mapping: (a, b) => a * b,
	isInDomain: _ => true,
	format: (a, b) => `${a}*${b}`,
};

export const div: Operator<2> = {
	symbol: Symbol("div"),
	arity: 2,
	mapping: (a, b) => a / b,
	isInDomain: (_, b) => b !== 0,
	format: (a, b) => `${a}/${b}`,
};

export const mod: Operator<2> = {
	symbol: Symbol("mod"),
	arity: 2,
	mapping: (a, b) => a % b,
	isInDomain: (_a, b) => b !== 0,
	format: (a, b) => `${a} mod ${b}`,
};

export const pow: Operator<2> = {
	symbol: Symbol("pow"),
	arity: 2,
	mapping: (a, b) => a ** b,
	isInDomain: (a, b) => a !== 0 && b !== 0,
	format: (a, b) => `${a}^${b}`,
};

export const sqrt: Operator<1> = {
	symbol: Symbol("sqrt"),
	arity: 1,
	mapping: a => Math.sqrt(a),
	isInDomain: a => a >= 0,
	format: a => `√${a}`,
};

export const exp: Operator<1> = {
	symbol: Symbol("exp"),
	arity: 1,
	mapping: a => Math.exp(a),
	isInDomain: _ => true,
	format: a => `e^${a}`,
};

export const log: Operator<2> = {
	symbol: Symbol("log"),
	arity: 2,
	mapping: (a, b) => Math.log(b) / Math.log(a),
	isInDomain: (a, b) => a > 0 && b > 0,
	format: (a, b) => `log${a}(${b})`,
};

export const log2: Operator<1> = {
	symbol: Symbol("log2"),
	arity: 1,
	mapping: a => Math.log(a) / Math.log(2),
	isInDomain: a => a > 0,
	format: a => `log2(${a})`,
};

export const ln: Operator<1> = {
	symbol: Symbol("ln"),
	arity: 1,
	mapping: a => Math.log(a),
	isInDomain: a => a > 0,
	format: a => `ln(${a})`,
};

export const lg: Operator<1> = {
	symbol: Symbol("lg"),
	arity: 1,
	mapping: a => Math.log(a) / Math.log(10),
	isInDomain: a => a > 0,
	format: a => `lg(${a})`,
};

export const fibonacci: Operator<1> = {
	symbol: Symbol("fibonacci"),
	arity: 1,
	mapping: a => {
		if (a === 0 || a === 1) return 1; // f(0) = 1, f(1) = 1
		let r = 1;
		let r1 = 1;
		let r2 = 1;
		for (let i = 2; i <= a; i++) {
			r = r1 + r2;
			r1 = r2;
			r2 = r;
		}
		return r;
	},
	isInDomain: a => a >= 0,
	format: a => `fibonacci(${a})`,
};

export const factorial: Operator<1> = {
	symbol: Symbol("factorial"),
	arity: 1,
	mapping: a => {
		if (a === 0 || a === 1) return 1; // 0! = 1, 1! = 1
		let r = 1;
		for (let i = 2; i <= a; i++) {
			r *= i;
		}
		return r;
	},
	isInDomain: a => a >= 0,
	format: a => `${a}!`,
};

export const combination: Operator<2> = {
	symbol: Symbol("combination"),
	arity: 2,
	mapping: (a, b) => {
		if (b === 0) return 1; // C(a, 0) = 1
		if (b === a) return 1; // C(a, a) = 1
		let r = 1;
		for (let i = 0; i < b; i++) {
			r = (r * (a - i)) / (i + 1); // 计算组合数公式
		}
		return r;
	},
	isInDomain: (a, b) => a >= b && b >= 0,
	format: (a, b) => `C(${a}, ${b})`,
};

export const catalan: Operator<1> = {
	symbol: Symbol("catalan"),
	arity: 1,
	mapping: a => {
		if (a === 0) return 1; // C(0) = 1
		let r = 1;
		for (let i = 0; i < a; i++) {
			r = (r * (2 * a - i)) / (i + 1);
		}
		return r / (a + 1); // 卡特兰数公式：C(n) = (1 / (n + 1)) * C(2n, n)
	},
	isInDomain: a => a >= 0,
	format: a => `catalan(${a})`,
};
