
# Not Only 24

一个高度可扩展的类 24 点问题求解器，支持自定义算符

## Introduction

你们或许听说过一个名为 24 点的扑克游戏

> - 在一副去掉大小王的扑克牌里随机抽取 4 张牌
> - 通过任意次四则运算，将牌的点数计算出 24 点
> - 每张牌只能使用一次，可以使用括号来改变运算顺序

今天，我们将实现一个更加通用、更加广泛的模式

## Features

在这个求解器中：

- 不限输入：支持输入任意数量的任意实数，不再局限于 4 张扑克牌
- 不限目标：将 24 点换成 42 点、100点、甚至 114514 点都可以
- 不限维度：支持一元、二元、乃至多元算符，不再局限于加减乘除
- 自定义算符：通过实现简单的接口即可轻松定义全新的运算法则

## API

你可以在 `demo.ts` 查看使用示例

### interface `Operator<N>`

`operator.ts` 内置了部分常见算符（加减乘除、指对、取模、阶乘、组合数等等），并暴露一个提供用户自定义算符的泛型接口 `Operator<N>`

例如，定义一个「三元平均值」算符：

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

函数 `solve` 的参数类型

```ts
interface SolveConfig {
	nums: number[];
	oprs?: Operator<number>[];
	tgt?: number;
}
```

### function `solve`

`solve({ nums, oprs?, tgt? }: SolveConfig): Generator<PrefixExpr>`

- `nums`：参与运算的数字序列
- `oprs`：允许使用的算符集合，缺省为四则运算
- `tgt`：计算目标值，缺省为 24

返回一个包含所有可行解（前缀表达式形式）的迭代器

```ts
import { solve } from "./solver.ts";
```

### function `hasSolution`

`hasSolution({ nums, oprs?, tgt? }: SolveConfig): boolean`

- `nums`：参与运算的数字序列
- `oprs`：允许使用的算符集合，缺省为四则运算
- `tgt`：计算目标值，缺省为 24

返回是否存在解

```ts
import { hasSolution } from "./solver.ts";
```

### function `prefixExprTostr`

`prefixExprTostr(expr: PrefixExpr): string`

将前缀表达式转换为人类可读的格式

```ts
import { prefixExprTostr } from "./utils.ts";
```

### function `memoize`

`memoize(fn): memoizedFn`

缓存一个函数的中间计算结果，可用于 `operator.mapping`

```ts
import { memoize } from "./utils.ts";
```

> 对于耗时小的函数，大概没有必要使用；对于耗时大的函数，或许 TypeScript (JavaScript) 不擅长 CPU 密集型任务

## To be countied...

如你所见，求解的核心算法是递归回溯的暴力枚举，所以请慎重考虑输入的数字序列规模

对于精度问题，如果担心 JavaScript 的 `number` 不能胜任，应当考虑使用大数库、分数库、甚至复数库

对于一元算符，由于题目没有约束算符的使用次数，这倒成了棘手的事情

此外，对于常数，我们借用函数式的思想，想象它是一个 `Operator`，例如：

```ts
export const e: Operator<0> = {
	symbol: Symbol("e"),
	arity: 0,
	mapping: () => Math.E,
	isInDomain: () => true,
	format: () => "e",
};
```

至于剪枝优化和等价表达式去重，反正已经拿到所有可行解的前缀表达式，考虑交换律和结合律什么的也不是什么大问题

当然，GitHub 上也有其他项目提供了更优秀的做法，不过此项目对于一般的 24 点问题已然足够

毕竟我是个调包侠，不想重复造轮子
