/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/global.js":
/*!**************************!*\
  !*** ./src/js/global.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Global": () => (/* binding */ Global)
/* harmony export */ });
class Global {
  constructor() {}

  createElement(elem = 'div', id = '', classList = '', html = '') {
    const e = document.createElement(elem);
    e.setAttribute('id', id);
    e.classList.add(classList);
    e.innerHTML = html;
    return e;
  }

  fInDoc(elem, all = false) {
    if (all !== false) {
      const obj = [...document.querySelectorAll(elem)];
      return obj;
    } else {
      const obj = document.querySelector(elem);
      return obj;
    }
  }

}

/***/ }),

/***/ "./src/js/task.js":
/*!************************!*\
  !*** ./src/js/task.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(id, name, parent, priority, checked) {
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.priority = priority != undefined ? priority : 1;
    this.checked = checked;
    this.lik = this.createDomElem();
    this.onInit();
  }

  onInit() {
    this.parent.domElem.listNode.appendChild(this.lik.box);
    this.initEvents();
  }

  createDomElem() {
    const templateTask = document.getElementById("task-template").innerHTML,
          likHtml = Handlebars.compile(templateTask),
          html = likHtml({
      id: this.id,
      taskName: this.name
    }),
          lik = document.createElement("li");
    lik.className = "listToDo__task";
    lik.setAttribute("id", this.id);
    lik.innerHTML = html;
    const likNode = {
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

  initEvents() {
    this.lik.checkedBtn.addEventListener("click", () => {
      this.checkedElem(this.lik, !this.checked);
      this.updateTask(true);
    }, false);
    this.lik.name.addEventListener("blur", e => {
      this.name = e.target.innerText;
      this.updateTask(false);
    }, false);
    this.lik.delBtn.addEventListener("click", e => {
      this.parent.removeTask(this.id);
    }, false);
    this.lik.priority.addEventListener("change", e => {
      this.priority = e.target.value;
      this.updateTask(true);
    }, false);
  }

  checkedElem(likNode, status) {
    const {
      box,
      name,
      checkedBtn,
      priority
    } = likNode;

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

  updateTask(sort) {
    this.parent.updateList(this, sort);
  }

}

/***/ }),

/***/ "./src/js/toDoList.js":
/*!****************************!*\
  !*** ./src/js/toDoList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToDoList": () => (/* binding */ ToDoList)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/js/task.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./src/js/global.js");


class ToDoList extends _global__WEBPACK_IMPORTED_MODULE_1__.Global {
  constructor(name, id, parent, created, updated, tasks) {
    super();
    this.id = id;
    this.parent = parent;
    this.created = created || this._getFormatDate();
    this.updated = updated || "";
    this.name = name;
    this.tasks = tasks || [];
    this.countTask = 0;
    this.countChecked = this.tasks.filter(e => e.checked).length;
    this.domElem = this.createDomElem();
    this.initEvent();
    this.initTasksList();
  }

