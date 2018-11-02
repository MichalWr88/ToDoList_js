import { Task } from "./task";
import { Global } from "./global";
export class ToDoList extends Global {
	constructor(name,id, parent, created, updated,tasks) {
		super();
		this.id = id;
		this.parent = parent;
		this.created = created || this._getFormatDate();
		this.updated = updated || "";
		this.name = name;
		this.tasks = tasks || [];
		this.countTask = 0;
		this.countChecked = this.tasks.filter(e => e.checked).length;
		this.domElem = this.createDomElem();

		this.initEvent();
		this.initTasksList();
	}
createDomElem(){
	const source = document.getElementById("list-template").innerHTML,
		templateList = Handlebars.compile(source),
	{ name, id, created, updated, countTask, countChecked } = this,
	 html = templateList({ name, id, created, updated, countTask, countChecked }),
	elem = this.createElement("li", `l${id}`, "listToDo", html);

const ListDom = {
	box : elem,
	nameInp : elem.querySelector(".listToDo__name"),
	newTaskInp : elem.querySelector(".listToDo__newTask"),
	addBtn : elem.querySelector(".listToDo__add"),
	delBtn : elem.querySelector(".listToDo__del"),
	listNode : elem.querySelector(".listToDo__container"),
	countAll : elem.querySelector(".listToDo__allCount"),
	countChecked : elem.querySelector(".listToDo__chekedCount"),
	created : elem.querySelector(".listToDo_created"),
	updated : elem.querySelector(".listToDo_updated")
};
	return ListDom;
}
	initTasksList() {
		if(!this.tasks.length)return;
		this.tasks.forEach((e) => {
			this.createTask(e.id, e.name, this, e.priority, e.checked);
		});
	}
	updateLocalStorage(props) {
		this.parent.updateLocalStorage(props);
	}
	_getFormatDate(d = Date.now()) {
		const options = { year: "numeric", day: "numeric", month: "numeric", hour: "numeric", minute: "numeric", };
		return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
	}
	updateDate() {
		const currentTime = this._getFormatDate();
		this.domElem.updated.innerHTML = currentTime;
		this.updateLocalStorage({ updated: currentTime, id: this.id, tasks: this.tasks });
		return currentTime;
	}

	updateCheckedTask() {
		const array = [...this.domElem.listNode.children].filter((elem) => {
			return elem.classList.contains("checked");
		});		
		this.countChecked = array.length;
		this.domElem.countChecked.innerHTML = this.countChecked;
	}
	sortList() {
		[...this.domElem.listNode.children].sort((a, b) => {
			const AA = a.classList.contains("checked") ? 1 : 0,
				BB = b.classList.contains("checked") ? 1 : 0,
				AT = a.querySelector(".task_priority").value,
				BT = b.querySelector(".task_priority").value;
			if (AA < BB) {
				return -1;
			} else if (!AA && !BB && AT > BT){
				return -1;
			}else if(AA == BB){
				return 0;
			}
		}).forEach((e) => this.domElem.listNode.appendChild(e));
		this.updateCheckedTask();
	}
	removeList(elem) {
		this.parent.removeChild(this.id);
	}
	removeTask(id) {
		this.domElem.listNode.querySelector(`#${id}`).remove();
		this.tasks = this.tasks.filter((e)=>e.id != id);
		this.updateDate();
	}
	addTask() {
		if (this.domElem.newTaskInp.value.length != 0) {
			this.createTask(`l${this.id}-${this.countTask}`, this.domElem.newTaskInp.value);
		}
	}
	createTask(id, name,parent=this, priority = 1, checked = false) {
		const task = new Task(id, name, parent, priority, checked);		
		this.countTask++;
		this.domElem.countAll.innerHTML = this.countTask;
		this.domElem.newTaskInp.value = "";
		this.updateList(task);
		this.sortList();
		this.updateDate();
	}

	updateList(task, sort){
		const obj = {
			id: task.id,
			checked: task.checked,
			priority: task.priority,
			name: task.name
		};
		if (!this.tasks.find(e => e.id == obj.id)) this.tasks.push(obj);
		this.tasks = 	this.tasks.map(e=>{ return e.id == obj.id ? obj: e; });		
		if(sort)  this.sortList();
		this.updateDate();

	}

	updateName() {
		this.parent.updateListName(this.id, this.domElem.nameInp.value);
	}
		// ===================================================
	initEvent() {

		this.domElem.addBtn.addEventListener(
			"click",
			() => {
				this.addTask();
			},
			false
		);

		this.domElem.nameInp.addEventListener(
			"blur",
			() => {
				this.updateName();
			},
			false
		);

		this.domElem.delBtn.addEventListener(
			"click",
			() => {
				this.removeList();
			},
			false
		);

		this.domElem.newTaskInp.addEventListener(
			"keydown",
			(e) => {
				if (e.keyCode === 13) {
					this.addTask();
				}
			},
			false
		);
	
	}
}
