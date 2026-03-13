import type { Operator } from "./operator.ts";

export type Tuple<N extends number, T = unknown>
	= number extends N ? T[] : _Tuple<N, T>;
type _Tuple<N extends number, T, R extends unknown[] = []>
	= R["length"] extends N ? R : _Tuple<N, T, [...R, T]>;

export type PrefixExprNode = Operator<number> | number | PrefixExprNode[];

export type PrefixExpr = (Operator<number> | number)[];