  createDomElem() {
    const source = document.getElementById("list-template").innerHTML,
          templateList = Handlebars.compile(source),
          {
      name,
      id,
      created,
      updated,
      countTask,
      countChecked
    } = this,
          html = templateList({
      name,
      id,
      created,
      updated,
      countTask,
      countChecked
    }),
          elem = this.createElement("li", `l${id}`, "listToDo", html);
    const ListDom = {
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

  initTasksList() {
    if (!this.tasks.length) return;
    this.tasks.forEach(e => {
      this.createTask(e.id, e.name, this, e.priority, e.checked);
    });
  }

  updateLocalStorage(props) {
    this.parent.updateLocalStorage(props);
  }

  _getFormatDate(d = Date.now()) {
    const options = {
      year: "numeric",
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(d).toLocaleDateString("pl-PL", options).replace(",", "");
  }

  updateDate() {
    const currentTime = this._getFormatDate();

    this.domElem.updated.innerHTML = currentTime;
    this.updateLocalStorage({
      updated: currentTime,
      id: this.id,
      tasks: this.tasks
    });
    return currentTime;
  }

  updateCheckedTask() {
    const array = [...this.domElem.listNode.children].filter(elem => {
      return elem.classList.contains("checked");
    });
    this.countChecked = array.length;
    this.domElem.countChecked.innerHTML = this.countChecked;
  }

  sortList() {
    [...this.domElem.listNode.children].sort((a, b) => {
      const AA = a.classList.contains("checked") ? 1 : 0,
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
    }).forEach(e => this.domElem.listNode.appendChild(e));
    this.updateCheckedTask();
  }

  removeList(elem) {
    this.parent.removeChild(this.id);
  }

  removeTask(id) {
    this.domElem.listNode.querySelector(`#${id}`).remove();
    this.tasks = this.tasks.filter(e => e.id != id);
    this.updateDate();
  }

  addTask() {
    if (this.domElem.newTaskInp.value.length != 0) {
      this.createTask(`l${this.id}-${this.countTask}`, this.domElem.newTaskInp.value);
    }
  }

  createTask(id, name, parent = this, priority = 1, checked = false) {
    const task = new _task__WEBPACK_IMPORTED_MODULE_0__.Task(id, name, parent, priority, checked);
    this.countTask++;
    this.domElem.countAll.innerHTML = this.countTask;
    this.domElem.newTaskInp.value = "";
    this.updateList(task);
    this.sortList();
    this.updateDate();
  }

  updateList(task, sort) {
    const obj = {
      id: task.id,
      checked: task.checked,
      priority: task.priority,
      name: task.name
    };
    if (!this.tasks.find(e => e.id == obj.id)) this.tasks.push(obj);
    this.tasks = this.tasks.map(e => {
      return e.id == obj.id ? obj : e;
    });
    if (sort) this.sortList();
    this.updateDate();
  }

  updateName() {
    this.parent.updateListName(this.id, this.domElem.nameInp.value);
  } // ===================================================


  initEvent() {
    this.domElem.addBtn.addEventListener("click", () => {
      this.addTask();
    }, false);
    this.domElem.nameInp.addEventListener("blur", () => {
      this.updateName();
    }, false);
    this.domElem.delBtn.addEventListener("click", () => {
      this.removeList();
    }, false);
    this.domElem.newTaskInp.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this.addTask();
      }
    }, false);
  }

}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/normalize.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/normalize.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/normalize.css"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* clolors */\n :root {\n     --color1: #232730;\n     --height-header: 80px;\n     --height-footer: 40px;\n     --color2: #B1B4B5;\n     --color3: #41DB4D;\n}\n body {\n     height: 100vh;\n     background: #5c6873;\n     display: grid;\n     grid-template-rows: var(--height-header) auto var(--height-footer);\n     overflow: hidden;\n     background-size: cover;\n     font-family: \"Catamaran\", sans-serif;\n     margin: 0 auto;\n     background: #5077be;\n     background: -moz-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -webkit-gradient( left bottom, right top, color-stop(0%, #5077be), color-stop(49%, #5980c0), color-stop(50%, #4d679e), color-stop(51%, #8fcff5), color-stop(100%, #7ebde2));\n     background: -webkit-linear-gradient(45deg, #7a9cdb 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -o-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -ms-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5077be', endColorstr='#7ebde2', GradientType=1);\n     background-repeat: no-repeat;\n}\n/* GLOBAL */\n .btn {\n     position: relative;\n     font-size: 25px;\n     cursor: pointer;\n     color: #b1b4b5;\n     background-color: transparent;\n     border: none;\n     width: 40px;\n     margin: 10px;\n     height: 40px;\n     display: inline-block;\n     border-radius: 20px;\n     padding: 5px 10px;\n}\n .btn__content {\n     margin-left: 5px;\n     padding: 0;\n     text-transform: capitalize;\n     font-size: 25px;\n}\n .btn-text {\n     border: 2px solid #b1b4b5;\n     width: auto;\n}\n .lists-notype {\n     list-style-type: none;\n     padding: 0;\n}\n .row {\n     display: flex;\n}\n .d_columns {\n     flex-direction: column;\n}\n .d_none {\n     display: none;\n}\n .f_1 {\n     flex: 1 1 auto;\n}\n .f_jsa {\n     justify-content: space-around;\n}\n .input {\n     border-radius: 5px;\n     background-color: transparent;\n     border: 2px solid #b1b4b5;\n     padding: 5px 10px;\n}\n .invalid {\n     border: 2px dashed red;\n     box-shadow: 0 0 5px 1px red;\n}\n .error {\n     color: white;\n     display: inline-block;\n     margin: 5px 0;\n     padding: 5px;\n     border-radius: 5px;\n     background-color: #db4d41;\n     height: 0px;\n     overflow: hidden;\n     padding: 0;\n}\n .hide {\n     transition: all 0.3s ease-in-out;\n     height: 20px;\n     overflow: hidden;\n     padding: 5px;\n}\n/* -------------------------------------------- */\n/* HEADER */\n .page__header {\n\t   height:var(--height-header);\n     display: flex;\n     justify-content: space-around;\n     align-items: center;\n     flex-direction: row;\n     flex-wrap: wrap;\n     background-color: #232730;\n     padding: 10px;\n     color: #b1b4b5;\n     box-shadow: 0px 20px 30px -2px rgba(0, 0, 0, 0.3);\n}\n/* NAV */\n .nav__hamburger{\n     display: none;\n}\n .line {\n     width: 26px;\n     height: 2px;\n     background-color: #fff;\n     position: absolute;\n     top: 50%;\n     left: 50%;\n     transform: translate(-50%, -50%);\n}\n .line:before {\n     content: \"\";\n     position: absolute;\n     top: -5px;\n     left: 50%;\n     transform: translate(-50%, 0);\n     width: 100%;\n     height: 100%;\n     background-color: #fff;\n     transition: all 300ms ease-in-out;\n}\n .line:after {\n     content: \"\";\n     position: absolute;\n     top: 5px;\n     left: 50%;\n     transform: translate(-50%, 0);\n     width: 100%;\n     height: 100%;\n     background-color: #fff;\n     transition: all 300ms ease-in-out;\n}\n .header__nav {\n     flex: 1;\n     position: relative;\n}\n .header__btn {\n     display: inline;\n     min-width: 150px;\n}\n .header__listsName {\n     position: absolute;\n     top: 60px;\n     left: -10px;\n     height: 100%;\n     width: 190px;\n     padding: 10px 20px;\n     background-color: #232730;\n     border-bottom-right-radius: 10px;\n     transition: all 0.5s ease-in-out;\n     overflow: hidden;\n     height: auto;\n     z-index: 3;\n     max-height: 300px;\n     overflow: auto;\n}\n .h-0 {\n     height: auto;\n     left: -120px;\n     width: 0;\n}\n .listsName__elem {\n     width: 100%;\n     max-width: 300px;\n     padding: 5px 0;\n     background-color: var(--color2);\n     color:var(--color1);\n     cursor: pointer;\n     overflow: hidden;\n}\n.listsName__elem:hover{\n    background-color: var(--color3);\n}\n/* add box list */\n .header__addListBox {\n     flex: 2;\n     display: flex;\n     flex-wrap: wrap;\n     align-items: center;\n     max-width: 450px;\n}\n .addList__label {\n     flex: 1;\n     flex-wrap: wrap;\n     flex-basis: 100%;\n     margin-left: 5px;\n}\n .addList__label p {\n     margin: 2px 0;\n}\n .addList__input {\n     height: 25px;\n     color: white;\n     min-width: 300px;\n}\n .btn-add {\n     color: #41db4d;\n     font-size: 30px;\n     padding: 0;\n     margin: 0;\n}\n .btn-close {\n     color: #db4d41;\n     padding: 0;\n     margin: 0;\n}\n/* logo */\n .header__logo {\n     flex: 1;\n     text-align: center;\n}\n .header__appName {\n     margin: 0;\n     padding: 5px 0;\n     color: #5980c0;\n}\n .header__logoText {\n     margin: 0;\n     padding: 0;\n     color: #7ebde2;\n\t\t letter-spacing: 1.5px;\n\t\t \t\t\t\t\t\n}\n .page__main{\n\t\t height:calc(100vh - var(--height-footer) - var(--height-header));\n\t\t padding-top: 10px;\n     margin-top: 10px;\n}\n/* ------------------------------------------------------------ */\n .list__tasks {\n     display: flex;\n     flex-direction: row;\n     justify-content: center;\n     align-items: flex-start;\n     flex-wrap: wrap;\n     height: 100%;\n     box-sizing: border-box;\n     overflow: auto;\n     margin: 0;\n}\n .list__empty {\n     display: block;\n     font-size: 20px;\n     text-transform: uppercase;\n     color: white;\n     padding: 10px;\n     border: 1px solid white;\n     border-radius: 10px;\n     flex: 0 1 50%;\n     text-align: center;\n     align-self: center;\n     position: relative;\n     animation: bounce-in-top 1.1s both;\n}\n .list__empty::after {\n     position: absolute;\n     content: \"\";\n     background-color: rgba(0, 0, 0, 0.3);\n     top: 0;\n     left: 0;\n     width: 100%;\n     height: 100%;\n     border-radius: 10px;\n     z-index: -1;\n}\n/* --------------------------------- */\n/* ELEMENT TASK */\n .listToDo {\n     width: 350px;\n    /* background-color: #7ebde2;\n     */\n     box-shadow: 0px 10px 50px -5px rgba(0, 0, 0, 0.76);\n     padding: 10px;\n     border-radius: 10px;\n     background: #fafafa;\n     overflow: hidden;\n     margin: 10px 30px;\n     animation: bounce-in-top 1.1s both;\n}\n .listToDo__header {\n     background-color: #dee0e4;\n     margin: -10px;\n     padding: 30px 10px 10px 10px;\n     position: relative;\n     color: #dee0e4;\n     box-sizing: border-box;\n    /* width:100%;\n     */\n}\n .listToDo__name {\n     background-color: #4d679e;\n     position: absolute;\n     top: 10px;\n     width: 80%;\n     height: 25px;\n     margin: -10px;\n     box-shadow: 0px 10px 5px -20px rgba(0, 0, 0, 0.5);\n     border: none;\n     border-bottom-left-radius: 0px;\n     border-bottom-right-radius: 5px;\n     color: white;\n     text-transform: uppercase;\n}\n .listToDo__del {\n     position: absolute;\n     top: 5px;\n     right: 10px;\n     font-size: 20px;\n     color: red;\n     padding: 1px;\n     margin: 0;\n     width: 20px;\n     height: 20px;\n}\n .listToDo__add {\n     background-color: #4d679e;\n     color: white;\n     position: absolute;\n     bottom: -10px;\n     transform: translatey(50%);\n     right: 20px;\n     box-shadow: 0px 8px 20px 2px rgba(0, 0, 0, 0.3);\n}\n .listToDo__container {\n     padding: 30px 0 0 0;\n     font-size: 25px;\n    /* background-color:#6B4DF1;\n     */\n}\n .listToDo__task {\n     background-color: #ffffff;\n     border-radius: 20px;\n     font-size: 16px;\n     margin: 10px 0;\n     padding: 5px;\n     display: flex;\n     overflow: hidden;\n     justify-content: center;\n     align-items: center;\n     flex-wrap: nowrap;\n     color: #4d679e;\n     box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.3);\n     box-sizing: border-box;\n}\n .checked .task__name {\n     filter: grayscale(100%);\n     pointer-events: none;\n     text-decoration: line-through;\n}\n .checked select {\n     filter: blur(2px);\n     pointer-events: none;\n}\n .listToDo__task:hover .task__btn-dell {\n     transform: translateX(0);\n}\n .task__details {\n     height: auto;\n     padding: 5px 0;\n     display: hidden;\n}\n .listToDo__text {\n     color: #232730;\n}\n .task__btn {\n     font-size: 15px;\n     margin: 0;\n     width: 25px;\n     height: 25px;\n     padding: 0;\n}\n .task__btn-check {\n     border: 2px solid;\n     overflow: hidden;\n}\n [data-complete=\"false\"]>.task__complete {\n    /* transform:perspective(2);\n     */\n    /* transform:translateY(0px);\n     */\n     transform: rotate(55deg);\n    /* transform:skew(-20deg,30deg);\n     */\n     transform: scale(0.1);\n}\n .task__btn-dell {\n     color: red;\n     font-weight: bold;\n     transition: all 0.3s ease-in-out;\n     transform: translateX(100%);\n}\n .task__name {\n    /* max-width:100%;\n     */\n     padding: 5px;\n     flex: 2;\n     margin: 0 5px;\n     border: none;\n     line-height: 20px;\n     white-space: pre;\n     width: 240px;\n     box-sizing: border-box;\n}\n .page__footer {\n     height: var(--height-footer);\n     display: flex;\n     justify-content: center;\n     background-color: #232730;\n     padding: 10px;\n     color: #b1b4b5;\n}\n/* ---------------------------------------------- * Generated by Animista on 2018-9-20 7:26:35 * w: http://animista.net, t: @cssanimista * ---------------------------------------------- */\n/** * ---------------------------------------- * animation bounce-in-top * ---------------------------------------- */\n @-webkit-keyframes bounce-in-top {\n     0% {\n         -webkit-transform: translateY(-500px);\n         transform: translateY(-500px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n         opacity: 0;\n    }\n     38% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n         opacity: 1;\n    }\n     55% {\n         -webkit-transform: translateY(-65px);\n         transform: translateY(-65px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     72% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     81% {\n         -webkit-transform: translateY(-28px);\n         transform: translateY(-28px);\n         -webkit-animation-timing-function: ease-in;\n    }\n     90% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     95% {\n         -webkit-transform: translateY(-8px);\n         transform: translateY(-8px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     100% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n}\n @keyframes bounce-in-top {\n     0% {\n         -webkit-transform: translateY(-500px);\n         transform: translateY(-500px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n         opacity: 0;\n    }\n     38% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n         opacity: 1;\n    }\n     55% {\n         -webkit-transform: translateY(-65px);\n         transform: translateY(-65px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     72% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     81% {\n         -webkit-transform: translateY(-28px);\n         transform: translateY(-28px);\n         -webkit-animation-timing-function: ease-in;\n    }\n     90% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     95% {\n         -webkit-transform: translateY(-8px);\n         transform: translateY(-8px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     100% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n}\n @media only screen and (max-width: 650px) {\n     .header__addListBox {\n         flex: 3 3 100%;\n    }\n     .header__logo {\n         flex: 3 3 100%;\n    }\n     .header__nav, .header__addListBox {\n         position: absolute;\n         top: 0;\n         left: 0;\n         right: 0;\n         z-index: 3;\n         width: 100%;\n    }\n     .header__nav {\n         top: 180px;\n    }\n     .nav__hamburger{\n         display: block;\n         position: fixed;\n         width: 40px;\n         height: 40px;\n         background-color: transparent;\n         border:none;\n         top:25px;\n         right:10px;\n\t\t}\n\t\t.nav__hamburger.active >.line{\n\t\t\t\t\tbackground-color:transparent;\n\t\t}\n\t\t.nav__hamburger.active >.line::after{\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttransform: rotate(-45deg);\n\t\t}\n\t\t.nav__hamburger.active >.line::before{\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\ttransform: rotate(45deg);\n\t\t}\n     .nav__mobile, .header__addListBox{\n         background-color: #232730;\n         transition: all 0.5s ease-in-out;\n         transform: translate(-100%, 0);\n    }\n     .nav__mobile.active, .header__addListBox.active{\n         transform: translate(0, 0);\n    }\n     .header__addListBox {\n         justify-content: center;\n         top: 80px;\n         padding: 10px;\n         box-sizing: border-box;\n         max-width: 100%;\n    }\n     .header__btn {\n         pointer-events: none;\n    }\n     .h-0 {\n         left: 0;\n         width:100vw;\n         margin: 0;\n         top: 60px;\n         box-sizing: border-box;\n    }\n     .lists-notype .list__tasks {\n         padding: 10px;\n    }\n     .addList__input {\n         min-width: 200px;\n    }\n     .listToDo {\n         min-width: 100px;\n         max-width: 90%;\n         width:inherit;\n    }\n     .task__name{\n         min-width: 100px;\n         width:auto;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AACA,YAAY;CACX;KACI,iBAAiB;KACjB,qBAAqB;KACrB,qBAAqB;KACrB,iBAAiB;KACjB,iBAAiB;AACtB;CACC;KACI,aAAa;KACb,mBAAmB;KACnB,aAAa;KACb,kEAAkE;KAClE,gBAAgB;KAChB,sBAAsB;KACtB,oCAAoC;KACpC,cAAc;KACd,mBAAmB;KACnB,wGAAwG;KACxG,uLAAuL;KACvL,2GAA2G;KAC3G,sGAAsG;KACtG,uGAAuG;KACvG,mGAAmG;KACnG,mHAAmH;KACnH,4BAA4B;AACjC;AACA,WAAW;CACV;KACI,kBAAkB;KAClB,eAAe;KACf,eAAe;KACf,cAAc;KACd,6BAA6B;KAC7B,YAAY;KACZ,WAAW;KACX,YAAY;KACZ,YAAY;KACZ,qBAAqB;KACrB,mBAAmB;KACnB,iBAAiB;AACtB;CACC;KACI,gBAAgB;KAChB,UAAU;KACV,0BAA0B;KAC1B,eAAe;AACpB;CACC;KACI,yBAAyB;KACzB,WAAW;AAChB;CACC;KACI,qBAAqB;KACrB,UAAU;AACf;CACC;KACI,aAAa;AAClB;CACC;KACI,sBAAsB;AAC3B;CACC;KACI,aAAa;AAClB;CACC;KACI,cAAc;AACnB;CACC;KACI,6BAA6B;AAClC;CACC;KACI,kBAAkB;KAClB,6BAA6B;KAC7B,yBAAyB;KACzB,iBAAiB;AACtB;CACC;KACI,sBAAsB;KACtB,2BAA2B;AAChC;CACC;KACI,YAAY;KACZ,qBAAqB;KACrB,aAAa;KACb,YAAY;KACZ,kBAAkB;KAClB,yBAAyB;KACzB,WAAW;KACX,gBAAgB;KAChB,UAAU;AACf;CACC;KACI,gCAAgC;KAChC,YAAY;KACZ,gBAAgB;KAChB,YAAY;AACjB;AACA,iDAAiD;AACjD,WAAW;CACV;IACG,2BAA2B;KAC1B,aAAa;KACb,6BAA6B;KAC7B,mBAAmB;KACnB,mBAAmB;KACnB,eAAe;KACf,yBAAyB;KACzB,aAAa;KACb,cAAc;KACd,iDAAiD;AACtD;AACA,QAAQ;CACP;KACI,aAAa;AAClB;CACC;KACI,WAAW;KACX,WAAW;KACX,sBAAsB;KACtB,kBAAkB;KAClB,QAAQ;KACR,SAAS;KACT,gCAAgC;AACrC;CACC;KACI,WAAW;KACX,kBAAkB;KAClB,SAAS;KACT,SAAS;KACT,6BAA6B;KAC7B,WAAW;KACX,YAAY;KACZ,sBAAsB;KACtB,iCAAiC;AACtC;CACC;KACI,WAAW;KACX,kBAAkB;KAClB,QAAQ;KACR,SAAS;KACT,6BAA6B;KAC7B,WAAW;KACX,YAAY;KACZ,sBAAsB;KACtB,iCAAiC;AACtC;CACC;KACI,OAAO;KACP,kBAAkB;AACvB;CACC;KACI,eAAe;KACf,gBAAgB;AACrB;CACC;KACI,kBAAkB;KAClB,SAAS;KACT,WAAW;KACX,YAAY;KACZ,YAAY;KACZ,kBAAkB;KAClB,yBAAyB;KACzB,gCAAgC;KAChC,gCAAgC;KAChC,gBAAgB;KAChB,YAAY;KACZ,UAAU;KACV,iBAAiB;KACjB,cAAc;AACnB;CACC;KACI,YAAY;KACZ,YAAY;KACZ,QAAQ;AACb;CACC;KACI,WAAW;KACX,gBAAgB;KAChB,cAAc;KACd,+BAA+B;KAC/B,mBAAmB;KACnB,eAAe;KACf,gBAAgB;AACrB;AACA;IACI,+BAA+B;AACnC;AACA,iBAAiB;CAChB;KACI,OAAO;KACP,aAAa;KACb,eAAe;KACf,mBAAmB;KACnB,gBAAgB;AACrB;CACC;KACI,OAAO;KACP,eAAe;KACf,gBAAgB;KAChB,gBAAgB;AACrB;CACC;KACI,aAAa;AAClB;CACC;KACI,YAAY;KACZ,YAAY;KACZ,gBAAgB;AACrB;CACC;KACI,cAAc;KACd,eAAe;KACf,UAAU;KACV,SAAS;AACd;CACC;KACI,cAAc;KACd,UAAU;KACV,SAAS;AACd;AACA,SAAS;CACR;KACI,OAAO;KACP,kBAAkB;AACvB;CACC;KACI,SAAS;KACT,cAAc;KACd,cAAc;AACnB;CACC;KACI,SAAS;KACT,UAAU;KACV,cAAc;GAChB,qBAAqB;;AAExB;CACC;GACE,gEAAgE;GAChE,iBAAiB;KACf,gBAAgB;AACrB;AACA,iEAAiE;CAChE;KACI,aAAa;KACb,mBAAmB;KACnB,uBAAuB;KACvB,uBAAuB;KACvB,eAAe;KACf,YAAY;KACZ,sBAAsB;KACtB,cAAc;KACd,SAAS;AACd;CACC;KACI,cAAc;KACd,eAAe;KACf,yBAAyB;KACzB,YAAY;KACZ,aAAa;KACb,uBAAuB;KACvB,mBAAmB;KACnB,aAAa;KACb,kBAAkB;KAClB,kBAAkB;KAClB,kBAAkB;KAClB,kCAAkC;AACvC;CACC;KACI,kBAAkB;KAClB,WAAW;KACX,oCAAoC;KACpC,MAAM;KACN,OAAO;KACP,WAAW;KACX,YAAY;KACZ,mBAAmB;KACnB,WAAW;AAChB;AACA,sCAAsC;AACtC,iBAAiB;CAChB;KACI,YAAY;IACb;MACE;KACD,kDAAkD;KAClD,aAAa;KACb,mBAAmB;KACnB,mBAAmB;KACnB,gBAAgB;KAChB,iBAAiB;KACjB,kCAAkC;AACvC;CACC;KACI,yBAAyB;KACzB,aAAa;KACb,4BAA4B;KAC5B,kBAAkB;KAClB,cAAc;KACd,sBAAsB;IACvB;MACE;AACN;CACC;KACI,yBAAyB;KACzB,kBAAkB;KAClB,SAAS;KACT,UAAU;KACV,YAAY;KACZ,aAAa;KACb,iDAAiD;KACjD,YAAY;KACZ,8BAA8B;KAC9B,+BAA+B;KAC/B,YAAY;KACZ,yBAAyB;AAC9B;CACC;KACI,kBAAkB;KAClB,QAAQ;KACR,WAAW;KACX,eAAe;KACf,UAAU;KACV,YAAY;KACZ,SAAS;KACT,WAAW;KACX,YAAY;AACjB;CACC;KACI,yBAAyB;KACzB,YAAY;KACZ,kBAAkB;KAClB,aAAa;KACb,0BAA0B;KAC1B,WAAW;KACX,+CAA+C;AACpD;CACC;KACI,mBAAmB;KACnB,eAAe;IAChB;MACE;AACN;CACC;KACI,yBAAyB;KACzB,mBAAmB;KACnB,eAAe;KACf,cAAc;KACd,YAAY;KACZ,aAAa;KACb,gBAAgB;KAChB,uBAAuB;KACvB,mBAAmB;KACnB,iBAAiB;KACjB,cAAc;KACd,gDAAgD;KAChD,sBAAsB;AAC3B;CACC;KACI,uBAAuB;KACvB,oBAAoB;KACpB,6BAA6B;AAClC;CACC;KACI,iBAAiB;KACjB,oBAAoB;AACzB;CACC;KACI,wBAAwB;AAC7B;CACC;KACI,YAAY;KACZ,cAAc;KACd,eAAe;AACpB;CACC;KACI,cAAc;AACnB;CACC;KACI,eAAe;KACf,SAAS;KACT,WAAW;KACX,YAAY;KACZ,UAAU;AACf;CACC;KACI,iBAAiB;KACjB,gBAAgB;AACrB;CACC;IACG;MACE;IACF;MACE;KACD,wBAAwB;IACzB;MACE;KACD,qBAAqB;AAC1B;CACC;KACI,UAAU;KACV,iBAAiB;KACjB,gCAAgC;KAChC,2BAA2B;AAChC;CACC;IACG;MACE;KACD,YAAY;KACZ,OAAO;KACP,aAAa;KACb,YAAY;KACZ,iBAAiB;KACjB,gBAAgB;KAChB,YAAY;KACZ,sBAAsB;AAC3B;CACC;KACI,4BAA4B;KAC5B,aAAa;KACb,uBAAuB;KACvB,yBAAyB;KACzB,aAAa;KACb,cAAc;AACnB;AACA,2LAA2L;AAC3L,qHAAqH;CACpH;KACI;SACI,qCAAqC;SACrC,6BAA6B;SAC7B,0CAA0C;SAC1C,kCAAkC;SAClC,UAAU;IACf;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;SACnC,UAAU;IACf;KACC;SACI,oCAAoC;SACpC,4BAA4B;SAC5B,0CAA0C;SAC1C,kCAAkC;IACvC;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;KACC;SACI,oCAAoC;SACpC,4BAA4B;SAC5B,0CAA0C;IAC/C;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;KACC;SACI,mCAAmC;SACnC,2BAA2B;SAC3B,0CAA0C;SAC1C,kCAAkC;IACvC;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;AACJ;CACC;KACI;SACI,qCAAqC;SACrC,6BAA6B;SAC7B,0CAA0C;SAC1C,kCAAkC;SAClC,UAAU;IACf;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;SACnC,UAAU;IACf;KACC;SACI,oCAAoC;SACpC,4BAA4B;SAC5B,0CAA0C;SAC1C,kCAAkC;IACvC;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;KACC;SACI,oCAAoC;SACpC,4BAA4B;SAC5B,0CAA0C;IAC/C;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;KACC;SACI,mCAAmC;SACnC,2BAA2B;SAC3B,0CAA0C;SAC1C,kCAAkC;IACvC;KACC;SACI,gCAAgC;SAChC,wBAAwB;SACxB,2CAA2C;SAC3C,mCAAmC;IACxC;AACJ;CACC;KACI;SACI,cAAc;IACnB;KACC;SACI,cAAc;IACnB;KACC;SACI,kBAAkB;SAClB,MAAM;SACN,OAAO;SACP,QAAQ;SACR,UAAU;SACV,WAAW;IAChB;KACC;SACI,UAAU;IACf;KACC;SACI,cAAc;SACd,eAAe;SACf,WAAW;SACX,YAAY;SACZ,6BAA6B;SAC7B,WAAW;SACX,QAAQ;SACR,UAAU;EACjB;EACA;KACG,4BAA4B;EAC/B;EACA;KACG,MAAM;KACN,OAAO;KACP,yBAAyB;EAC5B;EACA;IACE,MAAM;IACN,OAAO;IACP,wBAAwB;EAC1B;KACG;SACI,yBAAyB;SACzB,gCAAgC;SAChC,8BAA8B;IACnC;KACC;SACI,0BAA0B;IAC/B;KACC;SACI,uBAAuB;SACvB,SAAS;SACT,aAAa;SACb,sBAAsB;SACtB,eAAe;IACpB;KACC;SACI,oBAAoB;IACzB;KACC;SACI,OAAO;SACP,WAAW;SACX,SAAS;SACT,SAAS;SACT,sBAAsB;IAC3B;KACC;SACI,aAAa;IAClB;KACC;SACI,gBAAgB;IACrB;KACC;SACI,gBAAgB;SAChB,cAAc;SACd,aAAa;IAClB;KACC;SACI,gBAAgB;SAChB,UAAU;IACf;AACJ","sourcesContent":["@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);\n/* clolors */\n :root {\n     --color1: #232730;\n     --height-header: 80px;\n     --height-footer: 40px;\n     --color2: #B1B4B5;\n     --color3: #41DB4D;\n}\n body {\n     height: 100vh;\n     background: #5c6873;\n     display: grid;\n     grid-template-rows: var(--height-header) auto var(--height-footer);\n     overflow: hidden;\n     background-size: cover;\n     font-family: \"Catamaran\", sans-serif;\n     margin: 0 auto;\n     background: #5077be;\n     background: -moz-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -webkit-gradient( left bottom, right top, color-stop(0%, #5077be), color-stop(49%, #5980c0), color-stop(50%, #4d679e), color-stop(51%, #8fcff5), color-stop(100%, #7ebde2));\n     background: -webkit-linear-gradient(45deg, #7a9cdb 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -o-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: -ms-linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     background: linear-gradient(45deg, #5077be 0%, #5980c0 49%, #4d679e 50%, #8fcff5 51%, #7ebde2 100%);\n     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5077be', endColorstr='#7ebde2', GradientType=1);\n     background-repeat: no-repeat;\n}\n/* GLOBAL */\n .btn {\n     position: relative;\n     font-size: 25px;\n     cursor: pointer;\n     color: #b1b4b5;\n     background-color: transparent;\n     border: none;\n     width: 40px;\n     margin: 10px;\n     height: 40px;\n     display: inline-block;\n     border-radius: 20px;\n     padding: 5px 10px;\n}\n .btn__content {\n     margin-left: 5px;\n     padding: 0;\n     text-transform: capitalize;\n     font-size: 25px;\n}\n .btn-text {\n     border: 2px solid #b1b4b5;\n     width: auto;\n}\n .lists-notype {\n     list-style-type: none;\n     padding: 0;\n}\n .row {\n     display: flex;\n}\n .d_columns {\n     flex-direction: column;\n}\n .d_none {\n     display: none;\n}\n .f_1 {\n     flex: 1 1 auto;\n}\n .f_jsa {\n     justify-content: space-around;\n}\n .input {\n     border-radius: 5px;\n     background-color: transparent;\n     border: 2px solid #b1b4b5;\n     padding: 5px 10px;\n}\n .invalid {\n     border: 2px dashed red;\n     box-shadow: 0 0 5px 1px red;\n}\n .error {\n     color: white;\n     display: inline-block;\n     margin: 5px 0;\n     padding: 5px;\n     border-radius: 5px;\n     background-color: #db4d41;\n     height: 0px;\n     overflow: hidden;\n     padding: 0;\n}\n .hide {\n     transition: all 0.3s ease-in-out;\n     height: 20px;\n     overflow: hidden;\n     padding: 5px;\n}\n/* -------------------------------------------- */\n/* HEADER */\n .page__header {\n\t   height:var(--height-header);\n     display: flex;\n     justify-content: space-around;\n     align-items: center;\n     flex-direction: row;\n     flex-wrap: wrap;\n     background-color: #232730;\n     padding: 10px;\n     color: #b1b4b5;\n     box-shadow: 0px 20px 30px -2px rgba(0, 0, 0, 0.3);\n}\n/* NAV */\n .nav__hamburger{\n     display: none;\n}\n .line {\n     width: 26px;\n     height: 2px;\n     background-color: #fff;\n     position: absolute;\n     top: 50%;\n     left: 50%;\n     transform: translate(-50%, -50%);\n}\n .line:before {\n     content: \"\";\n     position: absolute;\n     top: -5px;\n     left: 50%;\n     transform: translate(-50%, 0);\n     width: 100%;\n     height: 100%;\n     background-color: #fff;\n     transition: all 300ms ease-in-out;\n}\n .line:after {\n     content: \"\";\n     position: absolute;\n     top: 5px;\n     left: 50%;\n     transform: translate(-50%, 0);\n     width: 100%;\n     height: 100%;\n     background-color: #fff;\n     transition: all 300ms ease-in-out;\n}\n .header__nav {\n     flex: 1;\n     position: relative;\n}\n .header__btn {\n     display: inline;\n     min-width: 150px;\n}\n .header__listsName {\n     position: absolute;\n     top: 60px;\n     left: -10px;\n     height: 100%;\n     width: 190px;\n     padding: 10px 20px;\n     background-color: #232730;\n     border-bottom-right-radius: 10px;\n     transition: all 0.5s ease-in-out;\n     overflow: hidden;\n     height: auto;\n     z-index: 3;\n     max-height: 300px;\n     overflow: auto;\n}\n .h-0 {\n     height: auto;\n     left: -120px;\n     width: 0;\n}\n .listsName__elem {\n     width: 100%;\n     max-width: 300px;\n     padding: 5px 0;\n     background-color: var(--color2);\n     color:var(--color1);\n     cursor: pointer;\n     overflow: hidden;\n}\n.listsName__elem:hover{\n    background-color: var(--color3);\n}\n/* add box list */\n .header__addListBox {\n     flex: 2;\n     display: flex;\n     flex-wrap: wrap;\n     align-items: center;\n     max-width: 450px;\n}\n .addList__label {\n     flex: 1;\n     flex-wrap: wrap;\n     flex-basis: 100%;\n     margin-left: 5px;\n}\n .addList__label p {\n     margin: 2px 0;\n}\n .addList__input {\n     height: 25px;\n     color: white;\n     min-width: 300px;\n}\n .btn-add {\n     color: #41db4d;\n     font-size: 30px;\n     padding: 0;\n     margin: 0;\n}\n .btn-close {\n     color: #db4d41;\n     padding: 0;\n     margin: 0;\n}\n/* logo */\n .header__logo {\n     flex: 1;\n     text-align: center;\n}\n .header__appName {\n     margin: 0;\n     padding: 5px 0;\n     color: #5980c0;\n}\n .header__logoText {\n     margin: 0;\n     padding: 0;\n     color: #7ebde2;\n\t\t letter-spacing: 1.5px;\n\t\t \t\t\t\t\t\n}\n .page__main{\n\t\t height:calc(100vh - var(--height-footer) - var(--height-header));\n\t\t padding-top: 10px;\n     margin-top: 10px;\n}\n/* ------------------------------------------------------------ */\n .list__tasks {\n     display: flex;\n     flex-direction: row;\n     justify-content: center;\n     align-items: flex-start;\n     flex-wrap: wrap;\n     height: 100%;\n     box-sizing: border-box;\n     overflow: auto;\n     margin: 0;\n}\n .list__empty {\n     display: block;\n     font-size: 20px;\n     text-transform: uppercase;\n     color: white;\n     padding: 10px;\n     border: 1px solid white;\n     border-radius: 10px;\n     flex: 0 1 50%;\n     text-align: center;\n     align-self: center;\n     position: relative;\n     animation: bounce-in-top 1.1s both;\n}\n .list__empty::after {\n     position: absolute;\n     content: \"\";\n     background-color: rgba(0, 0, 0, 0.3);\n     top: 0;\n     left: 0;\n     width: 100%;\n     height: 100%;\n     border-radius: 10px;\n     z-index: -1;\n}\n/* --------------------------------- */\n/* ELEMENT TASK */\n .listToDo {\n     width: 350px;\n    /* background-color: #7ebde2;\n     */\n     box-shadow: 0px 10px 50px -5px rgba(0, 0, 0, 0.76);\n     padding: 10px;\n     border-radius: 10px;\n     background: #fafafa;\n     overflow: hidden;\n     margin: 10px 30px;\n     animation: bounce-in-top 1.1s both;\n}\n .listToDo__header {\n     background-color: #dee0e4;\n     margin: -10px;\n     padding: 30px 10px 10px 10px;\n     position: relative;\n     color: #dee0e4;\n     box-sizing: border-box;\n    /* width:100%;\n     */\n}\n .listToDo__name {\n     background-color: #4d679e;\n     position: absolute;\n     top: 10px;\n     width: 80%;\n     height: 25px;\n     margin: -10px;\n     box-shadow: 0px 10px 5px -20px rgba(0, 0, 0, 0.5);\n     border: none;\n     border-bottom-left-radius: 0px;\n     border-bottom-right-radius: 5px;\n     color: white;\n     text-transform: uppercase;\n}\n .listToDo__del {\n     position: absolute;\n     top: 5px;\n     right: 10px;\n     font-size: 20px;\n     color: red;\n     padding: 1px;\n     margin: 0;\n     width: 20px;\n     height: 20px;\n}\n .listToDo__add {\n     background-color: #4d679e;\n     color: white;\n     position: absolute;\n     bottom: -10px;\n     transform: translatey(50%);\n     right: 20px;\n     box-shadow: 0px 8px 20px 2px rgba(0, 0, 0, 0.3);\n}\n .listToDo__container {\n     padding: 30px 0 0 0;\n     font-size: 25px;\n    /* background-color:#6B4DF1;\n     */\n}\n .listToDo__task {\n     background-color: #ffffff;\n     border-radius: 20px;\n     font-size: 16px;\n     margin: 10px 0;\n     padding: 5px;\n     display: flex;\n     overflow: hidden;\n     justify-content: center;\n     align-items: center;\n     flex-wrap: nowrap;\n     color: #4d679e;\n     box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.3);\n     box-sizing: border-box;\n}\n .checked .task__name {\n     filter: grayscale(100%);\n     pointer-events: none;\n     text-decoration: line-through;\n}\n .checked select {\n     filter: blur(2px);\n     pointer-events: none;\n}\n .listToDo__task:hover .task__btn-dell {\n     transform: translateX(0);\n}\n .task__details {\n     height: auto;\n     padding: 5px 0;\n     display: hidden;\n}\n .listToDo__text {\n     color: #232730;\n}\n .task__btn {\n     font-size: 15px;\n     margin: 0;\n     width: 25px;\n     height: 25px;\n     padding: 0;\n}\n .task__btn-check {\n     border: 2px solid;\n     overflow: hidden;\n}\n [data-complete=\"false\"]>.task__complete {\n    /* transform:perspective(2);\n     */\n    /* transform:translateY(0px);\n     */\n     transform: rotate(55deg);\n    /* transform:skew(-20deg,30deg);\n     */\n     transform: scale(0.1);\n}\n .task__btn-dell {\n     color: red;\n     font-weight: bold;\n     transition: all 0.3s ease-in-out;\n     transform: translateX(100%);\n}\n .task__name {\n    /* max-width:100%;\n     */\n     padding: 5px;\n     flex: 2;\n     margin: 0 5px;\n     border: none;\n     line-height: 20px;\n     white-space: pre;\n     width: 240px;\n     box-sizing: border-box;\n}\n .page__footer {\n     height: var(--height-footer);\n     display: flex;\n     justify-content: center;\n     background-color: #232730;\n     padding: 10px;\n     color: #b1b4b5;\n}\n/* ---------------------------------------------- * Generated by Animista on 2018-9-20 7:26:35 * w: http://animista.net, t: @cssanimista * ---------------------------------------------- */\n/** * ---------------------------------------- * animation bounce-in-top * ---------------------------------------- */\n @-webkit-keyframes bounce-in-top {\n     0% {\n         -webkit-transform: translateY(-500px);\n         transform: translateY(-500px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n         opacity: 0;\n    }\n     38% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n         opacity: 1;\n    }\n     55% {\n         -webkit-transform: translateY(-65px);\n         transform: translateY(-65px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     72% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     81% {\n         -webkit-transform: translateY(-28px);\n         transform: translateY(-28px);\n         -webkit-animation-timing-function: ease-in;\n    }\n     90% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     95% {\n         -webkit-transform: translateY(-8px);\n         transform: translateY(-8px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     100% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n}\n @keyframes bounce-in-top {\n     0% {\n         -webkit-transform: translateY(-500px);\n         transform: translateY(-500px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n         opacity: 0;\n    }\n     38% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n         opacity: 1;\n    }\n     55% {\n         -webkit-transform: translateY(-65px);\n         transform: translateY(-65px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     72% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     81% {\n         -webkit-transform: translateY(-28px);\n         transform: translateY(-28px);\n         -webkit-animation-timing-function: ease-in;\n    }\n     90% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n     95% {\n         -webkit-transform: translateY(-8px);\n         transform: translateY(-8px);\n         -webkit-animation-timing-function: ease-in;\n         animation-timing-function: ease-in;\n    }\n     100% {\n         -webkit-transform: translateY(0);\n         transform: translateY(0);\n         -webkit-animation-timing-function: ease-out;\n         animation-timing-function: ease-out;\n    }\n}\n @media only screen and (max-width: 650px) {\n     .header__addListBox {\n         flex: 3 3 100%;\n    }\n     .header__logo {\n         flex: 3 3 100%;\n    }\n     .header__nav, .header__addListBox {\n         position: absolute;\n         top: 0;\n         left: 0;\n         right: 0;\n         z-index: 3;\n         width: 100%;\n    }\n     .header__nav {\n         top: 180px;\n    }\n     .nav__hamburger{\n         display: block;\n         position: fixed;\n         width: 40px;\n         height: 40px;\n         background-color: transparent;\n         border:none;\n         top:25px;\n         right:10px;\n\t\t}\n\t\t.nav__hamburger.active >.line{\n\t\t\t\t\tbackground-color:transparent;\n\t\t}\n\t\t.nav__hamburger.active >.line::after{\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttransform: rotate(-45deg);\n\t\t}\n\t\t.nav__hamburger.active >.line::before{\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\ttransform: rotate(45deg);\n\t\t}\n     .nav__mobile, .header__addListBox{\n         background-color: #232730;\n         transition: all 0.5s ease-in-out;\n         transform: translate(-100%, 0);\n    }\n     .nav__mobile.active, .header__addListBox.active{\n         transform: translate(0, 0);\n    }\n     .header__addListBox {\n         justify-content: center;\n         top: 80px;\n         padding: 10px;\n         box-sizing: border-box;\n         max-width: 100%;\n    }\n     .header__btn {\n         pointer-events: none;\n    }\n     .h-0 {\n         left: 0;\n         width:100vw;\n         margin: 0;\n         top: 60px;\n         box-sizing: border-box;\n    }\n     .lists-notype .list__tasks {\n         padding: 10px;\n    }\n     .addList__input {\n         min-width: 200px;\n    }\n     .listToDo {\n         min-width: 100px;\n         max-width: 90%;\n         width:inherit;\n    }\n     .task__name{\n         min-width: 100px;\n         width:auto;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<title>ToDo Lists</title>\n\t\t<meta charset=\"utf-8\" />\n\t\t<!-- RWD-->\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\" />\n\t\t<link href=\"https://fonts.googleapis.com/css?family=Catamaran\" rel=\"stylesheet\" />\n\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js\"></script>\n\t\t<link rel=\"manifest\" href=\"./manifest.json\" /> \n\t\t\n\t</head>\n\n\t<body>\n\t\t<!-- header -->\n\t\t<header class=\"page__header\" id=\"header\">\n\t\t\t<!-- dashbord -->\n\t\t\t<nav class=\"header__nav\">\n\t\t\t\t<button class=\"nav__hamburger\" id=\"menuBtn\">\n\t\t\t\t\t<span class=\"line\"></span>\n\t\t\t\t</button>\n\t\t\t\t<div class=\"nav__mobile\">\n\t\t\t\t\t<button id=\"boardsBtn\" type=\"button\" class=\"btn btn-text header__btn ion-ios-paper\">\n\t\t\t\t\t\t<span class=\"btn__content\">boards</span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<ul id=\"boardsList\" class=\"lists-notype header__listsName h-0\"></ul>\n\t\t\t\t</div>\n\t\t\t</nav>\n\t\t\t<!-- addList -->\n\n\t\t\t<div class=\"header__addListBox\">\n\t\t\t\t<label for=\"addList\" class=\"addList__label\">\n\t\t\t\t\t<p>Add new list</p>\n\t\t\t\t\t<p class=\"error\" aria-live=\"polite\">Pole wymagane, nie może zaczynać się od znaków specjalnych</p>\n\t\t\t\t</label>\n\t\t\t\t<input\n\t\t\t\t\tid=\"listName\"\n\t\t\t\t\tclass=\"input addList__input\"\n\t\t\t\t\tid=\"addList\"\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\tplaceholder=\"Name list\"\n\t\t\t\t\trequired\n\t\t\t\t\tmaxlength=\"50\"\n\t\t\t\t/>\n\t\t\t\t<button\n\t\t\t\t\tid=\"addNewList\"\n\t\t\t\t\tclass=\"btn btn-add ion-plus-round\"\n\t\t\t\t\ttype=\"button\"\n\t\t\t\t\ttitle=\"Add new list\"\n\t\t\t\t\tid=\"btnAddList\"\n\t\t\t\t></button>\n\t\t\t\t<button\n\t\t\t\t\tid=\"clearListName\"\n\t\t\t\t\tclass=\"btn btn-close ion-close-round d_none\"\n\t\t\t\t\ttype=\"button\"\n\t\t\t\t\tid=\"btnCancelAList\"\n\t\t\t\t></button>\n\t\t\t</div>\n\n\t\t\t<div class=\"header__logo\">\n\t\t\t\t<h1 class=\"header__appName\">ToDo List vanilla.js</h1>\n\t\t\t\t<p class=\"header__logoText\">with localStorage</p>\n\t\t\t</div>\n\t\t</header>\n\t\t<main class=\"page__main\">\n\t\t\t<!-- lists with todoList -->\n\t\t\t<ul class=\"lists-notype list__tasks\">\n\t\t\t\t<!-- one list -->\n\t\t\t\t<li class=\"list__empty\">List is empty</li>\n\t\t\t</ul>\n\t\t</main>\n\t\t<footer class=\"page__footer\">\n\t\t\t<small>Michał Maleszewski 2018</small>\n\t\t</footer>\n\n\t\t<script id=\"list-template\" type=\"text/x-handlebars-template\">\n\t\t\t<!-- header list -->\n\t\t\t<div class='listToDo__header'>\n\t\t\t\t<input class='input listToDo__name' type='text' name='listName' value='{{name}}' required />\n\t\t\t\t<!-- count task -->\n\t\t\t\t<button class='btn listToDo__del' title='delete list'>\n\t\t\t\t\t<i class='ion-close-round'></i>\n\t\t\t\t</button>\n\t\t\t\t<div class='row f_jsa'>\n\t\t\t\t\t<div class='row d_columns'>\n\t\t\t\t\t\t<p class='listToDo__text f_1'>all task\n\t\t\t\t\t\t\t<b class='listToDo__allCount'>{{countTask}}</b>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class='listToDo__text f_1'>checked task\n\t\t\t\t\t\t\t<b class='listToDo__chekedCount'>{{countChecked}}</b>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class='row d_columns'>\n\t\t\t\t\t\t<p class='listToDo__text f_1'>Created:\n\t\t\t\t\t\t\t<b class='listToDo_created'>{{created}}</b>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class='listToDo__text f_1'>Last Update:\n\t\t\t\t\t\t\t<b class='listToDo_updated'>{{updated}}</b>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- new task -->\n\t\t\t\t<input class='input listToDo__newTask' type='text' placeholder='add your task' />\n\t\t\t\t<button class='ion-plus-round btn listToDo__add' title='button add item'></button>\n\t\t\t</div>\n\t\t\t<!-- Tasks list -->\n\t\t\t<ul class='lists-notype listToDo__container'>\n\t\t\t</ul>\n\t\t</script>\n\n\t\t<script id=\"task-template\" type=\"text/x-handlebars-template\">\n\t\t\t<button class=\"btn task__btn task__btn-check\" title=\"check item\" data-complete=false>\n\t\t\t  <i class=\" task__complete\">\n\t\t\t  </i>\n\t\t\t</button>\n\t\t\t<div class=\"row f_1\">\n\n\t\t\t  <div contenteditable=\"true\" aria-multiline=\"true\" class=\"task__name\" >{{taskName}}</div contenteditable=\"true\">\n\t\t\t  <div class=\"row f_jsa task__details d_columns\">\n\t\t\t    <div class=\"row d_columns\">\n\t\t\t      <small for=\"priority-select\">Priority:</small>\n\t\t\t      <select class=\"task_priority\" >\n\t\t\t        <option value=1>1</option>\n\t\t\t        <option value=2>2</option>\n\t\t\t        <option value=3>3</option>\n\t\t\t        <option value=4>4</option>\n\t\t\t        <option value=5>5</option>\n\t\t\t      </select>\n\t\t\t    </div>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t\t<button class=\"btn task__btn task__btn-dell\" title=\"button add item\">\n\t\t\t  <i class=\"ion-close-round\"></i>\n\t\t\t</button>\n\t\t</script>\n\t\t<script>\n\t\t\tif('serviceWorker'in navigator){\n\t\t\t\twindow.addEventListener('load',()=>{\n\t\t\t\t\tnavigator.serviceWorker.register('./sw.js')\n\t\t\t\t})\n\t\t\t}\n\t\t</script>\n\t</body>\n</html>\n");

