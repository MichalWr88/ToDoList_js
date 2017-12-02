let add = document.querySelector('.AddList__addBtn'),
    body = document.querySelector("body"),
    indexList = 1;

class ToDoList {
    constructor(id) {
        this.box = document.getElementById(id);
        this.nameInp = this.box.getElementsByClassName('toDoList__name')[0];
        this.newTaskInp = this.box.querySelector('.toDoList__newTask');
        this.addBtn = this.box.querySelector('.toDoList__add');
        this.listNode = this.box.querySelector('.toDoList__container');
        this.countAll = this.box.querySelector('.toDoList__allCount');
        // -----------------------------------
        this.id = id;
        this.list = [];
        this.countTask = 0;
        this.checked = null;
        this.name = this.nameInp.value;
        //------------------
        this.initList()
        this.initLocalStorage();
        this.initEvent();
        // if(this.prop.list === null){
        //  this.propery.list = localStorage.setItem(this.id,[]);
        //  localStorage.setItem(this.id, JSON.stringify(this.prop.list));
        // };
        // this.taskcount = this.prop.list.length;
        // localStorage.getItem(this.id, JSON.stringify(this.prop.list));

    }

    initList() {
        this.countAll.innerHTML = this.countTask;

    };
    initLocalStorage() {
        const local = JSON.parse(localStorage.getItem(this.id));
        if (local === null) {
            localStorage.setItem(this.id, JSON.stringify(this.list))
        } else {
            this.list = JSON.parse(localStorage.getItem(this.id));
            console.log(this.list);
            this.countTask = this.list.length;
            this.countAll.innerHTML = this.countTask;
            this.list.forEach((elem, index) => {
                const Task = this.createLik(elem.text);
                this.listNode.appendChild(Task.lik);
            });
        }

    }



    createLik(name) {
        let date = new Date(),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();

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
        nameInp.setAttribute("contenteditable", "true");
        nameInp.textContent = name;
        // -------------------------------------------------------------------
        let labelP = document.createElement('label');
        labelP.className = 'task__label';
        labelP.textContent = 'priority';

        let dateTask = document.createElement('p');
        dateTask.className = 'task__date';
        dateTask.textContent = `create: ${day}.${month+1}.${year}`;

        let delBtn = document.createElement('button');
        delBtn.className = 'ion-close-round btn task__delete';
        delBtn.addEventListener('click', (e) => {
            e.target.parentNode.remove(e.target.parentNode);
            this.list = this.list.filter(function(elem) {
                if (elem.text !== name) {
                    return elem
                }
            });
            localStorage.setItem(this.id, JSON.stringify(this.list));
            this.countTask = this.list.length;
            this.countAll.innerHTML = this.countTask;

        }, false);
        // --------------------------------------------------------------
        let checkBtn = document.createElement('button');
        checkBtn.className = 'ion-checkmark-round btn task__check';
        checkBtn.addEventListener('click', () => {
            labelP.classList.toggle('blured');
            nameInp.classList.toggle('checked');
            nameInp.setAttribute('disabled', true);
            if (data.checked === false) {
                data.checked = true;
            } else {
                data.checked = false;
            }

        }, false);
        // ---------------------------------------------------------------------------
        // 
        let count = this.list.length + 1;
        // create object with task prop
        let data = {
            id: count,
            text: name,
            checked: false,
            priority: 0,
            date: `${day}.${month+1}.${year}`
        };
        labelP.append(priority);
        lik.append(checkBtn);
        lik.append(nameInp);
        lik.append(delBtn);
        lik.append(labelP);
        lik.append(dateTask);
        return { lik, data }
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
        this.nameInp.addEventListener('blur', (e) => {
            this.name = e.target.value;

        }, false);

        // add Task
        this.addBtn.addEventListener("click", () => {
            const Task = this.createLik(this.newTaskInp.value);
            this.listNode.appendChild(Task.lik);
            this.list.push(Task.data);
            this.countTask++;
            this.countAll.innerHTML = this.countTask;
            localStorage.setItem(this.id, JSON.stringify(this.list))
            this.newTaskInp.value = '';
        }, false);
        // ===================================================

    }
}

let list1 = new ToDoList('list1');