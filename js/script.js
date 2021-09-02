"use strict";

const playingField = document.querySelectorAll('.game__place'),
      btnRefill = document.querySelector('.btn__refill'),
      gStep = document.querySelector('.game__step'),
      gMsg = document.querySelector('.game__msg');

let zeroPos,
    numClick = 0,
    frendUp,
    frendDown,
    frendLeft,
    frendRight,
    canUp, canDown, canLeft, canRight,
    canMove = true,
    arr = [];

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;
  
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
  
function fillGame (color) {
  playingField.forEach((item, i) => {
    item.textContent = arr[i];
    if (arr[i] == 0) {
      playingField[i].textContent = '';
      playingField[i].style.backgroundColor = 'white';
    } else {
      playingField[i].style.backgroundColor = color;
    }
  });
}
function whatchPositions() {
  arr.forEach((item, i) => {
    if (item == 0) {
      zeroPos = i;
      // console.log(`Позиция нуля = ${zeroPos}`);
      frendUp = i-4;
      frendDown = i+4;
      frendLeft = i-1;
      frendRight = i+1;
      // console.log(`Соседи: Верх-> ${frendUp}, Низ-> ${frendDown}, Лево-> ${frendLeft}, Право-> ${frendRight}`);
      if (frendDown > 15) {canDown = false;} else {canDown = true;}
      if (frendUp < 0) {canUp = false;} else {canUp = true;}
      if ((zeroPos == 0) || (zeroPos == 4) || (zeroPos == 8) || (zeroPos == 12)) {canLeft = false;} else {canLeft = true;}
      if ((zeroPos == 3) || (zeroPos == 7) || (zeroPos == 11) || (zeroPos == 15)) {canRight = false;} else {canRight = true;}
      // console.log(`Возможности: Вверх-> ${canUp}, вниз-> ${canDown}, влево-> ${canLeft}, вправо-> ${canRight}`);
    }
  });
}

playingField.forEach((item, i) => {
  item.addEventListener('click', (item) => {
    if (canMove && (((i == frendUp) && (canUp)) || ((i == frendDown) && (canDown)) || ((i == frendLeft) && (canLeft)) || ((i == frendRight) && (canRight)))) {
      // console.log(`${arr[i]} в ${i} позиции`);
      arr[zeroPos] = arr[i];
      arr[i] = 0;
      fillGame('green');
      whatchPositions();
      numClick++;
    } 
    
    gStep.textContent = `Ход: ${numClick}`;

    if (String(arr) == [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0]) {
      gameOver();
    } else
    if (String(arr) == [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]) {
      gameOver(1);
    }
  });
});

btnRefill.addEventListener('click', () => {
  shuffle(arr);
  fillGame('green');
  whatchPositions();
  numClick = 0;
  canMove = true;
  gStep.textContent = 'Ход: 0';
  gMsg.textContent = '';
  btnRefill.style.color = 'black';
});

function gameOver(item) {
  if (item == 1) {
    gMsg.textContent = 'Вы выиграли! Игра окончена!';
  } else {
    gMsg.textContent = 'Для ЭТОЙ ситуации дальнейшего решения не существует! Игра окончена!';
  }
  canMove = false;
  fillGame('darkgreen');
  btnRefill.style.color = 'white';
  
}

// СТАРТ ИГРЫ - инициализация простого массива
for (let i = 0; i < 16; i++) { arr.push(i); }

shuffle(arr);
fillGame('green');
whatchPositions();

document.ondragstart = noselect; 
document.onselectstart = noselect; 
document.oncontextmenu = noselect; 
function noselect() {return false;} 



