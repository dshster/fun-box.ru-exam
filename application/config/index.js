compileConfig.$inject = ['$compileProvider'];
export function compileConfig($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}
