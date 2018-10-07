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

		_this.index = 1;
		_this.box = document.getElementById(id);
		_this.boardsBtn = _this.box.querySelector("#boardsBtn");
		_this.boardsList = _this.box.querySelector("#boardsList");
		_this.newToDoListName = _this.box.querySelector("#listName");
		_this.addNewListBtn = _this.box.querySelector("#addNewList");
		_this.clearListName = _this.box.querySelector("#clearListName");
		_this.listTasksDom = _this.fInDoc(".list__tasks");
		_this.initEvents();
		return _this;
	}

	_createClass(App, [{
		key: "initEvents",
		value: function initEvents() {
			var _this2 = this;

			this.boardsBtn.addEventListener("click", function () {
				_this2.boardsList.classList.toggle("h-0");
			}, false);

			this.newToDoListName.addEventListener("keyup", function (e) {
				if (_this2._checkName()) {
					clearListName.classList.remove("d_none");
					if (e.keyCode === 13) {
						_this2.addNewList();
						clearListName.classList.add("d_none");
					}
				} else {
					clearListName.classList.add("d_none");
				}
			}, false);
			this.addNewListBtn.addEventListener("click", function () {
				_this2._checkName() ? _this2.addNewList() : false;
			}, false);

			this.clearListName.addEventListener("click", function () {
				_this2.newToDoListName.value = "";
				_this2.clearListName.classList.add("d_none");
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
		key: "addNewList",
		value: function addNewList() {
			var html = templateList({ taskName: this.newToDoListName.value }),
			    listLi = this.createElement("li", "l" + this.index, "listToDo", html),
			    boardsLi = this.createElement("li", "b" + this.index, "listsName__elem", this.newToDoListName.value);

			this.boardsList.appendChild(boardsLi);
			this.listTasksDom.appendChild(listLi);

			var list = new _toDoList.ToDoList(this.index, this);
			if (this.boardsList.children.length) {
				this.listTasksDom.querySelector(".list__empty").style.display = "none";
			} else {
				this.listTasksDom.querySelector(".list__empty").style.display = "block";
			}
			this.index++;
			this.newToDoListName.value = "";
			this.newToDoListName.focus();
			this.newToDoListName.select();
		}
	}, {
		key: "removeChild",
		value: function removeChild(id) {
			this.listTasksDom.querySelector("#l" + id).remove();
			this.boardsList.querySelector("#b" + id).remove();
			if (this.boardsList.children.length) {
				this.listTasksDom.querySelector(".list__empty").style.display = "none";
			} else {
				this.listTasksDom.querySelector(".list__empty").style.display = "block";
			}
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
	function ToDoList(id, parent) {
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
		// -----------------------------------
		// this.list = [];
		this.countTask = 0;
		this.checked = 0;
		this.created.innerHTML = this._getFormatDate();
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

			var local = JSON.parse(localStorage.getItem(this.id));
			if (local === null) {
				localStorage.setItem(this.id, JSON.stringify(this.list));
			} else {
				this.list = JSON.parse(localStorage.getItem(this.id));
				console.log(this.list);
				this.countTask = this.list.length;
				this.countAll.innerHTML = this.countTask;
				this.list.forEach(function (elem, index) {
					// const Task = this.createLik(elem.text, elem.date, elem.checked);
					_this.listNode.appendChild(_task.Task.lik);
				});
			}
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
		key: "_updateDate",
		value: function _updateDate() {
			var currentTime = new Date();
			this.updated.innerHTML = this._getFormatDate(currentTime);
			return this._getFormatDate(currentTime);
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
			// console.log(sortArr);
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
		value: function removeTask() {}
	}, {
		key: "createLik",
		value: function createLik(name, dat, check) {
			var _this3 = this;

			//     localStorage.setItem(this.id, JSON.stringify(this.list));
			//     this.countTask = this.list.length;
			//     this.countAll.innerHTML = this.countTask;
			//   },
			//   false
			// );
			// --------------------------------------------------------------
			checkBtn.addEventListener("click", function () {
				labelP.classList.toggle("blured");
				nameInp.classList.toggle("checked");
				nameInp.setAttribute("disabled", true);

				if (data.checked === false) {
					data.checked = true;
					_this3.list.map(function (elem) {
						if (elem.text === data.text) {
							elem.checked = true;
						}
					});
					// this.list.push(Task.data);
					//   localStorage.setItem(this.id, JSON.stringify(this.list));
					// } else {
					//   data.checked = false;
					//   this.list.map(elem => {
					//     if (elem.text === data.text) {
					//       elem.checked = false;
					//     }
					//   });
					// this.list.push(Task.data);
					// localStorage.setItem(this.id, JSON.stringify(this.list));
				}
				// this.updateCheckedTask();
			}, false);
			var count = this.list.length + 1;
			if (data.checked === true) {
				labelP.classList.toggle("blured");
				nameInp.classList.toggle("checked");
				nameInp.setAttribute("disabled", true);
			}
			this.updateCheckedTask();
			return { lik: lik, data: data };
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
				var task = new _task.Task(this.countTask, this.newTaskInp.value, this);
				this._updateDate();
				this.countTask++;
				this.countAll.innerHTML = this.countTask;
				this.newTaskInp.value = "";
				this.sortList();
				// localStorage.setItem(this.id, JSON.stringify(this.list));
				// const Task = this.createLik(this.newTaskInp.value.trim());
				// this.list.push(Task.data);
			}
		}
	}, {
		key: "initEvent",
		value: function initEvent() {
			var _this4 = this;

			// ===================================================
			this.addBtn.addEventListener("click", function () {
				_this4.addTask();
			}, false);
			// ===================================================
			this.delBtn.addEventListener("click", function () {
				_this4.removeList();
			}, false);
			// ===================================================
			this.newTaskInp.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {
					_this4.addTask();
					// localStorage.setItem(this.id, JSON.stringify(this.list));
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
  function Task(id, name, parent) {
    _classCallCheck(this, Task);

    this.id = id;
    this.parent = parent;
    this.name = name;
    this.lik = this.createLik();
    this.checkBtn = this.lik.querySelector('.task__btn-check');
    this.nameInp = this.lik.querySelector('.task__name');
    this.delBtn = this.lik.querySelector('.task__btn-dell');
    this.priority = this.lik.querySelector('.task_priority');
    this.onInit();
  }

  _createClass(Task, [{
    key: 'onInit',
    value: function onInit() {
      this.parent.listNode.appendChild(this.lik);
      this.initEvents();
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
      lik.setAttribute('id', this.id);
      lik.innerHTML = html;
      lik.querySelector('.task_priority').value = 1;
      return lik;
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this = this;

      this.checkBtn.addEventListener('click', function () {

        _this.checkedElem();
        _this.parent.updateCheckedTask();
        _this.nameInp.classList.toggle('blured');
      }, false);
      this.nameInp.addEventListener('blur', function () {}, false);
      this.delBtn.addEventListener('click', function (e) {
        _this.parent.removeTask(e.currentTarget.parentNode);
      }, false);
      this.priority.addEventListener('change', function (e) {
        _this.parent.sortList();
        //  this.parent.sortPriority()
      }, false);
    }
  }, {
    key: 'checkedElem',
    value: function checkedElem() {
      this.checkBtn.querySelector('i').classList.toggle('ion-checkmark-round');
      this.lik.classList.toggle('checked');

      if (this.lik.classList.contains('checked')) {
        this.nameInp.setAttribute('tabindex', '-1');
        this.priority.setAttribute('tabindex', '-1');
      } else {
        this.nameInp.removeAttribute('tabindex');
        this.priority.removeAttribute('tabindex');
      }
    }
  }]);

  return Task;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map