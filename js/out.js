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

var _global = __webpack_require__(1);

var _toDoList = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion: 6 */
/* jshint -W024 */
/* jshint expr:true */


var source = document.getElementById("list-template").innerHTML,
    templateList = Handlebars.compile(source);

var App = function (_Global) {
	_inherits(App, _Global);

	function App(id) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.box = document.getElementById(id);
		_this.boardsBtn = _this.box.querySelector("#boardsBtn");
		_this.boardsList = _this.box.querySelector("#boardsList");
		_this.newToDoListName = _this.box.querySelector("#listName");
		_this.addNewListBtn = _this.box.querySelector("#addNewList");
		_this.clearListName = _this.box.querySelector("#clearListName");
		_this.listTasksDom = _this.fInDoc(".list__tasks");
		_this.listArray = [];
		_this.initEvents();
		_this.initLocalSrtorage();
		return _this;
	}

	_createClass(App, [{
		key: "initLocalSrtorage",
		value: function initLocalSrtorage() {
			var _this2 = this;

			var local = JSON.parse(localStorage.getItem("app"));
			if (local === null) {
				localStorage.setItem("app", JSON.stringify([]));
				this.index = 1;
			} else {
				this.listArray = JSON.parse(localStorage.getItem("app"));

				this.index = Math.max.apply(Math, this.listArray.map(function (o) {
					return o.id;
				})) + 1;
				this.listArray.forEach(function (elem, index) {
					_this2.createDomLik(elem.name, elem.id, elem.created, elem.updated);
				});
				this._checkListLength();
			}
		}
	}, {
		key: "saveInLocalStorage",
		value: function saveInLocalStorage() {
			localStorage.setItem("app", JSON.stringify(this.listArray));
		}
	}, {
		key: "initEvents",
		value: function initEvents() {
			var _this3 = this;

			this.boardsBtn.addEventListener("click", function () {
				if (!_this3.boardsList.children.length) return;
				_this3.boardsList.classList.toggle("h-0");
			}, false);

			this.newToDoListName.addEventListener("keyup", function (e) {
				if (_this3._checkName()) {
					clearListName.classList.remove("d_none");
					if (e.keyCode === 13) {
						_this3.addNewList();
					}
				} else {
					clearListName.classList.add("d_none");
				}
			}, false);
			this.addNewListBtn.addEventListener("click", function () {
				_this3._checkName() ? _this3.addNewList() : false;
			}, false);

			this.clearListName.addEventListener("click", function () {
				_this3.newToDoListName.value = "";
				_this3.clearListName.classList.add("d_none");
			}, false);
		}
	}, {
		key: "_checkName",
		value: function _checkName() {
			if (!this.newToDoListName.validity.valid) {
				this.box.querySelector(".error").classList.add("hide");
			} else {
				this.box.querySelector(".error").classList.remove("hide");
			}
			return this.newToDoListName.value.trim().length;
		}
	}, {
		key: "updateListName",
		value: function updateListName(id, name) {
			this.boardsList.querySelector("#b" + id).innerHTML = name;
			this.updateLocalStorage({ name: name, id: id });
		}
	}, {
		key: "createDomLik",
		value: function createDomLik(name, id, created, updated) {
			var html = templateList({ taskName: name }),
			    listLi = this.createElement("li", "l" + id, "listToDo", html),
			    boardsLi = this.createElement("li", "b" + id, "listsName__elem", name);
			this.boardsList.appendChild(boardsLi);
			this.listTasksDom.appendChild(listLi);
			return new _toDoList.ToDoList(id, this, created, updated);
		}
	}, {
		key: "_checkListLength",
		value: function _checkListLength() {
			if (this.boardsList.children.length) {
				this.listTasksDom.querySelector(".list__empty").style.display = "none";
			} else {
				this.listTasksDom.querySelector(".list__empty").style.display = "block";
			}
		}
	}, {
		key: "updateLocalStorage",
		value: function updateLocalStorage(props) {
			var id = props.id,
			    name = props.name,
			    created = props.created,
			    updated = props.updated,
			    tasks = props.tasks;

			this.listArray.map(function (e) {
				if (e.id == id) {
					if (name) {
						e.name = name;
					}
					if (created) {
						e.created = created;
					}
					if (updated) {
						e.updated = updated;
					}
					if (tasks) {
						e.tasks = tasks;
					}
				}
			});
			this.saveInLocalStorage();
			console.log(this.listArray);
		}
	}, {
		key: "addNewList",
		value: function addNewList() {
			var list = this.createDomLik(this.newToDoListName.value, this.index, "", "");
			this.listArray.push({
				id: list.id,
				name: list.nameInp.value,
				created: list.created.innerHTML,
				updated: list.updated.innerHTML,
				tasks: []
			});

			this.index++;
			this.newToDoListName.value = "";
			this.newToDoListName.focus();
			this.newToDoListName.select();
			clearListName.classList.add("d_none");
			this._checkListLength();
			this.saveInLocalStorage();
		}
	}, {
		key: "removeChild",
		value: function removeChild(id) {
			this.listTasksDom.querySelector("#l" + id).remove();
			this.boardsList.querySelector("#b" + id).remove();
			this.listArray = this.listArray.filter(function (e) {
				return e.id != id;
			});
			console.log(this.listArray);
			this.saveInLocalStorage();
			this._checkListLength();
		}
	}]);

	return App;
}(_global.Global);

