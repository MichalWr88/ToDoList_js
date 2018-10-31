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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _global = __webpack_require__(0);

var _toDoList = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion: 6 */
/* jshint -W024 */
/* jshint expr:true */


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
		_this.index = 0;
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
					var name = elem.name,
					    id = elem.id,
					    created = elem.created,
					    updated = elem.updated,
					    tasks = elem.tasks;

					_this2.createDomLik(name, id, created, updated, tasks);
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
		value: function createDomLik(name, id, created, updated, tasks) {
			var boardsLi = this.createElement("li", "b" + id, "listsName__elem", name);
			this.boardsList.appendChild(boardsLi);

			var list = new _toDoList.ToDoList(name, id, this, created, updated, tasks);
			this.listTasksDom.appendChild(list.domElem.box);
			return list;
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
		}
	}, {
		key: "addNewList",
		value: function addNewList() {
			var list = this.createDomLik(this.newToDoListName.value, this.index, "", "");
			this.index++;
			this.newToDoListName.value = "";
			this.newToDoListName.focus();
			this.newToDoListName.select();
			clearListName.classList.add("d_none");
			this._checkListLength();
			var id = list.id,
			    name = list.name,
			    created = list.created,
			    updated = list.updated,
			    tasks = list.tasks;

			this.listArray.push({ id: id, name: name, created: created, updated: updated, tasks: tasks });
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ToDoList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(3);

var _global = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToDoList = exports.ToDoList = function (_Global) {
	_inherits(ToDoList, _Global);

	function ToDoList(name, id, parent, created, updated, tasks) {
		_classCallCheck(this, ToDoList);

		var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this));

		_this.id = id;
		_this.parent = parent;
		_this.created = created || _this._getFormatDate();
		_this.updated = updated || "";
		_this.name = name;
		_this.tasks = tasks || [];
		_this.countTask = 0;
		_this.countChecked = _this.tasks.filter(function (e) {
			return e.checked;
		}).length;
		_this.domElem = _this.createDomElem();

		// -----------------------------------

		//------------------
		_this.initEvent();
		_this.initTasksList();
		return _this;
	}

	_createClass(ToDoList, [{
		key: "createDomElem",
		value: function createDomElem() {
			console.log(this.created);

			var source = document.getElementById("list-template").innerHTML,
			    templateList = Handlebars.compile(source),
			    name = this.name,
			    id = this.id,
			    created = this.created,
			    updated = this.updated,
			    countTask = this.countTask,
			    countChecked = this.countChecked,
			    html = templateList({ name: name, id: id, created: created, updated: updated, countTask: countTask, countChecked: countChecked }),
			    elem = this.createElement("li", "l" + id, "listToDo", html);


			var ListDom = {
				box: elem,
				nameInp: elem.querySelector(".listToDo__name"),
				newTaskInp: elem.querySelector(".listToDo__newTask"),
				addBtn: elem.querySelector(".listToDo__add"),
				delBtn: elem.querySelector(".listToDo__del"),
				listNode: elem.querySelector(".listToDo__container"),
				countAll: elem.querySelector(".listToDo__allCount"),
				countChecked: elem.querySelector(".listToDo__chekedCount"),
				created: elem.querySelector(".listToDo_created"),
				updated: elem.querySelector(".listToDo_updated")
			};
			return ListDom;
		}
	}, {
		key: "initTasksList",
		value: function initTasksList() {
			var _this2 = this;

			if (!this.tasks.length) return;
			this.tasks.forEach(function (e) {
				_this2.createTask(e.id, e.name, _this2, e.priority, e.checked);
			});
		}
	}, {
		key: "updateLocalStorage",
		value: function updateLocalStorage(props) {
			this.parent.updateLocalStorage(props);
		}
	}, {
		key: "_getFormatDate",
		value: function _getFormatDate() {
			var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

			var options = { year: "numeric", day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" };
			return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
		}
	}, {
		key: "updateDate",
		value: function updateDate() {
			var currentTime = this._getFormatDate();
			this.domElem.updated.innerHTML = currentTime;
			this.updateLocalStorage({ updated: currentTime, id: this.id, tasks: this.tasks });

			return currentTime;
		}
	}, {
		key: "updateCheckedTask",
		value: function updateCheckedTask() {
			var array = [].concat(_toConsumableArray(this.domElem.listNode.children)).filter(function (elem) {
				return elem.classList.contains("checked");
			});
			this.countChecked = array.length;
			this.domElem.countChecked.innerHTML = this.countChecked;
		}
	}, {
		key: "sortList",
		value: function sortList() {
			var _this3 = this;

			[].concat(_toConsumableArray(this.domElem.listNode.children)).sort(function (a, b) {
				var AA = a.classList.contains("checked") ? 1 : 0,
				    BB = b.classList.contains("checked") ? 1 : 0,
				    AT = a.querySelector(".task_priority").value,
				    BT = b.querySelector(".task_priority").value;
				if (AA < BB) {
					return -1;
				} else if (!AA && !BB && AT > BT) {
					return -1;
				} else if (AA == BB) {
					return 0;
				}
			}).forEach(function (e) {
				return _this3.domElem.listNode.appendChild(e);
			});
			this.updateCheckedTask();
		}
	}, {
		key: "removeList",
		value: function removeList(elem) {
			this.parent.removeChild(this.id);
		}
	}, {
		key: "removeTask",
		value: function removeTask(id) {
			this.domElem.listNode.querySelector("#" + id).remove();
			this.tasks = this.tasks.filter(function (e) {
				return e.id != id;
			});
			this.updateDate();
		}
	}, {
		key: "addTask",
		value: function addTask() {
			if (this.domElem.newTaskInp.value.length != 0) {
				this.createTask("l" + this.id + "-" + this.countTask, this.domElem.newTaskInp.value);
			}
		}
	}, {
		key: "createTask",
		value: function createTask(id, name) {
			var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
			var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
			var checked = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

			var task = new _task.Task(id, name, parent, priority, checked);
			this.countTask++;
			this.domElem.countAll.innerHTML = this.countTask;
			this.domElem.newTaskInp.value = "";

			this.updateList(task);
			this.sortList();
			this.updateDate();
		}
	}, {
		key: "updateList",
		value: function updateList(task, sort) {
			console.log(task);

			var obj = {
				id: task.id,
				checked: task.checked,
				priority: task.priority,
				name: task.name
			};
			if (!this.tasks.find(function (e) {
				return e.id == obj.id;
			})) this.tasks.push(obj);
			this.tasks = this.tasks.map(function (e) {
				return e.id == obj.id ? obj : e;
			});
			if (sort) this.sortList();
			this.updateDate();
		}
	}, {
		key: "updateName",
		value: function updateName() {
			this.parent.updateListName(this.id, this.domElem.nameInp.value);
		}
		// ===================================================

	}, {
		key: "initEvent",
		value: function initEvent() {
			var _this4 = this;

			this.domElem.addBtn.addEventListener("click", function () {
				_this4.addTask();
			}, false);

			this.domElem.nameInp.addEventListener("blur", function () {
				_this4.updateName();
			}, false);

			this.domElem.delBtn.addEventListener("click", function () {
				_this4.removeList();
			}, false);

			this.domElem.newTaskInp.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {
					_this4.addTask();
				}
			}, false);
		}
	}]);

	return ToDoList;
}(_global.Global);

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
		this.priority = priority != undefined ? priority : 1;
		this.checked = checked;
		this.lik = this.createDomElem();
		this.onInit();
	}

	_createClass(Task, [{
		key: "onInit",
		value: function onInit() {
			this.parent.domElem.listNode.appendChild(this.lik.box);
			this.initEvents();
		}
	}, {
		key: "createDomElem",
		value: function createDomElem() {
			var templateTask = document.getElementById("task-template").innerHTML,
			    likHtml = Handlebars.compile(templateTask),
			    html = likHtml({ id: this.id, taskName: this.name }),
			    lik = document.createElement("li");
			lik.className = "listToDo__task";
			lik.setAttribute("id", this.id);
			lik.innerHTML = html;
			var likNode = {
				box: lik,
				name: lik.querySelector(".task__name"),
				checkedBtn: lik.querySelector(".task__btn-check"),
				priority: lik.querySelector(".task_priority"),
				delBtn: lik.querySelector(".task__btn-dell")
			};
			this.checkedElem(likNode, this.checked);
			likNode.priority.value = this.priority;
			return likNode;
		}
	}, {
		key: "initEvents",
		value: function initEvents() {
			var _this = this;

			this.lik.checkedBtn.addEventListener("click", function () {
				_this.checkedElem(_this.lik, !_this.checked);
				_this.updateTask(true);
			}, false);
			this.lik.name.addEventListener("blur", function (e) {
				_this.name = e.target.innerHTML;
				_this.updateTask(false);
			}, false);

			this.lik.delBtn.addEventListener("click", function (e) {
				_this.parent.removeTask(_this.id);
			}, false);
			this.lik.priority.addEventListener("change", function (e) {
				_this.priority = e.target.value;
				_this.updateTask(true);
			}, false);
		}
	}, {
		key: "checkedElem",
		value: function checkedElem(likNode, status) {
			var box = likNode.box,
			    name = likNode.name,
			    checkedBtn = likNode.checkedBtn,
			    priority = likNode.priority;

			if (status) {
				this.checked = true;
				name.setAttribute("tabindex", "-1");
				priority.setAttribute("tabindex", "-1");
				checkedBtn.querySelector("i").classList.add("ion-checkmark-round");
				box.classList.add("checked");
			} else {
				this.checked = false;
				name.removeAttribute("tabindex");
				priority.removeAttribute("tabindex");
				checkedBtn.querySelector("i").classList.remove("ion-checkmark-round");
				box.classList.remove("checked");
			}
		}
	}, {
		key: "updateTask",
		value: function updateTask(sort) {
			this.parent.updateList(this, sort);
		}
	}]);

	return Task;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map