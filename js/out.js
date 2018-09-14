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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */


var _global = __webpack_require__(1);

var _glob = _interopRequireWildcard(_global);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addListBtn = _glob.cElem('.btn', true);
// console.log(addListBtn);
var source = document.getElementById('list-template').innerHTML,
    templateList = Handlebars.compile(source);

var add = document.querySelector('.addList__addBtn'),
    body = document.querySelector('body'),
    indexList = 1;
console.log(add);

var App = function () {
	function App(id) {
		_classCallCheck(this, App);

		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector('#boardsBtn');
		this.boardsList = this.box.querySelector('#boardsList');
		this.newToDoListName = this.box.querySelector('#listName');
		this.addNewListBtn = this.box.querySelector('#addNewList');
		this.clearListName = this.box.querySelector('#clearListName');
		this.listTasks = _glob.cElem('.list__tasks');
		this.li = document.createElement('li');
		this.index = 1;
		this.initEvents();
	}

	_createClass(App, [{
		key: 'initEvents',
		value: function initEvents() {
			var _this = this;

			this.boardsBtn.addEventListener('click', function (e) {
				_this.boardsList.classList.toggle('h-0');
			}, false);
			this.newToDoListName.addEventListener('keyup', function (e) {
				_this.newToDoListName.value.trim().length ? clearListName.classList.remove('d_none') : clearListName.classList.add('d_none');
				if (e.keyCode === 13) {
					_this.addNewList();
				}
			}, false);
			this.addNewListBtn.addEventListener('click', function () {
				_this.addNewList();
			}, false);
			this.clearListName.addEventListener('click', function () {
				_this.newToDoListName.value = '';
				_this.clearListName.classList.add('d_none');
			}, false);
		}
	}, {
		key: 'addNewList',
		value: function addNewList() {
			var id = 'l' + this.index;
			this.index++;
			var html = templateList({ taskName: this.newToDoListName.value });
			var listLi = this.li.cloneNode(true);
			var boardsLi = this.li.cloneNode(true);
			boardsLi.innerHTML = this.newToDoListName.value;
			boardsLi.className = 'listsName__elem';
			this.boardsList.appendChild(boardsLi);
			listLi.className = 'listToDo';
			listLi.setAttribute('id', id);
			listLi.innerHTML = html;
			this.listTasks.appendChild(listLi);
			var list = new ToDoList(id);
			this.newToDoListName.value = '';
		}
	}, {
		key: 'createListElem',
		value: function createListElem(id) {}
	}]);

	return App;
}();

var header = new App('header');
console.log(header);

