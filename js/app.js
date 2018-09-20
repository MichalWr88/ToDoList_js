/*jshint esversion: 6 */
import * as _glob from './global';

import { ToDoList } from './toDoList';

const source = document.getElementById('list-template').innerHTML,
	templateList = Handlebars.compile(source);

// let add = document.querySelector('.addList__addBtn'),
// 	body = document.querySelector('body'),
// 	indexList = 1;
// console.log(add);

class App {
	constructor(id) {
		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector('#boardsBtn');
		this.boardsList = this.box.querySelector('#boardsList');
		this.newToDoListName = this.box.querySelector('#listName');
		this.addNewListBtn = this.box.querySelector('#addNewList');
		this.clearListName = this.box.querySelector('#clearListName');
		this.listTasksDom = _glob.cElem('.list__tasks');

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
				if (this.newToDoListName.value.trim().length) {
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
				if (this.newToDoListName.value.trim().length) {
					this.addNewList();
				} else {
				}
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
		const html = templateList({ taskName: this.newToDoListName.value });
		const listLi = this.li.cloneNode(true);
		const boardsLi = this.li.cloneNode(true);

    boardsLi.innerHTML = this.newToDoListName.value;
    boardsLi.className = 'listsName__elem';
    boardsLi.setAttribute('id', `b${this.index}`);
    this.boardsList.appendChild(boardsLi);
    listLi.className = 'listToDo';
    listLi.setAttribute('id', `l${this.index}`);
    listLi.innerHTML = html;
		this.listTasksDom.appendChild(listLi);
		const list = new ToDoList(this.index, this);
    if (this.boardsList.children.length) {
      this.listTasksDom.querySelector('.list__empty').style.display = 'none';
    } else {
      this.listTasksDom.querySelector('.list__empty').style.display = 'block';
    }
		this.index++;

		this.newToDoListName.value = '';
	}
	createListElem(id) {}
	removeChild(id) {
    this.listTasksDom.querySelector(`#l${id}`).remove();
    this.boardsList.querySelector(`#b${id}`).remove();
    if (this.boardsList.children.length) {
      this.listTasksDom.querySelector('.list__empty').style.display = 'none';
    } else {
      this.listTasksDom.querySelector('.list__empty').style.display = 'block';
    }
	}
}

const header = new App('header');
console.log(header);
