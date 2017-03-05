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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const countLiveNeighbors = (field, x, y) => {
  const range = [-1, 0, 1];
  const neighbors = range.map(dy => range.map((dx) => {
    if (dx === 0 && dy === 0) {
      return undefined;
    }
    return field[y + dy] && field[y + dy][x + dx];
  }));
  return [].concat(...neighbors).filter(item => item).length;
};
/* unused harmony export countLiveNeighbors */


const step = (field) => {
  const changeCell = (cell, x, y) => {
    const liveNeighbors = countLiveNeighbors(field, x, y);
    const mustDie = (liveNeighbors < 2) || (liveNeighbors > 3);
    const spawning = !cell && (liveNeighbors === 3);
    return spawning || (cell && !mustDie);
  };
  return field.map((line, y) => line.map((cell, x) => changeCell(cell, x, y)));
};
/* unused harmony export step */



class GameOfLife {
  constructor(state, containerId) {
    this.state = state;
    this.interval = 800;
    this.containerId = containerId;
    this.pause = false;
    this.intervalId = setInterval(this.createField.bind(this), this.interval);
  }
  createField() {
    this.setState(step(this.state));
  }

  speedUp() {
    clearInterval(this.intervalId);
    this.interval = this.interval <= 150 ? this.interval : this.interval - 100;
    this.intervalId = setInterval(this.createField.bind(this), this.interval);
  }

  speedDown() {
    clearInterval(this.intervalId);
    this.interval = this.interval + 100;
    this.intervalId = setInterval(this.createField.bind(this), this.interval);
  }

  pauseGame() {
    if (this.pause) {
      this.intervalId = setInterval(this.createField.bind(this), this.interval);
    } else {
      clearInterval(this.intervalId);
    }
    this.pause = !this.pause;
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  render() {
    const gameFieldContainer = document.getElementById(this.containerId);
    gameFieldContainer.innerHTML = '';
    const newTable = document.createElement('table');
    switch (this.state.length) {
      case 5:
        newTable.className = 'blinker';
        break;
      case 17:
        newTable.className = 'pulsar';
        break;
      case 24:
        newTable.className = 'glider-gun';
        break;
    }
    gameFieldContainer.appendChild(newTable);
    this.state.forEach((line) => {
      const curRow = newTable.insertRow();
      line.forEach((elem) => {
        const curCell = curRow.insertCell();
        curCell.className = elem ? 'cell-black' : 'cell-white';
      });
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameOfLife;



/***/ }),
/* 1 */
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
/* harmony export (immutable) */ __webpack_exports__["b"] = makeBlinker;


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
/* harmony export (immutable) */ __webpack_exports__["a"] = makePulsar;


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
    '......................................',
    '......................................'];
  return parseField(field);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = makeGosperGliderGun;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libraryFigures__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameOfLife__ = __webpack_require__(0);




window.onload = () => {
  const game = new __WEBPACK_IMPORTED_MODULE_1__gameOfLife__["a" /* GameOfLife */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libraryFigures__["a" /* makePulsar */])(), 'game-field-container');
  document.getElementById('blinker').onclick = game.setState.bind(game, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libraryFigures__["b" /* makeBlinker */])());
  document.getElementById('pulsar').onclick = game.setState.bind(game, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libraryFigures__["a" /* makePulsar */])());
  document.getElementById('glider-gun').onclick = game.setState.bind(game, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libraryFigures__["c" /* makeGosperGliderGun */])());
  document.getElementById('speedUp').onclick = game.speedUp.bind(game);
  document.getElementById('speedDown').onclick = game.speedDown.bind(game);
  document.getElementById('pause').onclick = game.pauseGame.bind(game);
};


/***/ })
/******/ ]);