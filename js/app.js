/*jshint esversion: 6 */
/* jshint -W024 */
/* jshint expr:true */
import { Global } from "./global";
import { ToDoList } from "./toDoList";

const source = document.getElementById("list-template").innerHTML,
	templateList = Handlebars.compile(source);

class App extends Global {
	constructor(id) {
		super();
		this.index = 1;
		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector("#boardsBtn");
		this.boardsList = this.box.querySelector("#boardsList");
		this.newToDoListName = this.box.querySelector("#listName");
		this.addNewListBtn = this.box.querySelector("#addNewList");
		this.clearListName = this.box.querySelector("#clearListName");
		this.listTasksDom = this.fInDoc(".list__tasks");
		this.initEvents();
	}
	initEvents() {
		this.boardsBtn.addEventListener(
			"click",
			() => {
				if (!this.boardsList.children.length) return;
				this.boardsList.classList.toggle("h-0");
			},
			false
		);

		this.newToDoListName.addEventListener(
			"keyup",
			(e) => {
				if (this._checkName()) {
					clearListName.classList.remove("d_none");
					if (e.keyCode === 13) {
						this.addNewList();
					}
				} else {
					clearListName.classList.add("d_none");
				}
			},
			false
		);
		this.addNewListBtn.addEventListener(
			"click",
			() => {
				this._checkName() ? this.addNewList() : false;
			},
			false
		);

		this.clearListName.addEventListener(
			"click",
			() => {
				this.newToDoListName.value = "";
				this.clearListName.classList.add("d_none");
			},
			false
		);
	}
	_checkName() {
		if (!this.newToDoListName.validity.valid) {
			this.box.querySelector(".error").classList.add("hide");
		} else {
			this.box.querySelector(".error").classList.remove("hide");
		}
		return this.newToDoListName.value.trim().length;
	}
	updateListName(id,updateName){
this.boardsList.querySelector(`#b${id}`).innerHTML = updateName;
	}
	addNewList() {
		const html = templateList({ taskName: this.newToDoListName.value }),
			listLi = this.createElement("li", `l${this.index}`, "listToDo", html),
			boardsLi = this.createElement("li", `b${this.index}`, "listsName__elem", this.newToDoListName.value);

		this.boardsList.appendChild(boardsLi);
		this.listTasksDom.appendChild(listLi);

		const list = new ToDoList(this.index, this);
		if (this.boardsList.children.length) {
			this.listTasksDom.querySelector(".list__empty").style.display = "none";
		} else {
			this.listTasksDom.querySelector(".list__empty").style.display = "block";
		}
		this.index++;
		this.newToDoListName.value = "";
		this.newToDoListName.focus();
		this.newToDoListName.select();
		clearListName.classList.add("d_none");
	}
	removeChild(id) {
		this.listTasksDom.querySelector(`#l${id}`).remove();
		this.boardsList.querySelector(`#b${id}`).remove();
		if (this.boardsList.children.length) {
			this.listTasksDom.querySelector(".list__empty").style.display = "none";
		} else {
			this.listTasksDom.querySelector(".list__empty").style.display = "block";
		}
	}
}
const header = new App("header");
