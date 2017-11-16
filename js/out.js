/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var add = document.querySelector('.AddList__addBtn'),
    body = document.querySelector("body"),
    indexList = 1;

var ToDoList = function () {
    function ToDoList(id) {
        _classCallCheck(this, ToDoList);

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

    _createClass(ToDoList, [{
        key: 'initList',
        value: function initList() {
            this.countAll.innerHTML = this.countTask;
        }
    }, {
        key: 'initLocalStorage',
        value: function initLocalStorage() {
            var local = JSON.parse(localStorage.getItem(this.id));
            if (local === null) {
                this.list = [];
                console.log(this);
            } else {
                this.prop.list = JSON.parse(localStorage.getItem(this.id));
                console.log(this.prop.list);

                this.prop.list.forEach(function (elem, index) {
                    console.log(elem);
                });
            }
        }
    }, {
        key: 'createLik',
        value: function createLik(name) {
            var date = new Date(),
                day = date.getDate(),
                month = date.getMonth(),
                year = date.getFullYear();

            // ----------------------------------------------------------
            var lik = document.createElement('li');
            lik.className = 'toDoList__task';
            // --------------------------------------------------------------
            var checkBtn = document.createElement('button');
            checkBtn.className = 'ion-checkmark-round btn task__check';
            checkBtn.addEventListener('click', function (e) {
                console.log(e.target.parentNode);
                e.target.parentNode.style = 'backgroundColor', 'red';
            }, false);
            // ---------------------------------------------------------------
            var priority = document.createElement('select');
            priority.className = 'task_priority';
            for (var i = 0; i <= 5; i++) {
                var opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                priority.appendChild(opt);
            }

            // -----------------------------------------------------------------

            var nameInp = document.createElement('h3');
            nameInp.className = 'task__name';
            nameInp.setAttribute("contenteditable", "true");
            nameInp.textContent = this.newTaskInp.value;
            this.newTaskInp.value = '';
            // -------------------------------------------------------------------
            var labelP = document.createElement('label');
            labelP.className = 'task__label';
            labelP.textContent = 'priority';

            var dateTask = document.createElement('p');
            dateTask.className = 'task__date';
            dateTask.textContent = 'create: ' + day + '.' + (month + 1) + '.' + year;

            var delBtn = document.createElement('button');
            delBtn.className = 'ion-close-round btn task__delete';
            delBtn.addEventListener('click', function (e) {
                e.target.parentNode.remove(e.target.parentNode);
            }, false);
            // ---------------------------------------------------------------------------
            /*  let count = this.list.length + 1;
              // create object with task prop
              let Task = {
                  id: count,
                  text: name,
                  checked: false,
                  priority: 0,
                  date: `${day}.${month+1}.${year}`
              };*/
            labelP.append(priority);
            lik.append(checkBtn);
            lik.append(nameInp);
            lik.append(delBtn);
            lik.append(labelP);
            lik.append(dateTask);
            return lik;
        }
    }, {
        key: 'initTask',
        value: function initTask(name) {
            createLik(name);
            this.prop.list.push(_task.Task);
            localStorage.setItem(this.id, JSON.stringify(this.prop.list));

            // var storedNames = JSON.parse(localStorage.getItem(this.id));

            // ------------------------------------------------------------------

            this.listNode.appendChild(lik);
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;

            // change input name List
            this.nameInp.addEventListener('blur', function (e) {
                _this.name = e.target.value;
                console.log(_this);
            }, false);

            // add Task
            this.addBtn.addEventListener("click", function () {
                _this.listNode.appendChild(_this.createLik('name'));
                _this.countTask++;
                _this.countAll.innerHTML = _this.countTask;
            }, false);
            // ===================================================
        }
    }]);

    return ToDoList;
}();

var list1 = new ToDoList('list1');

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Task = [1, 2, 3];

exports.Task = Task;

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map