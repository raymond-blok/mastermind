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
	const selectedRow = selectRow(currentRow, 'box');
	for(let i = 0; i < boxAmount; i++) {
		
		selectedRow[i].addEventListener('click', changeColor);
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
	win = false;
	for(let i = 0; i < boxAmount; i++) {
		if(currentGuess[i] == code[i]) {
			console.log('number ' + (i + 1) + ' was correct');
			dots[boxesFilled].style.backgroundColor = 'red'
			boxesFilled += 1
			currentGuess[i] = null;
		}
	}
	if (boxesFilled == boxAmount) {
		win = true;
	}
	if(!win){
		for (let i = 0; i < boxAmount; i++) {
			if (!(currentGuess[i] == null)) {
				for (let x = 0; x < code.length; x++) {
					if(currentGuess[i] == code[x]){
						dots[boxesFilled].style.backgroundColor = 'orange'
						boxesFilled += 1;
						currentGuess[i] = null;
					}
				}
			}
		}
	}
}

function nextRow() {
	compareCode();
	disableRow();
	currentRow += 1;
	currentGuess = [];
	enableRow();
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
const code = createRandomArray();
console.log(code);
console.log(selectRow(1, 'box'));
enableRow();