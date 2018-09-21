
export class Global {
	constructor() {}
	createElement(elem = 'div', id = '', classList = '', html = '') {
		const e = document.createElement(elem);
		e.setAttribute('id', id);
		e.classList.add(classList);
		e.innerHTML = html;
		return e;
	}
	fInDoc(elem, all = false) {
		if (all !== false) {
			const obj = [...document.querySelectorAll(elem)];
			return obj;
		} else {
			const obj = document.querySelector(elem);
			return obj;
		}
	}
}