/***/ }),

/***/ "./src/css/normalize.css":
/*!*******************************!*\
  !*** ./src/css/normalize.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/js/global.js");
/* harmony import */ var _toDoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDoList */ "./src/js/toDoList.js");
/* harmony import */ var _css_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/normalize.css */ "./src/css/normalize.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/style.css */ "./src/css/style.css");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index.html */ "./src/index.html");




 // import  "./sw.js"
// navigator.serviceWorker.register("./sw.js")

class App extends _global__WEBPACK_IMPORTED_MODULE_0__.Global {
  constructor(id) {
    super();
    this.box = document.getElementById(id);
    this.boardsBtn = this.box.querySelector('#boardsBtn');
    this.menuBtn = this.box.querySelector('#menuBtn');
    this.boardsList = this.box.querySelector('#boardsList');
    this.newToDoListName = this.box.querySelector('#listName');
    this.addNewListBtn = this.box.querySelector('#addNewList');
    this.clearListName = this.box.querySelector('#clearListName');
    this.listTasksDom = this.fInDoc('.list__tasks');
    this.listArray = [];
    this.index = 0;
    this.initEvents();
    this.initLocalSrtorage();
  }

  initLocalSrtorage() {
    const local = JSON.parse(localStorage.getItem('app'));

    if (local === null) {
      localStorage.setItem('app', JSON.stringify([]));
      this.index = 1;
    } else {
      this.listArray = JSON.parse(localStorage.getItem('app'));
      this.index = Math.max.apply(Math, this.listArray.map(o => o.id)) + 1;
      this.listArray.forEach((elem, index) => {
        const {
          name,
          id,
          created,
          updated,
          tasks
        } = elem;
        this.createDomLik(name, id, created, updated, tasks);
      });

      this._checkListLength();
    }
  }

