import { Global } from './global';
import { ToDoList } from './toDoList';
import "../css/normalize.css";
import "../css/style.css";
import "../index.html";
// import  "./sw.js"
// navigator.serviceWorker.register("./sw.js")
class App extends Global {
	constructor(id) {
		super();
		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector('#boardsBtn');
		this.menuBtn = this.box.querySelector('#menuBtn');
		this.boardsList = this.box.querySelector('#boardsList');
		this.newToDoListName = this.box.querySelector('#listName');
		this.addNewListBtn = this.box.querySelector('#addNewList');
		this.clearListName = this.box.querySelector('#clearListName');
		this.listTasksDom = this.fInDoc('.list__tasks');
		this.listArray = [];
		this.index = 0;
		this.initEvents();
		this.initLocalSrtorage();
	}
	initLocalSrtorage() {
		const local = JSON.parse(localStorage.getItem('app'));
		if (local === null) {
			localStorage.setItem('app', JSON.stringify([]));
			this.index = 1;
		} else {
			this.listArray = JSON.parse(localStorage.getItem('app'));
			this.index = Math.max.apply(Math, this.listArray.map((o) => o.id)) + 1;
			this.listArray.forEach((elem, index) => {
				const { name, id, created, updated, tasks } = elem;
				this.createDomLik(name, id, created, updated, tasks);
			});
			this._checkListLength();
		}
	}
	saveInLocalStorage() {
		localStorage.setItem('app', JSON.stringify(this.listArray));
		this._checkListLength();
	}
	_mobileMenu() {
		const menu = document.querySelector('.nav__mobile'),
			addListBox = document.querySelector('.header__addListBox');
		menu.classList.toggle('active');
		addListBox.classList.toggle('active');
		this.menuBtn.classList.toggle('active');
	}
	initEvents() {
		this.boardsBtn.addEventListener(
			'click',
			() => {
				if (!this.boardsList.children.length) return;
				this.boardsList.classList.toggle('h-0');
			},
			false
		);
		this.menuBtn.addEventListener(
			'click',
			() => {
				this._mobileMenu();
			},
			false
		);

		this.newToDoListName.addEventListener(
			'keyup',
			(e) => {
				if (this._checkName()) {
					clearListName.classList.remove('d_none');
					if (e.keyCode === 13) {
						this.addNewList();
					}
				} else {
					clearListName.classList.add('d_none');
				}
			},
			false
		);
		this.addNewListBtn.addEventListener(
			'click',
			() => {
				this._checkName() ? this.addNewList() : false;
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
	_checkName() {
		if (!this.newToDoListName.validity.valid) {
			this.box.querySelector('.error').classList.add('hide');
		} else {
			this.box.querySelector('.error').classList.remove('hide');
		}
		return this.newToDoListName.value.trim().length;
	}
	updateListName(id, name) {
		this.boardsList.querySelector(`#b${id}`).innerHTML = name;
		this.updateLocalStorage({ name, id });
	}
	createDomLik(name, id, created, updated, tasks) {
		const boardsLi = this.createElement('button', `b${id}`, 'listsName__elem', name);

		this.boardsList.appendChild(boardsLi);
		boardsLi.addEventListener('click',()=>{
			const target = this.listTasksDom.querySelector(`#l${id}`);
			this.listTasksDom.scrollTo(0,target.offsetTop-110)
		})

		const list = new ToDoList(name, id, this, created, updated, tasks);
		this.listTasksDom.appendChild(list.domElem.box);
		return list;
	}
	_checkListLength() {
		if (this.boardsList.children.length) {
			this.listTasksDom.querySelector('.list__empty').style.display = 'none';
		} else {
			this.listTasksDom.querySelector('.list__empty').style.display = 'block';
		}
	}

	updateLocalStorage(props) {
		const { id, name, created, updated, tasks } = props;
		this.listArray.map((e) => {
			if (e.id == id) {
				if (name) {
					e.name = name;
				}
				if (created) {
					e.created = created;
				}
				if (updated) {
					e.updated = updated;
				}
				if (tasks) {
					e.tasks = tasks;
				}
			}
		});
		this.saveInLocalStorage();
	}
	addNewList() {
		const list = this.createDomLik(this.newToDoListName.value.trim(), this.index, '', '');
		this.index++;
		this.newToDoListName.value = '';
		this.newToDoListName.focus();
		this.newToDoListName.select();
		clearListName.classList.add('d_none');
		const { id, name, created, updated, tasks } = list;
		this.listArray.push({ id, name, created, updated, tasks });
		this.saveInLocalStorage();
	}
	removeChild(id) {
		this.listTasksDom.querySelector(`#l${id}`).remove();
		this.boardsList.querySelector(`#b${id}`).remove();
		this.listArray = this.listArray.filter((e) => {
			return e.id != id;
		});
		this.saveInLocalStorage();
	}
}
const header = new App('header');