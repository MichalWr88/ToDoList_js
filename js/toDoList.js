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
		this.LsObj = this.initLocalStorage();
		// -----------------------------------
		// this.list = [];
		this.countTask = 0;
		this.checked = 0;
		this.created.innerHTML = created || this._getFormatDate();
		this.updated.innerHTML = updated || "";
		//------------------
		// this.initList();
		this.initLocalStorage();
		this.initEvent();
	}

	// initList() {
	//   this.countAll.innerHTML = this.countTask;
	// }
	initLocalStorage() {
		const local = JSON.parse(localStorage.getItem("app")),
			current = local.find((e) => e.id == this.id);
		return current;
	}

	updateLocalStorage(props) {
		this.parent.updateLocalStorage(props);
	}
	_getFormatDate(d) {
		const options = {
			year: "numeric",
			day: "numeric",
			month: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		if (d) {
			return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
		} else {
			return new Date().toLocaleDateString("pl-PL", options).replace(",", "");
		}
	}
	updateDate() {
		const currentTime = this._getFormatDate(new Date());
		this.updated.innerHTML = currentTime;
		this.updateLocalStorage({ updated: currentTime, id: this.id });
		// this.parent.updateLocalStorage(this.id, currentTime, "updated");
		return currentTime;
	}
updateTasks(props){
	const {id,name,checked, priority} = props;
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
		// localStorage.setItem(this.id, JSON.stringify(this.list));

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

	createLik() {
		//     localStorage.setItem(this.id, JSON.stringify(this.list));
		//     this.countTask = this.list.length;
		//     this.countAll.innerHTML = this.countTask;
		//   },
		//   false
		// );
		// --------------------------------------------------------------
		// this.list.push(Task.data);
		//   localStorage.setItem(this.id, JSON.stringify(this.list));
		// } else {
		//   data.checked = false;
		//   this.list.map(elem => {
		//     if (elem.text === data.text) {
		//       elem.checked = false;
		//     }
		//   });
		// this.list.push(Task.data);
		// localStorage.setItem(this.id, JSON.stringify(this.list));
		// this.updateCheckedTask();
	}

	initTask(name) {
		// this.list.push(Task.data);
		// var storedNames = JSON.parse(localStorage.getItem(this.id));
		localStorage.setItem(this.id, JSON.stringify(this.list));
	}
	addTask() {
		if (this.newTaskInp.value.length != 0) {
			const task = new Task(`l${this.id}-${this.countTask}`, this.newTaskInp.value, this);
			this.updateDate();
			this.countTask++;
			this.countAll.innerHTML = this.countTask;
			this.newTaskInp.value = "";
			this.sortList();

		}
	}
	updateName() {
		this.parent.updateListName(this.id, this.nameInp.value);
	}
	initEvent() {
		// ===================================================
		this.addBtn.addEventListener(
			"click",
			() => {
				this.addTask();
			},
			false
		);
		// ===================================================
		this.nameInp.addEventListener(
			"blur",
			() => {
				this.updateName();
			},
			false
		);
		// ===================================================
		this.delBtn.addEventListener(
			"click",
			() => {
				this.removeList();
			},
			false
		);
		// ===================================================
		this.newTaskInp.addEventListener(
			"keydown",
			(e) => {
				if (e.keyCode === 13) {
					this.addTask();
				}
			},
			false
		);
		// ===================================================
	}
}
