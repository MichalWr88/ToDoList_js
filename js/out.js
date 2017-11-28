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
            var _this = this;

            var local = JSON.parse(localStorage.getItem(this.id));
            if (local === null) {
                localStorage.setItem(this.id, JSON.stringify(this.list));
            } else {
                this.list = JSON.parse(localStorage.getItem(this.id));
                console.log(this.list);
                this.countTask = this.list.length;
                this.countAll.innerHTML = this.countTask;
                this.list.forEach(function (elem, index) {
                    var Task = _this.createLik(elem.text);
                    _this.listNode.appendChild(Task.lik);
                });
            }
        }
    }, {
        key: 'createLik',
        value: function createLik(name) {
            var _this2 = this;

            var date = new Date(),
                day = date.getDate(),
                month = date.getMonth(),
                year = date.getFullYear();

            // ----------------------------------------------------------
            var lik = document.createElement('li');
            lik.className = 'toDoList__task';

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
            nameInp.textContent = name;
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
                _this2.list = _this2.list.filter(function (elem) {
                    if (elem.text !== name) {
                        return elem;
                    }
                });
                localStorage.setItem(_this2.id, JSON.stringify(_this2.list));
                _this2.countTask = _this2.list.length;
                _this2.countAll.innerHTML = _this2.countTask;
            }, false);
            // --------------------------------------------------------------
            var checkBtn = document.createElement('button');
            checkBtn.className = 'ion-checkmark-round btn task__check';
            checkBtn.addEventListener('click', function () {
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
            var count = this.list.length + 1;
            // create object with task prop
            var data = {
                id: count,
                text: name,
                checked: false,
                priority: 0,
                date: day + '.' + (month + 1) + '.' + year
            };
            labelP.append(priority);
            lik.append(checkBtn);
            lik.append(nameInp);
            lik.append(delBtn);
            lik.append(labelP);
            lik.append(dateTask);
            return { lik: lik, data: data };
        }
    }, {
        key: 'initTask',
        value: function initTask(name) {
            createLik(name);
            this.list.push(Task.data);
            localStorage.setItem(this.id, JSON.stringify(this.list));

            // var storedNames = JSON.parse(localStorage.getItem(this.id));

            // ------------------------------------------------------------------
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this3 = this;

            // change input name List
            this.nameInp.addEventListener('blur', function (e) {
                _this3.name = e.target.value;
            }, false);

            // add Task
            this.addBtn.addEventListener("click", function () {
                var Task = _this3.createLik(_this3.newTaskInp.value);
                _this3.listNode.appendChild(Task.lik);
                _this3.list.push(Task.data);
                _this3.countTask++;
                _this3.countAll.innerHTML = _this3.countTask;
                localStorage.setItem(_this3.id, JSON.stringify(_this3.list));
                _this3.newTaskInp.value = '';
            }, false);
            // ===================================================
        }
    }]);

    return ToDoList;
}();

var list1 = new ToDoList('list1');

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map