var header = new App("header");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Global = exports.Global = function () {
	function Global() {
		_classCallCheck(this, Global);
	}

	_createClass(Global, [{
		key: 'createElement',
		value: function createElement() {
			var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
			var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
			var classList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
			var html = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

			var e = document.createElement(elem);
			e.setAttribute('id', id);
			e.classList.add(classList);
			e.innerHTML = html;
			return e;
		}
	}, {
		key: 'fInDoc',
		value: function fInDoc(elem) {
			var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (all !== false) {
				var obj = [].concat(_toConsumableArray(document.querySelectorAll(elem)));
				return obj;
			} else {
				var _obj = document.querySelector(elem);
				return _obj;
			}
		}
	}]);

	return Global;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ToDoList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = exports.ToDoList = function () {
	function ToDoList(id, parent, created, updated) {
		_classCallCheck(this, ToDoList);

		this.id = id;
		this.parent = parent;
		this.box = document.getElementById("l" + id);
		this.nameInp = this.box.querySelector(".listToDo__name");
		this.newTaskInp = this.box.querySelector(".listToDo__newTask");
		this.addBtn = this.box.querySelector(".listToDo__add");
		this.delBtn = this.box.querySelector(".listToDo__del");
		this.listNode = this.box.querySelector(".listToDo__container");
		this.countAll = this.box.querySelector(".listToDo__allCount");
		this.countChecked = this.box.querySelector(".listToDo__chekedCount");
		this.created = this.box.querySelector(".listToDo_created");
		this.updated = this.box.querySelector(".listToDo_updated");
		this.list = [];
		this.countTask = 0;
		this.checked = 0;
		this.LsObj = this.initLocalStorage();
		// -----------------------------------
		this.created.innerHTML = created || this._getFormatDate();
		this.updated.innerHTML = updated || "";
		//------------------
		// this.initList();
		// this.initLocalStorage();
		this.initEvent();
	}

	// initList() {
	//   this.countAll.innerHTML = this.countTask;
	// }


	_createClass(ToDoList, [{
		key: "initLocalStorage",
		value: function initLocalStorage() {
			var _this = this;

			var local = JSON.parse(localStorage.getItem("app")),
			    current = local.find(function (e) {
				return e.id == _this.id;
			});
			if (current && current.tasks.length) {
				current.tasks.forEach(function (e) {
					_this.createTask(e.id, e.name, _this, e.priority, e.checked);
				});
				console.log(current);
			}
			return current;
		}
	}, {
		key: "updateLocalStorage",
		value: function updateLocalStorage(props) {
			this.parent.updateLocalStorage(props);
		}
	}, {
		key: "_getFormatDate",
		value: function _getFormatDate(d) {
			var options = {
				year: "numeric",
				day: "numeric",
				month: "numeric",
				hour: "numeric",
				minute: "numeric"
			};
			if (d) {
				return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
			} else {
				return new Date().toLocaleDateString("pl-PL", options).replace(",", "");
			}
		}
	}, {
		key: "updateDate",
		value: function updateDate() {
			var currentTime = this._getFormatDate(new Date());
			this.updated.innerHTML = currentTime;
			this.updateLocalStorage({ updated: currentTime, id: this.id, tasks: this.list });
			// this.parent.updateLocalStorage(this.id, currentTime, "updated");
			return currentTime;
		}
	}, {
		key: "updateTasks",
		value: function updateTasks(props) {
			var id = props.id,
			    name = props.name,
			    checked = props.checked,
			    priority = props.priority;
		}
	}, {
		key: "updateCheckedTask",
		value: function updateCheckedTask() {
			var array = [].concat(_toConsumableArray(this.listNode.children)).filter(function (elem) {
				return elem.classList.contains("checked");
			});
			this.checked = array.length;
			this.countChecked.textContent = this.checked;
			this.sortList();
		}
	}, {
		key: "sortList",
		value: function sortList() {
			var _this2 = this;

			console.log(this.list);
			var sortArr = [].concat(_toConsumableArray(this.listNode.children)).sort(function (a, b) {
				var AA = a.classList.contains("checked") ? 1 : 0,
				    BB = b.classList.contains("checked") ? 1 : 0,
				    AT = a.querySelector(".task_priority").value,
				    BT = b.querySelector(".task_priority").value;
				if (AA > BB) {
					return 1;
				}
				if (AT < BT && AA < BB) {
					return 1;
				}
				if (AT < BT && AA == BB) {
					return 1;
				}
				if (AT == BT && AA > BB) {
					return -1;
				} else {
					return -1;
				}
			});
			// localStorage.setItem(this.id, JSON.stringify(this.list));

			sortArr.forEach(function (e) {
				_this2.listNode.appendChild(e);
			});
		}
	}, {
		key: "removeList",
		value: function removeList(elem) {
			this.parent.removeChild(this.id);
		}
	}, {
		key: "removeTask",
		value: function removeTask(elem) {
			this.listNode.querySelector("#" + elem).remove();
		}
	}, {
		key: "initTask",
		value: function initTask(name) {
			// this.list.push(Task.data);
			// var storedNames = JSON.parse(localStorage.getItem(this.id));
			localStorage.setItem(this.id, JSON.stringify(this.list));
		}
	}, {
		key: "addTask",
		value: function addTask() {
			if (this.newTaskInp.value.length != 0) {
				this.createTask("l" + this.id + "-" + this.countTask, this.newTaskInp.value);
			}
		}
	}, {
		key: "createTask",
		value: function createTask(id, name) {
			var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
			var checked = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			var task = new _task.Task(id, name, this, priority, checked);
			this.countTask++;
			this.countAll.innerHTML = this.countTask;
			this.newTaskInp.value = "";
			this.updateLocalSTask(task);
			this.sortList();
			this.updateDate();
		}
	}, {
		key: "updateLocalSTask",
		value: function updateLocalSTask(task) {
			var taskObj = {
				id: task.id,
				name: task.name,
				priority: task.priority.value,
				checked: task.lik.box.classList.contains("checked")
			};
			this.list.push(taskObj);
			console.log(taskObj);
		}
	}, {
		key: "updateName",
		value: function updateName() {
			this.parent.updateListName(this.id, this.nameInp.value);
		}
	}, {
		key: "initEvent",
		value: function initEvent() {
			var _this3 = this;

			// ===================================================
			this.addBtn.addEventListener("click", function () {
				_this3.addTask();
			}, false);
			// ===================================================
			this.nameInp.addEventListener("blur", function () {
				_this3.updateName();
			}, false);
			// ===================================================
			this.delBtn.addEventListener("click", function () {
				_this3.removeList();
			}, false);
			// ===================================================
			this.newTaskInp.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {
					_this3.addTask();
				}
			}, false);
			// ===================================================
		}
	}]);

	return ToDoList;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = exports.Task = function () {
	function Task(id, name, parent, priority, checked) {
		_classCallCheck(this, Task);

		this.id = id;
		this.parent = parent;
		this.name = name;
		this.priority = priority;
		this.checked = checked;
		this.lik = this.createLik();
		this.onInit();
	}

	_createClass(Task, [{
		key: "onInit",
		value: function onInit() {
			console.log(this);

			this.parent.listNode.appendChild(this.lik.box);
			this.initEvents();
		}
	}, {
		key: "createLik",
		value: function createLik() {
			var templateTask = document.getElementById("task-template").innerHTML,
			    likHtml = Handlebars.compile(templateTask),
			    html = likHtml({
				id: this.id,
				taskName: this.name
			}),
			    lik = document.createElement("li");
			lik.className = "listToDo__task";
			lik.setAttribute("id", this.id);
			lik.innerHTML = html;
			lik.querySelector(".task_priority").value = 1;
			var likNode = {
				box: lik,
				name: lik.querySelector(".task__name"),
				checkedBtn: lik.querySelector(".task__btn-check"),
				priority: lik.querySelector(".task_priority"),
				delBtn: lik.querySelector(".task__btn-dell")
			};
			return likNode;
		}
	}, {
		key: "initEvents",
		value: function initEvents() {
			var _this = this;

			this.lik.checkedBtn.addEventListener("click", function () {
				_this.checkedElem();
				_this.parent.updateCheckedTask();
				_this.nameInp.classList.toggle("blured");
			}, false);
			this.lik.name.addEventListener("blur", function () {}, false);
			this.lik.delBtn.addEventListener("click", function (e) {
				_this.parent.removeTask(_this.id);
			}, false);
			this.lik.priority.addEventListener("change", function (e) {
				_this.priority = e.target.value;
				console.log(_this.parent.list);
				_this.parent.list.forEach(function (e) {
					if (e.id == _this.id) {
						e.checked = _this.checked;
						e.priority = _this.priority;
						e.name = _this.name;
					}
				});
				_this.parent.sortList();
			}, false);
		}
	}, {
		key: "checkedElem",
		value: function checkedElem() {
			var nameInp = this.lik.this.lik.querySelector(".task__btn-check").querySelector("i").classList.toggle("ion-checkmark-round");
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
	}, {
		key: "updateDate",
		value: function updateDate() {
			this.parent.updateDate();
		}
	}]);

	return Task;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map