var ToDoList = function () {
	function ToDoList(id) {
		_classCallCheck(this, ToDoList);

		this.box = document.getElementById(id);
		this.nameInp = this.box.querySelector('.listToDo__name');
		this.newTaskInp = this.box.querySelector('.listToDo__newTask');
		this.addBtn = this.box.querySelector('.listToDo__add');
		this.listNode = this.box.querySelector('.listToDo__container');
		this.countAll = this.box.querySelector('.listToDo__allCount');
		this.countChecked = this.box.querySelector('.listToDo__chekedCount');
		// -----------------------------------
		this.id = id;
		this.list = [];
		this.countTask = 0;
		this.checked = null;
		// this.name = this.nameInp.value;

		//------------------
		this.initList();
		// this.initLocalStorage();
		this.initEvent();
	}

	_createClass(ToDoList, [{
		key: 'initList',
		value: function initList() {
			this.countAll.innerHTML = this.countTask;
		}
	}, {
		key: 'initLocalStorage',
		value: function initLocalStorage() {
			var _this2 = this;

			var local = JSON.parse(localStorage.getItem(this.id));
			if (local === null) {
				localStorage.setItem(this.id, JSON.stringify(this.list));
			} else {
				this.list = JSON.parse(localStorage.getItem(this.id));
				console.log(this.list);
				this.countTask = this.list.length;
				this.countAll.innerHTML = this.countTask;
				this.list.forEach(function (elem, index) {
					var Task = _this2.createLik(elem.text, elem.date, elem.checked);
					_this2.listNode.appendChild(Task.lik);
				});
			}
		}
	}, {
		key: 'updateCheckedTask',
		value: function updateCheckedTask() {
			var count = 0;
			var array = this.list.filter(function (elem) {
				return elem.checked === true;
			});
			this.checked = array.length;
			this.countChecked.textContent = this.checked;
		}
	}, {
		key: 'sortList',
		value: function sortList() {
			this.list.sort(function (a, b) {
				var AA = a.checked === true ? 1 : 0;
				console.log(AA);
				var BB = b.checked === true ? 1 : 0;
				// console.log(BB);

				return AA - BB;
			});
			localStorage.setItem(this.id, JSON.stringify(this.list));
		}
	}, {
		key: 'createLik',
		value: function createLik(name, dat, check) {
			var _this3 = this;

			var date = '',
			    day = '',
			    month = '',
			    year = '';
			if (!dat) {
				date = new Date(), day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
				console.log(date);
			} else {
				var txt = dat.split('.');
				console.log(txt);
				day = txt[0], month = txt[1], year = txt[2];
			}

			// ----------------------------------------------------------
			var lik = document.createElement('li');
			lik.className = 'listToDo__task';

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
			nameInp.setAttribute('contenteditable', 'true');
			nameInp.textContent = name;
			// -------------------------------------------------------------------
			var labelP = document.createElement('label');
			labelP.className = 'task__label';
			labelP.textContent = 'priority';
			console.log(day);
			var dateTask = document.createElement('p');
			dateTask.className = 'task__date';
			dateTask.textContent = 'create: ' + day + '.' + month + '.' + year;

			var delBtn = document.createElement('button');
			delBtn.className = 'ion-close-round btn task__delete';
			delBtn.addEventListener('click', function (e) {
				e.target.parentNode.remove(e.target.parentNode);
				_this3.list = _this3.list.filter(function (elem) {
					if (elem.text !== name) {
						return elem;
					}
				});
				localStorage.setItem(_this3.id, JSON.stringify(_this3.list));
				_this3.countTask = _this3.list.length;
				_this3.countAll.innerHTML = _this3.countTask;
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
					_this3.list.map(function (elem) {
						if (elem.text === data.text) {
							elem.checked = true;
						}
					});
					// this.list.push(Task.data);
					localStorage.setItem(_this3.id, JSON.stringify(_this3.list));
				} else {
					data.checked = false;
					_this3.list.map(function (elem) {
						if (elem.text === data.text) {
							elem.checked = false;
						}
					});
					// this.list.push(Task.data);
					localStorage.setItem(_this3.id, JSON.stringify(_this3.list));
				}
				_this3.updateCheckedTask();
				_this3.sortList();
			}, false);
			// ---------------------------------------------------------------------------
			//
			var count = this.list.length + 1;
			// create object with task prop
			var data = {
				id: count,
				text: name,
				checked: '',
				priority: 0,
				date: day + '.' + month + '.' + year
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
			var _this4 = this;

			// change input name List
			this.nameInp.addEventListener('blur', function (e) {
				_this4.name = e.target.value.trim();
			}, false);

			// add Task
			this.addBtn.addEventListener('click', function () {
				// const templateTask = document.getElementById('task-template').innerHTML;
				// const likHtml = Handlebars.compile(templateTask);
				// const html = likHtml({ id: 1, taskName: this.newTaskInp.value.trim(), createDate: new Date().toDateString() });

				// console.log(likHtml);
				// const lik = document.createElement('li');
				// lik.className = 'listToDo__task';
				// lik.innerHTML = html;
				// this.listNode.appendChild(lik);
				var task = new Task(_this4.countTask, _this4.newTaskInp.value, _this4.listNode);

				// const Task = this.createLik(this.newTaskInp.value.trim());
				_this4.list.push(Task.data);
				_this4.countTask++;
				_this4.countAll.innerHTML = _this4.countTask;
				localStorage.setItem(_this4.id, JSON.stringify(_this4.list));
				_this4.newTaskInp.value = '';
			}, false);
			// ===================================================
			this.newTaskInp.addEventListener('keydown', function (e) {
				if (e.keyCode === 13) {
					var _Task = _this4.createLik(_this4.newTaskInp.value.trim());
					_this4.listNode.appendChild(_Task.lik);
					_this4.list.push(_Task.data);
					_this4.countTask++;
					_this4.countAll.innerHTML = _this4.countTask;
					localStorage.setItem(_this4.id, JSON.stringify(_this4.list));
					_this4.newTaskInp.value = '';
				}
			}, false);
			// ===================================================
		}
	}]);

	return ToDoList;
}();

var Task = function () {
	function Task(id, name, parent) {
		_classCallCheck(this, Task);

		this.id = id;
		this.parent = parent;
		this.name = name;
		this.lik = this.createLik();
		// this.checkBtn = lik.querySelector('.task__btn-check');
		// this.nameInp = lik.querySelector('.task__name');
		// this.delBtn = lik.querySelector('.task__btn-dell');
		// this.priority = lik.querySelector('.task_priority');
		// this.createDate = lik.querySelector('.task_createDate');
		this.onInit();
	}

	_createClass(Task, [{
		key: 'onInit',
		value: function onInit() {
			this.parent.appendChild(this.lik);
		}
	}, {
		key: 'createLik',
		value: function createLik() {
			var templateTask = document.getElementById('task-template').innerHTML,
			    likHtml = Handlebars.compile(templateTask),
			    html = likHtml({
				id: this.id,
				taskName: this.name,
				createDate: new Date().toDateString()
			}),
			    lik = document.createElement('li');
			lik.className = 'listToDo__task';
			lik.innerHTML = html;
			return lik;
		}
	}, {
		key: 'initEvents',
		value: function initEvents() {}
	}]);

	return Task;
}();

var list1 = new ToDoList('list1');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cElem = exports.cElem = function cElem(elem) {
  var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (all !== false) {
    var obj = [].concat(_toConsumableArray(document.querySelectorAll(elem)));
    return obj;
  } else {
    var _obj = document.querySelector(elem);
    return _obj;
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map