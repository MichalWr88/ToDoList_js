export class Task {
	constructor(id, name, parent, priority, checked) {
		this.id = id;
		this.parent = parent;
		this.name = name;
		this.priority = priority != undefined ? priority: 1;
		this.checked = checked || false;
		this.lik = this.createLik();
		this.onInit();
	}
	onInit() {
		this.parent.listNode.appendChild(this.lik.box);
		this.initEvents();
	}

	createLik() {
		const templateTask = document.getElementById("task-template").innerHTML,
			likHtml = Handlebars.compile(templateTask),
			html = likHtml({ id: this.id, taskName: this.name }),
			lik = document.createElement("li");
		lik.className = "listToDo__task";
		lik.setAttribute("id", this.id);
		lik.innerHTML = html;
		const likNode = {
			box: lik,
			name: lik.querySelector(".task__name"),
			checkedBtn: lik.querySelector(".task__btn-check"),
			priority: lik.querySelector(".task_priority"),
			delBtn: lik.querySelector(".task__btn-dell"),
		};
		console.log(this.priority);
		
		likNode.priority.value = this.priority;
		return likNode;
	}
	initEvents() {
		this.lik.checkedBtn.addEventListener(
			"click",
			() => {
				this.checkedElem(this.lik);
				this.updateTask(true);
			},
			false
		);
		this.lik.name.addEventListener("blur", (e) => {
			this.name = e.target.value;
			this.updateTask(false);
		}, false);

		this.lik.delBtn.addEventListener(
			"click",
			(e) => {
				this.parent.removeTask(this.id);
			},
			false
		);
		this.lik.priority.addEventListener(
			"change",
			(e) => {
				this.priority = e.target.value;
				this.updateTask(true);
			},
			false
		);
	}
	checkedElem(likNode) {
		const { box, name, checkedBtn, priority} = likNode;
		checkedBtn.querySelector("i").classList.toggle("ion-checkmark-round");
		box.classList.toggle("checked");
		if (box.classList.contains("checked")) {
			this.checked = true;
			name.setAttribute("tabindex", "-1");
			priority.setAttribute("tabindex", "-1");
		} else {
			this.checked = false;
			name.removeAttribute("tabindex");
			priority.removeAttribute("tabindex");
		}
	}
	updateTask(sort) {
		const obj = {
			id: this.id,
			checked :this.checked,
			priority : this.priority,
			name : this.name
		}
		this.parent.updateList(obj,sort);
	}
}
