/*jshint esversion: 6 */
import * as _glob from './global';
const addListBtn = _glob.cElem('.btn', true);
// console.log(addListBtn);

let add = document.querySelector('.addList__addBtn'),
  body = document.querySelector('body'),
  indexList = 1;
console.log(add);

class Header {
  constructor(id) {
    this.box = document.getElementById(id);
    this.boardsBtn = _glob.cElem('#boardsBtn');
    this.boardsList = _glob.cElem('#boardsList');
    this.newToDoListName = _glob.cElem('#listName');
    this.addNewListBtn = _glob.cElem('#addNewList');
    this.clearListName = _glob.cElem('#clearListName');
    this.initEvents();
  }
  initEvents() {
    this.boardsBtn.addEventListener(
      'click',
      (e) => {
        this.boardsList.classList.toggle('h-0');
      },
      false
    );
    this.newToDoListName.addEventListener('input',() => {
      this.newToDoListName.value.length ? clearListName.classList.remove('d_none') : clearListName.classList.add('d_none')
      console.log(this.newToDoListName.value);
    }, false);
    this.addNewListBtn.addEventListener('click',() => {}, false);
    this.clearListName.addEventListener('click',() => {
      this.newToDoListName.value ='';
      this.clearListName.classList.add('d_none');
    }, false);
  }
}

const header = new Header('header');
console.log(header);

class ToDoList {
  constructor(id) {
    this.box = document.getElementById(id);
    this.nameInp = this.box.getElementsByClassName('listToDo__name')[0];
    this.newTaskInp = this.box.querySelector('.toDoList__newTask');
    this.addBtn = this.box.querySelector('.toDoList__add');
    this.listNode = this.box.querySelector('.toDoList__container');
    this.countAll = this.box.querySelector('.toDoList__allCount');
    this.countChecked = this.box.querySelector('.toDoList__chekedCount');
    // -----------------------------------
    this.id = id;
    this.list = [];
    this.countTask = 0;
    this.checked = null;
    // this.name = this.nameInp.value;

    //------------------
    this.initList();
    // this.initLocalStorage();
    // this.initEvent();
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
  updateCheckedTask() {
    const count = 0;
    const array = this.list.filter(elem => {
      return elem.checked === true;
    });
    this.checked = array.length;
    this.countChecked.textContent = this.checked;
  }
  sortList() {
    this.list.sort((a, b) => {
      let AA = a.checked === true ? 1 : 0;
      console.log(AA);
      let BB = b.checked === true ? 1 : 0;
      // console.log(BB);

      return AA - BB;
    });
    localStorage.setItem(this.id, JSON.stringify(this.list));
  }

  createLik(name, dat, check) {
    let date = '',
      day = '',
      month = '',
      year = '';
    if (!dat) {
      (date = new Date()),
        (day = date.getDate()),
        (month = date.getMonth() + 1),
        (year = date.getFullYear());
      console.log(date);
    } else {
      const txt = dat.split('.');
      console.log(txt);
      (day = txt[0]), (month = txt[1]), (year = txt[2]);
    }

    // ----------------------------------------------------------
    const lik = document.createElement('li');
    lik.className = 'toDoList__task';

    // ---------------------------------------------------------------
    let priority = document.createElement('select');
    priority.className = 'task_priority';
    for (let i = 0; i <= 5; i++) {
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      priority.appendChild(opt);
    }

    // -----------------------------------------------------------------

    let nameInp = document.createElement('h3');
    nameInp.className = 'task__name';
    nameInp.setAttribute('contenteditable', 'true');
    nameInp.textContent = name;
    // -------------------------------------------------------------------
    let labelP = document.createElement('label');
    labelP.className = 'task__label';
    labelP.textContent = 'priority';
    console.log(day);
    let dateTask = document.createElement('p');
    dateTask.className = 'task__date';
    dateTask.textContent = `create: ${day}.${month}.${year}`;

    let delBtn = document.createElement('button');
    delBtn.className = 'ion-close-round btn task__delete';
    delBtn.addEventListener(
      'click',
      e => {
        e.target.parentNode.remove(e.target.parentNode);
        this.list = this.list.filter(function(elem) {
          if (elem.text !== name) {
            return elem;
          }
        });
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
    let data = {
      id: count,
      text: name,
      checked: '',
      priority: 0,
      date: `${day}.${month}.${year}`
    };
    if (check === undefined) {
      data.checked = false;
    } else {
      data.checked = check;
    }
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
    this.list.push(Task.data);
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
        const Task = this.createLik(this.newTaskInp.value.trim());
        this.listNode.appendChild(Task.lik);
        this.list.push(Task.data);
        this.countTask++;
        this.countAll.innerHTML = this.countTask;
        localStorage.setItem(this.id, JSON.stringify(this.list));
        this.newTaskInp.value = '';
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

// let list1 = new ToDoList('list1');
