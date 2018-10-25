export class Task {
	constructor(id, name, parent, priority, checked) {
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

		this.parent.listNode.appendChild(this.lik.box);
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
		const likNode = {
			box:lik,
			name: lik.querySelector(".task__name"),
			checkedBtn: lik.querySelector(".task__btn-check"),
			priority: lik.querySelector(".task_priority"),
			delBtn: lik.querySelector(".task__btn-dell"),
		};
		return likNode;
	}
	initEvents() {
		this.lik.checkedBtn.addEventListener(
			"click",
			() => {
				this.checkedElem();
				this.parent.updateCheckedTask();
				this.nameInp.classList.toggle("blured");
			},
			false
		);
		this.lik.name.addEventListener("blur", () => {}, false);
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
				console.log(this.parent.list);
				this.parent.list.forEach((e) => {
					if (e.id == this.id) {
						e.checked = this.checked;
						e.priority = this.priority;
						e.name = this.name;
					}
				});
				this.parent.sortList();
			},
			false
		);
	}
	checkedElem() {
		const nameInp = this.lik.this.lik
			.querySelector(".task__btn-check")
			.querySelector("i")
			.classList.toggle("ion-checkmark-round");
		this.lik.classList.toggle("checked");
		if (this.lik.classList.contains("checked")) {
			this.checked = true;
			this.nameInp.setAttribute("tabindex", "-1");
			this.priority.setAttribute("tabindex", "-1");
		} else {
			this.checked = false;
			this.nameInp.removeAttribute("tabindex");
			this.priority.removeAttribute("tabindex");
		}
		this.updateDate();
	}
	updateDate() {
		this.parent.updateDate();
	}
}
