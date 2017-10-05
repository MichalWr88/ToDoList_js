let add = document.querySelector('.AddList__addBtn'),
	body = document.querySelector("body"),
	indexList = 1;
class ToDoList {
	constructor(name) {
		this.index = indexList;
		this.elem = document.createElement("div");
		this.header = document.createElement("header");
		this.nav = document.createElement("nav");
		this.hbtn = document.createElement("button");
		this.name = document.createElement("h2");
		this.menu = document.createElement("ul");
		this.submenu = [];
		this.inputTask = document.createElement("input");
		this.remoe
		this.name.textContent = name;
		this.nbtn = document.createElement("button");

	this.elem.classList.add('toDoList');
	this.header.classList.add('toDoList__header');
	this.nav.classList.add('toDoList__nav');
	this.name.classList.add('toDoList__name');
	this.hbtn.classList.add('header__btn-menu');
	this.menu.classList.add('nav__menu');
	this.inputTask.classList.add('toDoList__newTask');
	this.inputTask.setAttribute("placeholder", "add your task");
	this.nbtn.classList.add("header__btn-add");

	this.nav.appendChild(this.hbtn);
	this.nav.appendChild(this.menu);
	this.header.appendChild(this.nav);
	this.header.appendChild(this.name);
	this.header.appendChild(this.inputTask);
	this.header.appendChild(this.nbtn);
	this.elem.appendChild(this.header);

	this.Task = {
		
	}
	this.nbtn.addEventListener("click", ()=>{


	}, false)
	}
	
	addTask = function(){

	};
	// methods
}

class listTask {
	constructor() {
		this.elem = document.createElement("ul");

		this.elem.classList.add('toDoList__container');
	}


	// methods
	
}



add.addEventListener("click", function(e){
	let input = document.getElementById("taskInput");
	let listNew = new ToDoList(input.value);
	let tasknew = new listTask;
	// listNew.elem.appendChild(tasknew.elem);
	// console.log(listNew);
	body.appendChild(listNew.elem);
	indexList++;
}, false);
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





