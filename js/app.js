import { Task } from './task';



let add = document.querySelector('.AddList__addBtn'),
    body = document.querySelector("body"),
    indexList = 1;

class ToDoList {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.list = [];
        this.countTask = null;
        this.checked = null;
        //------------------
        this.initList();
        this.initLocalStorage();
        this.initEvent();
        // if(this.prop.list === null){
        // 	this.propery.list = localStorage.setItem(this.id,[]);
        // 	localStorage.setItem(this.id, JSON.stringify(this.prop.list));
        // };
        // this.taskcount = this.prop.list.length;
        // localStorage.getItem(this.id, JSON.stringify(this.prop.list));

    }

    initList() {
        let box = this.box,
        	nameInp = this.nameInp,
        	newTaskInp = this.newTaskInp,
        	addBtn = this.addBtn,
        	listNode = this.listNode;
        	//---------------------------
        	box = document.getElementById(this.id);
        	console.log(box);
        	nameInp = box.getElementsByClassName('toDoList__name')[0];
        	newTaskInp = box.querySelector('.toDoList__newTask');
        	addBtn = box.querySelector('.toDoList__add');
        	listNode = box.querySelector('.toDoList__container');
        	this.name = nameInp.value;
    };
    initLocalStorage() {
        const local = JSON.parse(localStorage.getItem(this.id))
        if (local === null) {
            this.list = []
            console.log(this);
        } else {
            this.prop.list = JSON.parse(localStorage.getItem(this.id));
            console.log(this.prop.list);

            this.prop.list.forEach((elem, index) => {
                this.initTask(elem.text);
            });
        }

    }



    createLik(name){
let date = new Date(),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        // ----------------------------------------------------------
        let lik = document.createElement('li');
        lik.className = 'toDoList__task';
        // --------------------------------------------------------------
        let checkBtn = document.createElement('button');
        checkBtn.className = 'ion-checkmark-round btn task__check';
        checkBtn.addEventListener('click', (e) => {
            if (Task.checked === false) {
                Task.chekced = true;
            }
        }, false);
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
        // 
        let nameInp = document.createElement('h3');
        nameInp.className = 'task__name';
        nameInp.setAttribute("contenteditable", "true");

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
        }, false);
        // ---------------------------------------------------------------------------
        let Count = this.prop.list.length + 1;
        // create object with task prop
        let Task = {
            id: Count,
            text: name,
            checked: false,
            priority: 0,
            date: `${day}.${month+1}.${year}`
        };
        labelP.append(priority);
        nameInp.textContent = name;
        lik.append(checkBtn);
        lik.append(nameInp);
        lik.append(delBtn);
        lik.append(labelP);
        lik.append(dateTask);
        return {Task,lik}
    }
    initTask(name) {
        createLik(name);
        this.prop.list.push(Task);
        localStorage.setItem(this.id, JSON.stringify(this.prop.list));

        // var storedNames = JSON.parse(localStorage.getItem(this.id));

        // ------------------------------------------------------------------

        this.listNode.appendChild(lik);
        this.newTask.value = '';
    }





    initEvent() {
    	// change input name List
        this.name.addEventListener('change', (e) => {
            this.prop.name = e.target.value;
        }, false);
        // add Task
        this.addBtn.addEventListener("click", () => {
            // this.initTask(this.newTask.value);
        }, false);
        // ===================================================
        // this.listNode.addEventListener("click", (e) => {

        // }, false);
    }
}

let list1 = new ToDoList('list1');



// class ToDoList {
// 	constructor(name) {
// 		this.index = indexList;
// 		this.elem = document.createElement("div");
// 		this.header = document.createElement("header");
// 		this.nav = document.createElement("nav");
// 		this.hbtn = document.createElement("button");
// 		this.name = document.createElement("h2");
// 		this.menu = document.createElement("ul");
// 		this.submenu = [];
// 		this.inputTask = document.createElement("input");
// 		this.remoe
// 		this.name.textContent = name;
// 		this.nbtn = document.createElement("button");

// 	this.elem.classList.add('toDoList');
// 	this.header.classList.add('toDoList__header');
// 	this.nav.classList.add('toDoList__nav');
// 	this.name.classList.add('toDoList__name');
// 	this.hbtn.classList.add('header__btn-menu');
// 	this.menu.classList.add('nav__menu');
// 	this.inputTask.classList.add('toDoList__newTask');
// 	this.inputTask.setAttribute("placeholder", "add your task");
// 	this.nbtn.classList.add("header__btn-add");

// 	this.nav.appendChild(this.hbtn);
// 	this.nav.appendChild(this.menu);
// 	this.header.appendChild(this.nav);
// 	this.header.appendChild(this.name);
// 	this.header.appendChild(this.inputTask);
// 	this.header.appendChild(this.nbtn);
// 	this.elem.appendChild(this.header);


// 	this.nbtn.addEventListener("click", ()=>{


// 	}, false)
// 	}


// }

// class listTask {
// 	constructor() {
// 		this.elem = document.createElement("ul");

// 		this.elem.classList.add('toDoList__container');
// 	}


// 	// methods

// }



// add.addEventListener("click", function(e){
// 	let input = document.getElementById("taskInput");
// 	let listNew = new ToDoList(input.value);
// 	let tasknew = new listTask;
// 	// listNew.elem.appendChild(tasknew.elem);
// 	// console.log(listNew);
// 	body.appendChild(listNew.elem);
// 	indexList++;
// }, false);
// /**
//  * Created by Jacek on 2015-12-16.
//  */

//  var todo = document.getElementById("taskList"),
//  	input = document.getElementById("taskInput"),
//  	add = document.getElementById("addTaskButton"),
//  	removeAll = document.getElementById("removeFinishedTasksButton");

// /*------------    FUNKCJE    ------------*/
// function createDell(parent){
// 	var btn = document.createElement("button");
// 		btn.textContent = "X";
// 		btn.classList.add("delete");

// 	btn.addEventListener("click", function(){
// 		parent.parentNode.removeChild(parent);
// 	}, false)

// 	return btn
// };

// function createComplete(parent){
// 	var btn = document.createElement("button");
// 		btn.textContent = "Complete";

// 	btn.addEventListener("click", function(){
// 		parent.firstElementChild.classList.toggle("complete")
// 	}, false)

// 	return btn
// };

// function removeComplete(elem){
// 	console.log(elem);
// 	elem.forEach( function(element) {
// 		var father = element.parentNode;
// 		father.parentNode.removeChild(father);


// 	});

// };

// function checkValue(elem){
// 	if(elem.value.length<5 || elem.value.length >100){
// 		var info = "Zadanie powinno miec od 5 do 100 znaków";
// 		return false
// 	} else{
// 		return true
// 	}


// };


// /*------------    EVENTY    ------------*/

// add.addEventListener("click", function(){
// if(	checkValue(input)){
// var lik = document.createElement("li");
// 	task = document.createElement("h1");
// 	task.textContent = input.value;
// 	task.setAttribute("contenteditable", true);
// 	btnDell = createDell(lik);
// 	btnComplete = createComplete(lik);
// 	lik.appendChild(task);
// 	lik.appendChild(btnDell);
// 	lik.appendChild(btnComplete);
// 	todo.appendChild(lik);
// 	input.value ="";

// }
// }, false)


// removeAll.addEventListener("click",function(){
// 	removeComplete(document.querySelectorAll(".complete"));
// }, false);