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

var _toDoList = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var source = document.getElementById('list-template').innerHTML,
    templateList = Handlebars.compile(source);

// let add = document.querySelector('.addList__addBtn'),
// 	body = document.querySelector('body'),
// 	indexList = 1;
// console.log(add);

var App = function () {
	function App(id) {
		_classCallCheck(this, App);

		this.box = document.getElementById(id);
		this.boardsBtn = this.box.querySelector('#boardsBtn');
		this.boardsList = this.box.querySelector('#boardsList');
		this.newToDoListName = this.box.querySelector('#listName');
		this.addNewListBtn = this.box.querySelector('#addNewList');
		this.clearListName = this.box.querySelector('#clearListName');
		this.listTasksDom = _glob.cElem('.list__tasks');

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
				if (_this.newToDoListName.value.trim().length) {
					clearListName.classList.remove('d_none');
					if (e.keyCode === 13) {
						_this.addNewList();
					}
				} else {
					clearListName.classList.add('d_none');
				}
			}, false);

			this.addNewListBtn.addEventListener('click', function () {
				if (_this.newToDoListName.value.trim().length) {
					_this.addNewList();
				} else {}
			}, false);

			this.clearListName.addEventListener('click', function () {
				_this.newToDoListName.value = '';
				_this.clearListName.classList.add('d_none');
			}, false);
		}
	}, {
		key: 'addNewList',
		value: function addNewList() {
			var html = templateList({ taskName: this.newToDoListName.value });
			var listLi = this.li.cloneNode(true);
			var boardsLi = this.li.cloneNode(true);

			boardsLi.innerHTML = this.newToDoListName.value;
			boardsLi.className = 'listsName__elem';
			boardsLi.setAttribute('id', 'b' + this.index);
			this.boardsList.appendChild(boardsLi);
			listLi.className = 'listToDo';
			listLi.setAttribute('id', 'l' + this.index);
			listLi.innerHTML = html;
			this.listTasksDom.appendChild(listLi);
			var list = new _toDoList.ToDoList(this.index, this);
			if (this.boardsList.children.length) {
				this.listTasksDom.querySelector('.list__empty').style.display = 'none';
			} else {
				this.listTasksDom.querySelector('.list__empty').style.display = 'block';
			}
			this.index++;

			this.newToDoListName.value = '';
		}
	}, {
		key: 'createListElem',
		value: function createListElem(id) {}
	}, {
		key: 'removeChild',
		value: function removeChild(id) {
			this.listTasksDom.querySelector('#l' + id).remove();
			this.boardsList.querySelector('#b' + id).remove();
			if (this.boardsList.children.length) {
				this.listTasksDom.querySelector('.list__empty').style.display = 'none';
			} else {
				this.listTasksDom.querySelector('.list__empty').style.display = 'block';
			}
		}
	}]);

	return App;
}();

var header = new App('header');
console.log(header);

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

/***/ }),
/* 2 */
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
    this.priority = 1;
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
      lik.querySelector('.task_priority').value = this.priority;
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
        _this.parent.removeElement(e.currentTarget.parentNode);
      }, false);
      this.priority.addEventListener('change', function () {}, false);
    }
  }, {
    key: 'checkedElem',
    value: function checkedElem() {
      this.checkBtn.querySelector('i').classList.toggle('ion-checkmark-round');
      this.lik.classList.toggle('checked');
    }
  }]);

  return Task;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToDoList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = exports.ToDoList = function () {
  function ToDoList(id, parent) {
    _classCallCheck(this, ToDoList);

    this.parent = parent;
    this.box = document.getElementById('l' + id);
    this.nameInp = this.box.querySelector('.listToDo__name');
    this.newTaskInp = this.box.querySelector('.listToDo__newTask');
    this.addBtn = this.box.querySelector('.listToDo__add');
    this.delBtn = this.box.querySelector('.listToDo__del');
    this.listNode = this.box.querySelector('.listToDo__container');
    this.countAll = this.box.querySelector('.listToDo__allCount');
    this.countChecked = this.box.querySelector('.listToDo__chekedCount');
    this.created = this.box.querySelector('.listToDo_created');
    // -----------------------------------
    this.id = id;
    this.list = [];
    this.countTask = 0;
    this.checked = 0;
    this.created.innerHTML = new Date().toLocaleDateString('pl-pl', { year: 'numeric', month: 'short', day: 'numeric' });
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
          var Task = _this.createLik(elem.text, elem.date, elem.checked);
          _this.listNode.appendChild(Task.lik);
        });
      }
    }
  }, {
    key: 'updateCheckedTask',
    value: function updateCheckedTask() {
      var array = [].concat(_toConsumableArray(this.listNode.children)).filter(function (elem) {
        return elem.classList.contains('checked');
      });
      this.checked = array.length;
      this.countChecked.textContent = this.checked;
      this.sortList();
    }
  }, {
    key: 'sortList',
    value: function sortList() {
      var _this2 = this;

      var sortArr = [].concat(_toConsumableArray(this.listNode.children)).sort(function (a, b) {
        var AA = a.classList.contains('checked') ? 1 : 0,
            BB = b.classList.contains('checked') ? 1 : 0;
        return AA - BB;
      });
      // localStorage.setItem(this.id, JSON.stringify(this.list));
      console.log(sortArr);
      sortArr.forEach(function (e) {
        _this2.listNode.appendChild(e);
      });
    }
  }, {
    key: 'removeElement',
    value: function removeElement(elem) {
      // const toDelete = this.listNode.querySelectorAll('li');
      // console.log(id);
      // console.log(this.listNode);

      this.parent.removeChild(this.id);
    }
  }, {
    key: 'createLik',
    value: function createLik(name, dat, check) {
      var _this3 = this;

      var delBtn = document.createElement('button');
      delBtn.className = 'ion-close-round btn task__delete';
      delBtn.addEventListener('click', function (e) {
        // e.target.parentNode.remove(e.target.parentNode);
        // this.list = this.list.filter(function(elem) {
        // 	if (elem.text !== name) {
        // 		return elem;
        // 	}
        // });
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
      // let data = {
      // 	id: count,
      // 	text: name,
      // 	checked: '',
      // 	priority: 0,
      // 	date: `${day}.${month}.${year}`
      // };
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
      // this.list.push(Task.data);
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
        var task = new _task.Task(_this4.countTask, _this4.newTaskInp.value, _this4);

        // const Task = this.createLik(this.newTaskInp.value.trim());
        // this.list.push(Task.data);
        _this4.countTask++;
        _this4.countAll.innerHTML = _this4.countTask;
        localStorage.setItem(_this4.id, JSON.stringify(_this4.list));
        _this4.newTaskInp.value = '';
      }, false);
      this.delBtn.addEventListener('click', function () {
        _this4.removeElement();
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

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map