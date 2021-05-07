const { Page } = require('../page/Page');
const { Router } = require('./Router');

class DashBoardPage extends Page {
	getRoot() {
		const root = document.createElement('div');
		root.innerHTML = 'dashboard';
		return root;
	}
}
class ExcelPage extends Page {}

describe('Router:', () => {
	let router;
	let $root;

	beforeEach(() => {
		$root = document.createElement('div');
		router = new Router($root, {
			dashboard: DashBoardPage,
			excel: ExcelPage,
		});
	});

	test('should be defined', () => {
		expect(router).toBeDefined();
	});

	test('should render Dashboard Page', () => {
		router.changePageHandler();
		expect($root.innerHTML).toBe('<div>dashboard</div>');
	});
});
