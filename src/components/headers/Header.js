import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '../../redux/actions';
import { debounce } from '../../core/utils';

export class Header extends ExcelComponent {
	static className = 'excel__header';
	static tagName = 'header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options,
		});
	}

	prepare() {
		this.onInput = debounce(this.onInput, 100);
	}

	toHTML() {
		const title = this.$getState().title;

		return `
		<input type="text" class="input" value="${title}">

		<div class="btns-wrapper">
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
		</div>
		`;
	}

	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}
}
