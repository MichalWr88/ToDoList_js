export class Task {
	constructor(id, name, parent, priority,checked) {
		this.id = id;
		this.parent = parent;
		this.name = name;
		this.priority = priority;
		this.checked = checked;
		this.lik = this.createLik();
		this.onInit();
	}
	onInit() {
		console.log(this);
		
		this.parent.listNode.appendChild(this.lik);
		this.initEvents();
	}

	createLik() {
		const templateTask = document.getElementById("task-template").innerHTML,
			likHtml = Handlebars.compile(templateTask),
			html = likHtml({
				id: this.id,
				taskName: this.name,
			}),
			lik = document.createElement("li");
		lik.className = "listToDo__task";
		lik.setAttribute("id", this.id);
		lik.innerHTML = html;
		lik.querySelector(".task_priority").value = 1;
		return lik;
	}
	initEvents() {
		this.lik.querySelector(".task__btn-check").addEventListener(
			"click",
			() => {
				this.checkedElem();
				this.parent.updateCheckedTask();
				this.nameInp.classList.toggle("blured");
			},
			false
		);
		this.lik.querySelector(".task__name").addEventListener("blur", () => {}, false);
		this.lik.querySelector(".task__btn-dell").addEventListener(
			"click",
			(e) => {
				this.parent.removeTask(this.id);
			},
			false
		);
		this.lik.querySelector(".task_priority").addEventListener(
			"change",
			(e) => {
				this.parent.sortList();
			},
			false
		);
	}
	checkedElem() {
		this.lik
			.querySelector(".task__btn-check")
			.querySelector("i")
			.classList.toggle("ion-checkmark-round");
		this.lik.classList.toggle("checked");
		if (this.lik.classList.contains("checked")) {
			this.nameInp.setAttribute("tabindex", "-1");
			this.priority.setAttribute("tabindex", "-1");
		} else {
			this.nameInp.removeAttribute("tabindex");
			this.priority.removeAttribute("tabindex");
		}
		this.updateDate();
	}
	updateDate() {
		this.parent.updateDate();
	}
}
