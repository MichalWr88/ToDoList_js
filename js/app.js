/*jshint esversion: 6 */
import * as _glob from './global';
const addListBtn = _glob.cElem('.btn', true);
// console.log(addListBtn);
const source = document.getElementById('list-template').innerHTML,
	templateList = Handlebars.compile(source);

let add = document.querySelector('.addList__addBtn'),
	body = document.querySelector('body'),
	indexList = 1;
console.log(add);

class App {
	constructor(id) {
		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector('#boardsBtn');
		this.boardsList = this.box.querySelector('#boardsList');
		this.newToDoListName = this.box.querySelector('#listName');
		this.addNewListBtn = this.box.querySelector('#addNewList');
		this.clearListName = this.box.querySelector('#clearListName');
		this.listTasks = _glob.cElem('.list__tasks');
		this.li = document.createElement('li');
		this.index = 1;
		this.initEvents();
	}

	initEvents() {
		this.boardsBtn.addEventListener(
			'click',
			e => {
				this.boardsList.classList.toggle('h-0');
			},
			false
		);
		this.newToDoListName.addEventListener(
			'keyup',
			e => {
				this.newToDoListName.value.trim().length ? clearListName.classList.remove('d_none') : clearListName.classList.add('d_none');
				if (e.keyCode === 13) {
					this.addNewList();
				}
			},
			false
		);
		this.addNewListBtn.addEventListener(
			'click',
			() => {
				this.addNewList();
			},
			false
		);
		this.clearListName.addEventListener(
			'click',
			() => {
				this.newToDoListName.value = '';
				this.clearListName.classList.add('d_none');
			},
			false
		);
	}
	addNewList() {
		const id = `l${this.index}`;
		this.index++;
		const html = templateList({ taskName: this.newToDoListName.value });
		const listLi = this.li.cloneNode(true);
		const boardsLi = this.li.cloneNode(true);
		boardsLi.innerHTML = this.newToDoListName.value;
		boardsLi.className = 'listsName__elem';
		this.boardsList.appendChild(boardsLi);
		listLi.className = 'listToDo';
		listLi.setAttribute('id', id);
		listLi.innerHTML = html;
		this.listTasks.appendChild(listLi);
		const list = new ToDoList(id);
		this.newToDoListName.value = '';
  }
  createListElem(id){

  }
}

const header = new App('header');
console.log(header);

class ToDoList {
	constructor(id) {
		this.box = document.getElementById(id);
		this.nameInp = this.box.querySelector('.listToDo__name');
		this.newTaskInp = this.box.querySelector('.listToDo__newTask');
		this.addBtn = this.box.querySelector('.listToDo__add');
		this.listNode = this.box.querySelector('.listToDo__container');
		this.countAll = this.box.querySelector('.listToDo__allCount');
		this.countChecked = this.box.querySelector('.listToDo__chekedCount');
		// -----------------------------------
		this.id = id;
		this.list = [];
		this.countTask = 0;
		this.checked = null;
		// this.name = this.nameInp.value;

		//------------------
		this.initList();
		// this.initLocalStorage();
		this.initEvent();
	}

	initList() {
		this.countAll.innerHTML = this.countTask;
	}
	initLocalStorage() {
		const local = JSON.parse(localStorage.getItem(this.id));
		if (local === null) {
			localStorage.setItem(this.id, JSON.stringify(this.list));
		} else {
			this.list = JSON.parse(localStorage.getItem(this.id));
			console.log(this.list);
			this.countTask = this.list.length;
			this.countAll.innerHTML = this.countTask;
			this.list.forEach((elem, index) => {
				const Task = this.createLik(elem.text, elem.date, elem.checked);
				this.listNode.appendChild(Task.lik);
			});
		}
	}
	updateCheckedTask() {
		const count = 0;
		const array = this.list.filter(elem => {
			return elem.checked === true;
		});
		this.checked = array.length;
		this.countChecked.textContent = this.checked;
	}
	sortList() {
		this.list.sort((a, b) => {
			let AA = a.checked === true ? 1 : 0;
			console.log(AA);
			let BB = b.checked === true ? 1 : 0;
			// console.log(BB);

			return AA - BB;
		});
		localStorage.setItem(this.id, JSON.stringify(this.list));
	}

