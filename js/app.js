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

		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector("#boardsBtn");
		this.boardsList = this.box.querySelector("#boardsList");
		this.newToDoListName = this.box.querySelector("#listName");
		this.addNewListBtn = this.box.querySelector("#addNewList");
		this.clearListName = this.box.querySelector("#clearListName");
		this.listTasksDom = this.fInDoc(".list__tasks");
		this.listArray = [];
		this.initEvents();
		this.initLocslSrtorage();
	}
	initLocslSrtorage() {
		const local = JSON.parse(localStorage.getItem("app"));
		if (local === null) {
			localStorage.setItem("app", JSON.stringify([]));
			this.index = 1;
		} else {
			this.listArray = JSON.parse(localStorage.getItem("app"));

			this.index = Math.max.apply(Math, this.listArray.map((o) => o.id)) + 1;
			this.listArray.forEach((elem, index) => {
				this.createDomLik(elem.name, elem.id,elem.created,elem.updated);
			});
			this._checkListLength();
		}
	}
	saveInLocalStorage() {
		localStorage.setItem("app", JSON.stringify(this.listArray));
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
	updateListName(id, updateName) {
		this.boardsList.querySelector(`#b${id}`).innerHTML = updateName;
	}
	createDomLik(name, id,created,updated) {
		const html = templateList({ taskName: name }),
			listLi = this.createElement("li", `l${id}`, "listToDo", html),
			boardsLi = this.createElement("li", `b${id}`, "listsName__elem", name);
		this.boardsList.appendChild(boardsLi);
		this.listTasksDom.appendChild(listLi);
		return new ToDoList(id, this,created, updated);
	}
	_checkListLength() {
		if (this.boardsList.children.length) {
			this.listTasksDom.querySelector(".list__empty").style.display = "none";
		} else {
			this.listTasksDom.querySelector(".list__empty").style.display = "block";
		}
	}
	updateListDate(id, date) {
		this.listArray.map((e) => {
			if ((e.id = id)) {
				e.updated = date;
			}
		});
		localStorage.setItem("app", JSON.stringify(this.listArray));
		console.log(this.listArray);
	}
	addNewList() {
		const list = this.createDomLik(this.newToDoListName.value, this.index,'','');
		this.listArray.push({
			id: list.id,
			name: list.nameInp.value,
			created: list.created.innerHTML,
			updated: list.updated.innerHTML,
			tasks: [],
		});

		this.index++;
		this.newToDoListName.value = "";
		this.newToDoListName.focus();
		this.newToDoListName.select();
		clearListName.classList.add("d_none");
		this._checkListLength();
		this.saveInLocalStorage();
	}
	removeChild(id) {
		this.listTasksDom.querySelector(`#l${id}`).remove();
		this.boardsList.querySelector(`#b${id}`).remove();
		this.listArray = this.listArray.filter((e) => {
			return e.id != id;
		});
		console.log(this.listArray);
		localStorage.setItem("app", JSON.stringify(this.listArray));
		this._checkListLength();
	}
}
const header = new App("header");
