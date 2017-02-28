/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const parseField = field =>
  field.map(item => item.split('').map(symbol => symbol === '#'));
/* unused harmony export parseField */


const makeBlinker = () => {
  const field = [
    '.....',
    '.....',
    '.###.',
    '.....',
    '.....'];
  return parseField(field);
};
/* unused harmony export makeBlinker */


const makePulsar = () => {
  const field = [
    '.................',
    '.................',
    '....###...###....',
    '.................',
    '..#....#.#....#..',
    '..#....#.#....#..',
    '..#....#.#....#..',
    '....###...###....',
    '.................',
    '....###...###....',
    '..#....#.#....#..',
    '..#....#.#....#..',
    '..#....#.#....#..',
    '.................',
    '....###...###....',
    '.................',
    '.................'];
  return parseField(field);
};
/* unused harmony export makePulsar */


const makeGosperGliderGun = () => {
  const field = [
    '......................................',
    '.........................#............',
    '.......................#.#............',
    '.............##......##............##.',
    '............#...#....##............##.',
    '.##........#.....#...##...............',
    '.##........#...#.##....#.#............',
    '...........#.....#.......#............',
    '............#...#.....................',
    '.............##.......................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................',
    '......................................'];
  return parseField(field);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = makeGosperGliderGun;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const collectCells = (field, x, y) => {
  if (x >= field[0].length || y >= field.length) {
    return [];
  }
  return field.reduce((acc, line, curY) =>
  line.reduce((curAcc, cell, curX) => {
    if (curX === x && curY === y) {
      return acc;
    } else if ((curX <= x + 1 && curX >= x - 1) && (curY <= y + 1 && curY >= y - 1)) {
      acc.push(cell);
      return acc;
    }
    return acc;
  }, acc), []);
};
/* unused harmony export collectCells */



const step = (field) => {
  const changeCell = (cell, x, y) => {
    const liveNeighbors = collectCells(field, x, y).filter(item => item).length;
    const mustDie = (liveNeighbors < 2) || (liveNeighbors > 3);
    const spawning = !cell && (liveNeighbors === 3);
    return spawning || (cell && !mustDie);
  };
  const newField = field.map((line, y) => line.map((cell, x) => changeCell(cell, x, y)));
  return newField;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = step;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (array, id) => {
  document.getElementById(id).innerHTML = '';
  const newTable = document.createElement('table');
  newTable.className = 'game-field';
  const gameFieldContainer = document.getElementById(id);
  gameFieldContainer.appendChild(newTable);
  for (let i = 0; i < array.length; i++) {
    const line = array[i];
    const curRow = newTable.insertRow(i);
    for (let j = 0; j < line.length; j++) {
      const curCell = curRow.insertCell(j);
      if (line[j]) {
        curCell.className = 'field-cell-black';
      } else {
        curCell.className = 'field-cell-white';
      }
    }
  }
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createField__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameOfLife__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(2);





const main = () => {
  const startField = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__createField__["a" /* makeGosperGliderGun */])();

  const updateField = (field) => {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__render__["a" /* default */])(field, 'game-field-container');
    const newField = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__gameOfLife__["a" /* step */])(field);

    setTimeout(updateField, 50, newField);
  };
  setTimeout(updateField, 50, startField);
};

window.onload = main;


/***/ })
/******/ ]);