	createLik(name, dat, check) {
		let date = '',
			day = '',
			month = '',
			year = '';
		if (!dat) {
			(date = new Date()), (day = date.getDate()), (month = date.getMonth() + 1), (year = date.getFullYear());
			console.log(date);
		} else {
			const txt = dat.split('.');
			console.log(txt);
			(day = txt[0]), (month = txt[1]), (year = txt[2]);
		}

		// ----------------------------------------------------------
		const lik = document.createElement('li');
		lik.className = 'listToDo__task';

		// ---------------------------------------------------------------
		let priority = document.createElement('select');
		priority.className = 'task_priority';
		for (let i = 0; i <= 5; i++) {
			let opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = i;
			priority.appendChild(opt);
		}

		// -----------------------------------------------------------------

		let nameInp = document.createElement('h3');
		nameInp.className = 'task__name';
		nameInp.setAttribute('contenteditable', 'true');
		nameInp.textContent = name;
		// -------------------------------------------------------------------
		let labelP = document.createElement('label');
		labelP.className = 'task__label';
		labelP.textContent = 'priority';
		console.log(day);
		let dateTask = document.createElement('p');
		dateTask.className = 'task__date';
		dateTask.textContent = `create: ${day}.${month}.${year}`;

		let delBtn = document.createElement('button');
		delBtn.className = 'ion-close-round btn task__delete';
		delBtn.addEventListener(
			'click',
			e => {
				e.target.parentNode.remove(e.target.parentNode);
				this.list = this.list.filter(function(elem) {
					if (elem.text !== name) {
						return elem;
					}
				});
				localStorage.setItem(this.id, JSON.stringify(this.list));
				this.countTask = this.list.length;
				this.countAll.innerHTML = this.countTask;
			},
			false
		);
		// --------------------------------------------------------------
		let checkBtn = document.createElement('button');
		checkBtn.className = 'ion-checkmark-round btn task__check';
		checkBtn.addEventListener(
			'click',
			() => {
				labelP.classList.toggle('blured');
				nameInp.classList.toggle('checked');
				nameInp.setAttribute('disabled', true);
				if (data.checked === false) {
					data.checked = true;
					this.list.map(elem => {
						if (elem.text === data.text) {
							elem.checked = true;
						}
					});
					// this.list.push(Task.data);
					localStorage.setItem(this.id, JSON.stringify(this.list));
				} else {
					data.checked = false;
					this.list.map(elem => {
						if (elem.text === data.text) {
							elem.checked = false;
						}
					});
					// this.list.push(Task.data);
					localStorage.setItem(this.id, JSON.stringify(this.list));
				}
				this.updateCheckedTask();
				this.sortList();
			},
			false
		);
		// ---------------------------------------------------------------------------
		//
		let count = this.list.length + 1;
		// create object with task prop
		let data = {
			id: count,
			text: name,
			checked: '',
			priority: 0,
			date: `${day}.${month}.${year}`
		};
		if (check === undefined) {
			data.checked = false;
		} else {
			data.checked = check;
		}
		labelP.append(priority);
		lik.append(checkBtn);
		lik.append(nameInp);
		lik.append(delBtn);
		lik.append(labelP);
		lik.append(dateTask);
		console.log(data.checked);
		if (data.checked === true) {
			labelP.classList.toggle('blured');
			nameInp.classList.toggle('checked');
			nameInp.setAttribute('disabled', true);
		}
		this.updateCheckedTask();
		return { lik, data };
	}

	initTask(name) {
		createLik(name);
		this.list.push(Task.data);
		localStorage.setItem(this.id, JSON.stringify(this.list));

		// var storedNames = JSON.parse(localStorage.getItem(this.id));

		// ------------------------------------------------------------------
	}

	initEvent() {
		// change input name List
		this.nameInp.addEventListener(
			'blur',
			e => {
				this.name = e.target.value.trim();
			},
			false
		);

		// add Task
		this.addBtn.addEventListener(
			'click',
			() => {
				const templateTask = document.getElementById('task-template').innerHTML;
				const likHtml = Handlebars.compile(templateTask);
				const html = likHtml({ id: 1, taskName: this.newTaskInp.value.trim(), createDate: new Date().toDateString() });

				console.log(likHtml);
				const lik = document.createElement('li');
				lik.className = 'listToDo__task';
				lik.innerHTML = html;
				const Task = this.createLik(this.newTaskInp.value.trim());
				this.listNode.appendChild(lik);
				this.list.push(Task.data);
				this.countTask++;
				this.countAll.innerHTML = this.countTask;
				localStorage.setItem(this.id, JSON.stringify(this.list));
				this.newTaskInp.value = '';
			},
			false
		);
		// ===================================================
		this.newTaskInp.addEventListener(
			'keydown',
			e => {
				if (e.keyCode === 13) {
					const Task = this.createLik(this.newTaskInp.value.trim());
					this.listNode.appendChild(Task.lik);
					this.list.push(Task.data);
					this.countTask++;
					this.countAll.innerHTML = this.countTask;
					localStorage.setItem(this.id, JSON.stringify(this.list));
					this.newTaskInp.value = '';
				}
			},
			false
		);
		// ===================================================
	}
}
class Task {
	constructor(id) {
		this.id = id;
		this.templateTask = document.getElementById('task-template').innerHTML;
		this.lik = Handlebars.compile(templateTask);
	}
}

let list1 = new ToDoList('list1');
