import { Task } from "./task";
export class ToDoList {
	constructor(id, parent, created, updated) {
		this.id = id;
		this.parent = parent;
		this.box = document.getElementById(`l${id}`);
		this.nameInp = this.box.querySelector(".listToDo__name");
		this.newTaskInp = this.box.querySelector(".listToDo__newTask");
		this.addBtn = this.box.querySelector(".listToDo__add");
		this.delBtn = this.box.querySelector(".listToDo__del");
		this.listNode = this.box.querySelector(".listToDo__container");
		this.countAll = this.box.querySelector(".listToDo__allCount");
		this.countChecked = this.box.querySelector(".listToDo__chekedCount");
		this.created = this.box.querySelector(".listToDo_created");
		this.updated = this.box.querySelector(".listToDo_updated");
		this.list = [];
		this.countTask = 0;
		this.checked = 0;
		this.LsObj = this.initLocalStorage();
		// -----------------------------------
		this.created.innerHTML = created || this._getFormatDate();
		this.updated.innerHTML = updated || "";
		//------------------
		this.initEvent();
	}

	initLocalStorage() {
		const local = JSON.parse(localStorage.getItem("app")),
			current = local.find((e) => e.id == this.id);
		if (current && current.tasks.length) {
			current.tasks.forEach((e) => {
				this.createTask(e.id, e.name, this, e.priority, e.checked);
			});
		}
		return current;
	}

	updateLocalStorage(props) {
		this.parent.updateLocalStorage(props);
	}
	_getFormatDate(d = Date.now()) {
		const options = { year: "numeric", day: "numeric", month: "numeric", hour: "numeric", minute: "numeric", };
		return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
	}
	updateDate(obj, sort) {
		const currentTime = this._getFormatDate();
		this.updated.innerHTML = currentTime;
		this.updateLocalStorage({ updated: currentTime, id: this.id, tasks: this.list });
		if (sort) this.updateCheckedTask();
		return currentTime;
	}
	updateTasks(props) {
		const { id, name, checked, priority } = props;
	}

	updateCheckedTask() {
		const array = [...this.listNode.children].filter((elem) => {
			return elem.classList.contains("checked");
		});
		this.checked = array.length;
		this.countChecked.textContent = this.checked;
		this.sortList();
	}
	sortList() {
		console.log(this.list);
		const sortArr = [...this.listNode.children].sort((a, b) => {
			const AA = a.classList.contains("checked") ? 1 : 0,
				BB = b.classList.contains("checked") ? 1 : 0,
				AT = a.querySelector(".task_priority").value,
				BT = b.querySelector(".task_priority").value;
			if (AA > BB) {
				return 1;
			}
			if (AT < BT && AA < BB) {
				return 1;
			}
			if (AT < BT && AA == BB) {
				return 1;
			}
			if (AT == BT && AA > BB) {
				return -1;
			} else {
				return -1;
			}
		});
		sortArr.forEach((e) => {
			this.listNode.appendChild(e);
		});
	}
	removeList(elem) {
		this.parent.removeChild(this.id);
	}
	removeTask(elem) {
		this.listNode.querySelector(`#${elem}`).remove();
	}

	// initTask(name) {
	// 	localStorage.setItem(this.id, JSON.stringify(this.list));
	// }
	addTask() {
		if (this.newTaskInp.value.length != 0) {
			this.createTask(`l${this.id}-${this.countTask}`, this.newTaskInp.value);
		}
	}
	createTask(id, name,parent=this, priority = 1, checked = false) {
		const task = new Task(id, name, parent, priority, checked);		
		this.countTask++;
		this.countAll.innerHTML = this.countTask;
		this.newTaskInp.value = "";

		this.updateLocalSTask(task);
		this.sortList();
		this.updateDate();
	}
	updateLocalSTask(task) {
		console.log(task);
		
		const taskObj = {
			id: task.id,
			name: task.name,
			priority: task.priority,
			checked: task.checked,
		};
		this.list.push(taskObj);
		console.log(taskObj);
	}
	updateList(obj, sort){
		this.list = 	this.list.map(e=>{ return e.id == obj.id ? obj: e; });

		this.sortList();
		this.updateDate();

	}

	updateName() {
		this.parent.updateListName(this.id, this.nameInp.value);
	}
		// ===================================================
	initEvent() {

		this.addBtn.addEventListener(
			"click",
			() => {
				this.addTask();
			},
			false
		);

		this.nameInp.addEventListener(
			"blur",
			() => {
				this.updateName();
			},
			false
		);

		this.delBtn.addEventListener(
			"click",
			() => {
				this.removeList();
			},
			false
		);

		this.newTaskInp.addEventListener(
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