  saveInLocalStorage() {
    localStorage.setItem('app', JSON.stringify(this.listArray));

    this._checkListLength();
  }

  _mobileMenu() {
    const menu = document.querySelector('.nav__mobile'),
          addListBox = document.querySelector('.header__addListBox');
    menu.classList.toggle('active');
    addListBox.classList.toggle('active');
    this.menuBtn.classList.toggle('active');
  }

  initEvents() {
    this.boardsBtn.addEventListener('click', () => {
      if (!this.boardsList.children.length) return;
      this.boardsList.classList.toggle('h-0');
    }, false);
    this.menuBtn.addEventListener('click', () => {
      this._mobileMenu();
    }, false);
    this.newToDoListName.addEventListener('keyup', e => {
      if (this._checkName()) {
        clearListName.classList.remove('d_none');

        if (e.keyCode === 13) {
          this.addNewList();
        }
      } else {
        clearListName.classList.add('d_none');
      }
    }, false);
    this.addNewListBtn.addEventListener('click', () => {
      this._checkName() ? this.addNewList() : false;
    }, false);
    this.clearListName.addEventListener('click', () => {
      this.newToDoListName.value = '';
      this.clearListName.classList.add('d_none');
    }, false);
  }

  _checkName() {
    if (!this.newToDoListName.validity.valid) {
      this.box.querySelector('.error').classList.add('hide');
    } else {
      this.box.querySelector('.error').classList.remove('hide');
    }

    return this.newToDoListName.value.trim().length;
  }

