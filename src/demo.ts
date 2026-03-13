import { solve } from "./solver.ts";
import { prefixExprToStr } from "./utils.ts";

// const nums = [1, 2, 3, 4];
// const nums = [2, 3, 5, 7];
// const nums = [1, 5, 5, 5];
// const nums = [3, 3, 8, 8];
// const nums = [4, 4, 8, 8];
const nums = [3, 5, 7, 9];
const solutions = solve({ nums });

let count = 0;
for (const e of solutions) {
	console.log(prefixExprToStr(e));
	count++;
}
console.log(count);
