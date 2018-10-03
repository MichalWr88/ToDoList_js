import { Task } from './task';
export class ToDoList {
  constructor(id, parent) {
    this.parent = parent;
    this.box = document.getElementById(`l${id}`);
    this.nameInp = this.box.querySelector('.listToDo__name');
    this.newTaskInp = this.box.querySelector('.listToDo__newTask');
    this.addBtn = this.box.querySelector('.listToDo__add');
    this.delBtn = this.box.querySelector('.listToDo__del');
    this.listNode = this.box.querySelector('.listToDo__container');
    this.countAll = this.box.querySelector('.listToDo__allCount');
    this.countChecked = this.box.querySelector('.listToDo__chekedCount');
    this.created = this.box.querySelector('.listToDo_created');
    this.updated = this.box.querySelector('.listToDo_updated');
    // -----------------------------------
    this.id = id;
    this.list = [];
    this.countTask = 0;
    this.checked = 0;
    this.created.innerHTML = this._getFormatDate();
    // this.name = this.nameInp.value;

    //------------------
    this.initList();
    // this.initLocalStorage();
    this.initEvent();
  }

  initList() {
    this.countAll.innerHTML = this.countTask;
  }
  initLocalStorage() {
    const local = JSON.parse(localStorage.getItem(this.id));
    if (local === null) {
      localStorage.setItem(this.id, JSON.stringify(this.list));
    } else {
      this.list = JSON.parse(localStorage.getItem(this.id));
      console.log(this.list);
      this.countTask = this.list.length;
      this.countAll.innerHTML = this.countTask;
      this.list.forEach((elem, index) => {
        const Task = this.createLik(elem.text, elem.date, elem.checked);
        this.listNode.appendChild(Task.lik);
      });
    }
  }
  _getFormatDate(d) {
    const options = {
      year: "numeric",
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    if (d) {
      return new Date(d).toLocaleDateString("pl-PL", options).replace(',', '');
    } else {
      return new Date().toLocaleDateString("pl-PL", options).replace(',', '');
    }
  }
  _updateDate() {
    const currentTime = new Date();
    this.updated.innerHTML = this._getFormatDate(currentTime);
    return this._getFormatDate(currentTime);
  }
  updateCheckedTask() {
    const array = [...this.listNode.children].filter(elem => {
      return elem.classList.contains('checked');
    });
    this.checked = array.length;
    this.countChecked.textContent = this.checked;
    this.sortList();
  }
  sortList() {
    const sortArr = [...this.listNode.children].sort((a, b) => {
      const AA = a.classList.contains('checked') ? 1 : 0,
        BB = b.classList.contains('checked') ? 1 : 0;
      return AA - BB;
    });
    // localStorage.setItem(this.id, JSON.stringify(this.list));
    console.log(sortArr);
    sortArr.forEach(e => {
      this.listNode.appendChild(e);
    });
  }
  removeElement(elem) {
    this.parent.removeChild(this.id);
  }
  createLik(name, dat, check) {
    let delBtn = document.createElement('button');
    delBtn.className = 'ion-close-round btn task__delete';
    delBtn.addEventListener(
      'click',
      e => {
        // e.target.parentNode.remove(e.target.parentNode);
        // this.list = this.list.filter(function(elem) {
        // 	if (elem.text !== name) {
        // 		return elem;
        // 	}
        // });
        localStorage.setItem(this.id, JSON.stringify(this.list));
        this.countTask = this.list.length;
        this.countAll.innerHTML = this.countTask;
      },
      false
    );
    // --------------------------------------------------------------
    let checkBtn = document.createElement('button');
    checkBtn.className = 'ion-checkmark-round btn task__check';
    checkBtn.addEventListener(
      'click',
      () => {
        labelP.classList.toggle('blured');
        nameInp.classList.toggle('checked');
        nameInp.setAttribute('disabled', true);
        if (data.checked === false) {
          data.checked = true;
          this.list.map(elem => {
            if (elem.text === data.text) {
              elem.checked = true;
            }
          });
          // this.list.push(Task.data);
          localStorage.setItem(this.id, JSON.stringify(this.list));
        } else {
          data.checked = false;
          this.list.map(elem => {
            if (elem.text === data.text) {
              elem.checked = false;
            }
          });
          // this.list.push(Task.data);
          localStorage.setItem(this.id, JSON.stringify(this.list));
        }
        this.updateCheckedTask();
        this.sortList();
      },
      false
    );
    // ---------------------------------------------------------------------------
    //
    let count = this.list.length + 1;
    // create object with task prop
    // let data = {
    // 	id: count,
    // 	text: name,
    // 	checked: '',
    // 	priority: 0,
    // 	date: `${day}.${month}.${year}`
    // };
    // if (check === undefined) {
    //   data.checked = false;
    // } else {
    //   data.checked = check;
    // }
    labelP.append(priority);
    lik.append(checkBtn);
    lik.append(nameInp);
    lik.append(delBtn);
    lik.append(labelP);
    lik.append(dateTask);
    console.log(data.checked);
    if (data.checked === true) {
      labelP.classList.toggle('blured');
      nameInp.classList.toggle('checked');
      nameInp.setAttribute('disabled', true);
    }
    this.updateCheckedTask();
    return { lik, data };
  }

  initTask(name) {
    createLik(name);
    // this.list.push(Task.data);
    localStorage.setItem(this.id, JSON.stringify(this.list));

    // var storedNames = JSON.parse(localStorage.getItem(this.id));

    // ------------------------------------------------------------------
  }

  initEvent() {
    // change input name List
    this.nameInp.addEventListener(
      'blur',
      e => {
        this.name = e.target.value.trim();
      },
      false
    );

    // add Task
    this.addBtn.addEventListener(
      'click',
      () => {
				console.log(this.newTaskInp.value.length);
				if (this.newTaskInp.value.length != 0) {
					const task = new Task(this.countTask, this.newTaskInp.value, this);

					// const Task = this.createLik(this.newTaskInp.value.trim());
					// this.list.push(Task.data);
					this._updateDate();
					this.countTask++;
					this.countAll.innerHTML = this.countTask;
					localStorage.setItem(this.id, JSON.stringify(this.list));
					this.newTaskInp.value = "";
				}
      },
      false
    );
    this.delBtn.addEventListener(
      'click',
      () => {
        this.removeElement();
      },
      false
    );
    // ===================================================
    this.newTaskInp.addEventListener(
      'keydown',
      e => {
        if (e.keyCode === 13) {
          const Task = this.createLik(this.newTaskInp.value.trim());
          this.listNode.appendChild(Task.lik);
          this.list.push(Task.data);
          this.countTask++;
          this.countAll.innerHTML = this.countTask;
          localStorage.setItem(this.id, JSON.stringify(this.list));
          this.newTaskInp.value = '';
        }
      },
      false
    );
    // ===================================================
  }
}