  updateListName(id, name) {
    this.boardsList.querySelector(`#b${id}`).innerHTML = name;
    this.updateLocalStorage({
      name,
      id
    });
  }

  createDomLik(name, id, created, updated, tasks) {
    const boardsLi = this.createElement('button', `b${id}`, 'listsName__elem', name);
    this.boardsList.appendChild(boardsLi);
    boardsLi.addEventListener('click', () => {
      const target = this.listTasksDom.querySelector(`#l${id}`);
      this.listTasksDom.scrollTo(0, target.offsetTop - 110);
    });
    const list = new _toDoList__WEBPACK_IMPORTED_MODULE_1__.ToDoList(name, id, this, created, updated, tasks);
    this.listTasksDom.appendChild(list.domElem.box);
    return list;
  }

  _checkListLength() {
    if (this.boardsList.children.length) {
      this.listTasksDom.querySelector('.list__empty').style.display = 'none';
    } else {
      this.listTasksDom.querySelector('.list__empty').style.display = 'block';
    }
  }

  updateLocalStorage(props) {
    const {
      id,
      name,
      created,
      updated,
      tasks
    } = props;
    this.listArray.map(e => {
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

  addNewList() {
    const list = this.createDomLik(this.newToDoListName.value.trim(), this.index, '', '');
    this.index++;
    this.newToDoListName.value = '';
    this.newToDoListName.focus();
    this.newToDoListName.select();
    clearListName.classList.add('d_none');
    const {
      id,
      name,
      created,
      updated,
      tasks
    } = list;
    this.listArray.push({
      id,
      name,
      created,
      updated,
      tasks
    });
    this.saveInLocalStorage();
  }

  removeChild(id) {
    this.listTasksDom.querySelector(`#l${id}`).remove();
    this.boardsList.querySelector(`#b${id}`).remove();
    this.listArray = this.listArray.filter(e => {
      return e.id != id;
    });
    this.saveInLocalStorage();
  }

}

const header = new App('header');
})();

/******/ })()
;
//# sourceMappingURL=main.e615619fad805d63b16b.js.map