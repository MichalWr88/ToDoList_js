export class Task {
	constructor(id, name, parent, priority, checked) {
		this.id = id;
		this.parent = parent;
		this.name = name;
		this.priority = priority != undefined ? priority: 1;
		this.checked = checked;
		this.lik = this.createDomElem();
		this.onInit();
	}
	onInit() {
		this.parent.domElem.listNode.appendChild(this.lik.box);
		this.initEvents();
	}

	createDomElem() {
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
		this.checkedElem(likNode, this.checked);
		likNode.priority.value = this.priority;
		return likNode;
	}
	initEvents() {
		this.lik.checkedBtn.addEventListener(
			"click",
			() => {
				this.checkedElem(this.lik, !this.checked);
				this.updateTask(true);
			},
			false
		);
		this.lik.name.addEventListener("blur", (e) => {
			this.name = e.target.innerHTML;
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
	checkedElem(likNode, status) {
		const { box, name, checkedBtn, priority} = likNode;		
		if (status) {
			this.checked = true;
			name.setAttribute("tabindex", "-1");
			priority.setAttribute("tabindex", "-1");
			checkedBtn.querySelector("i").classList.add("ion-checkmark-round");
			box.classList.add("checked");
		} else {
			this.checked = false;
			name.removeAttribute("tabindex");
			priority.removeAttribute("tabindex");
			checkedBtn.querySelector("i").classList.remove("ion-checkmark-round");
			box.classList.remove("checked");
		}
	}
	updateTask(sort) {
		this.parent.updateList(this,sort);
	}
}
