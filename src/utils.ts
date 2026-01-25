
export type Tuple<T, N extends number> = number extends N
	? T[] : _Tuple<T, N>;
type _Tuple<T, N extends number, R extends unknown[] = []>
	= R["length"] extends N ? R : _Tuple<T, N, [...R, T]>;

export type NestedArray<T> = (NestedArray<T> | T)[];

export const getAllPermutations = <T>(arr: T[], n: number): T[][] => {
	if (n === 0) return [[]];
	if (n > arr.length) return [];
	const result: T[][] = [];
	arr.sort();
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
