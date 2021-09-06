declare module "yargs/helpers" {
	export namespace Parser {
		(await import("yargs-parser")).default;
	}
	export function applyExtends<T>(config: T, cwd: string, mergeExtends: boolean): T;
	export function hideBin(argv: string[]): string[];
}
