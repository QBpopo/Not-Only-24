
import { solve, prefixExpr2str } from "./solver.ts";

// const arr = [1, 2, 3, 4];
// const arr = [2, 3, 5, 7];
// const arr = [1, 5, 5, 5];
// const arr = [3, 3, 8, 8];
const arr = [3, 5, 7, 9];
const solutions = solve(arr);

solutions.forEach(e => {
	console.log(prefixExpr2str(e));
});
console.log(solutions.length);
