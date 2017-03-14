const colors = [
	{
		id: 1,
		color: 'red'
	},
	{
		id: 2,
		color: 'blue'
	},	
	{
		id: 3,
		color: 'yellow'
	},
	{
		id: 4,
		color: 'orange'
	},	
	{
		id: 5,
		color: 'pink'
	},
	{
		id: 6,
		color: 'purple'
	},	
	{
		id: 7,
		color: 'green'
	},
	{
		id: 8,
		color: 'white'
	},
];
const guessButton = document.querySelector('button#guess');
const rowAmount = 10;
const boxAmount = 4;
let currentRow = 1;
let selectedColor = colors[0];
let currentGuess = [];
let win = false;

function createRandomArray() {
	let code = [];
	for (let i = 0; i < boxAmount; i++){
		code.push(Math.floor(Math.random() * colors.length + 1));
	}
	return code;
}

function selectRow(row, boxType) {
	return document.querySelectorAll('#row' + row + ' div.' + boxType);
}

function changeColor() {
	event.target.style.backgroundColor = selectedColor.color;
	currentGuess[event.target.id] = selectedColor.id;
	console.log(currentGuess);
}

function enableRow() {
	if (currentRow !== rowAmount) {
		const selectedRow = selectRow(currentRow, 'box');
		for(let i = 0; i < boxAmount; i++) {
			selectedRow[i].addEventListener('click', changeColor);
		}
	}
}

function disableRow() {
	const selectedRow = selectRow(currentRow, 'box');
	for(let i = 0; i < boxAmount; i++) {
		selectedRow[i].removeEventListener('click', changeColor);
	}
}

function compareCode() {
	let boxesFilled = 0;
	let dots = selectRow(currentRow, 'dot');
	let answer = code.slice();
	win = false;
	for(let i = 0; i < boxAmount; i++) {
		if(currentGuess[i] == answer[i]) {
			console.log('number ' + (i + 1) + ' was correct');
			dots[boxesFilled].style.backgroundColor = 'red'
			boxesFilled += 1
			currentGuess[i] = null;
			answer[i] = null;
		}
	}
	if (boxesFilled == boxAmount) {
		win = true;
	}
	if(!win){
		for (let i = 0; i < boxAmount; i++) {
			if (currentGuess[i] != null) {
				for (let x = 0; x < answer.length; x++) {
					if (answer[x] != null) {
						if(currentGuess[i] == answer[x]){
							dots[boxesFilled].style.backgroundColor = 'orange'
							boxesFilled += 1;
							currentGuess[i] = null;
							answer[x] = null;
						}
					}
				}
			}
		}
	}
}

function endgame() {
	if (win == true || currentRow == rowAmount) {
		if (win == true) {
			alert('congratulations you won');
		} else {
			alert('too bad you have lost');
		}
		disableRow();
		guessButton.removeEventListener('click', nextRow);
	}
}
function nextRow() {
	compareCode();
	disableRow();
	currentRow += 1;
	currentGuess = [];
	enableRow();
	endgame();
}

for (let i = 0; i < colors.length; i++) {
	let currentColor = colors[i];
	const color = document.querySelector('#'+ currentColor.color);

	color.addEventListener('click', () => {
		console.log(currentColor.color);
		document.querySelector('.selected-color').style.backgroundColor = currentColor.color;
		selectedColor = currentColor;
	});
}

guessButton.addEventListener('click', nextRow);
let code = createRandomArray();
console.log(code);
console.log(selectRow(1, 'box'));
enableRow();