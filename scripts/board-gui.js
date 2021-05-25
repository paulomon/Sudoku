let BoardGUI = function() {

	let boardLogic;
	let boardConfig;

	let init = function() {
		boardLogic = BoardLogic();
		boardConfig = ConfigGUI(configChangeCallback);

		fillBoard();
		configureActions();
	}
	
	let configureActions = function(){
		document.querySelectorAll(".cell").forEach(target => {
			target.onclick = onCellClick;
		});
		
		document.querySelectorAll(".number-key-board-cell:not(.number-key-board-cell-clear)").forEach(target => {
			target.onclick = onKeyBoardCellClick;
		});
		
		document.querySelector(".number-key-board-cell-clear").onclick = onClearClick;
		document.querySelector("#restart").onclick = onRestartClick;	
		document.querySelector("#new-game").onclick = onNewGameClick;
		document.querySelector("#df-very-easy").onclick = newVeryEasyGame;
		document.querySelector("#df-easy").onclick = newEasyGame;
		document.querySelector("#df-medium").onclick = newMediumGame;
		document.querySelector("#df-hard").onclick = newHardGame;
		document.querySelector("#df-infernal").onclick = newInfernalGame;
	}
	
	let newVeryEasyGame = function() {
		newGameAtDifficult(difficult.VERY_EASY);
	}
	
	let newEasyGame = function() {
		newGameAtDifficult(difficult.EASY);
	}
	
	let newMediumGame = function() {
		newGameAtDifficult(difficult.MEDIUM);
	}
	
	let newHardGame = function() {
		newGameAtDifficult(difficult.HARD);
	}
	
	let newInfernalGame = function() {
		newGameAtDifficult(difficult.INFERNAL);
	}
	
	let newGameAtDifficult = function(difficult){
		boardLogic.newGameAtDifficult(difficult);
		refillBoard();
		updateDifficult();
	}
	
	let updateDifficult = function() {
		document.querySelector("#selected-difficult").innerText = boardLogic.getDifficultName();
	}
	
	let fillBoard = function() {
		document.querySelectorAll(".cell").forEach(i => {
			let row = getCellElementRow(i);
			let col = getCellElementCol(i);
	
			let cellValue = boardLogic.getValueAt(row, col);
	
			if (cellValue == 0) {
				cellValue = "";
			}
	
			i.innerText = cellValue;
	
			if (cellValue) {
				i.classList.add("fixed-cell");
			}
		});
	}

	let selectRelatives = function(selectedCell) {
		let cellValue = selectedCell.innerText;

		if (cellValue && boardConfig.selectSameValue()) {
			selectRelativesWithSameValue(selectedCell);
		}

		if(boardConfig.selectSameColRow()){
			selectRelativesAtSameRowColBlock(selectedCell);
		}		
	}

	let selectRelativesWithSameValue = function(selectedCell) {
		let cellValue = selectedCell.innerText;

		let cells = document.querySelectorAll(".cell");
		cells = Array.from(cells);

		cells
		.filter(cell => {
			return cell.innerText == cellValue;
		})
		.forEach(cell => {
			cell.classList.add("selected-relative");
		});
	}

	let selectRelativesAtSameRowColBlock = function(selectedCell) {
		let row = selectedCell.getAttribute("row");
		let col = selectedCell.getAttribute("col");

		let rows = document.querySelectorAll(`div[row="${row}"]:not(.fixed-cell)`);
		let cols = document.querySelectorAll(`div[col="${col}"]:not(.fixed-cell)`);

		rows.forEach(i => {
			i.classList.add("selected-relative");
		});

		cols.forEach(i => {
			i.classList.add("selected-relative");
		});
	}

	let clearSelectedRelativeCells = function() {
		let selectedCells = document.querySelectorAll(".cell");

		if (!selectedCells) {
			return;
		}

		selectedCells.forEach(i => {
			i.classList.remove("selected-relative");
		});
	}

	let updateRelatives = function(selectedCell) {
		clearSelectedRelativeCells();
		
		if(selectedCell) {
			selectRelatives(selectedCell);
		}
	}

	let selectClickedCell = function(selectedCell) {
		selectedCell.classList.add("selected-cell");
	}

	let clearSelectedCell = function() {
		boardLogic.selectCell(null);
		
		let selectedCell = document.querySelector(".selected-cell");

		if (!selectedCell) {
			return;
		}

		selectedCell.classList.remove("selected-cell");
	}

	let updateSelectedCell = function(selectedCell) {
		clearSelectedCell();
		selectClickedCell(selectedCell);
	}

	let onCellClick = function(event) {
		let clickedCell = event.target;

		updateRelatives(clickedCell);
		updateSelectedCell(clickedCell);
		
		let row = getCellElementRow(clickedCell);
		let col = getCellElementCol(clickedCell);
		boardLogic.selectCell(new Cell(row, col));
	}
	
	let onKeyBoardCellClick = function(event) {
		
		if(!boardLogic.isSelectedCellEditable()){
			return;
		}
		
		boardLogic.changeSelectedCellValue(event.target.innerText);
		refresh();
		
		if(!boardLogic.isBoardComplete()){
			return;
		}
		
		if(boardLogic.isBoardCompleteCorrectly()){
			updateFinishedGameMessage("You solved the puzzle, congrats!");
			return;
		}
		
		updateFinishedGameMessage("Wrong answer, review your game :(");
	}
	
	let updateFinishedGameMessage = function(message) {
		document.querySelector("#finished-game-message").innerText = message;
	}
	
	let onClearClick = function(event) {
		boardLogic.clearSelectedCell();
		refresh();
	}
	
	let onRestartClick = function(event) {
		boardLogic.restart();
		refresh();
		
		clearSelectedCell();
	}
	
	let clearFinishedGameMessage = function(){
		updateFinishedGameMessage("");
	}
	
	let onNewGameClick = function(event) {
		boardLogic.newGame();
		refillBoard();
	}
	
	let refillBoard = function() {
		clearBoard();
		fillBoard();
	}
	
	let clearBoard = function() {
		clearAllValues();
		clearFixedCell();
		clearSelectedCell();
		clearSelectedRelativeCells();
		clearFinishedGameMessage();
	}
	
	let clearAllValues = function() {
		document.querySelectorAll(".cell").forEach(i => {
			i.innerText = "";
		});
	}
	
	let clearFixedCell = function() {
		document.querySelectorAll(".fixed-cell").forEach(i => {
			i.classList.remove("fixed-cell");
		});
	}
	
	let refresh = function() {
		refreshValues();
		refreshBoard();
		clearFinishedGameMessage();
	}
	
	let refreshValues = function () {
		document.querySelectorAll(".cell").forEach(i => {
			let row = getCellElementRow(i);
			let col = getCellElementCol(i);
	
			let cellValue = boardLogic.getValueAt(row, col);
	
			if (cellValue == 0) {
				cellValue = "";
			}
	
			i.textContent = cellValue;
		});
	}
		
	let refreshBoard = function() {
		let selectedCell = boardLogic.getSelectedCell();
		
		if(!selectedCell) {
			updateRelatives();
			return;
		}
		
		let selectedCellElement = document.querySelector(`.cell[row='${selectedCell.row}'][col='${selectedCell.col}']`);
		updateRelatives(selectedCellElement);
	}
	
	let getCellElementRow = function(element){
		return element.getAttribute("row");
	}
	
	let getCellElementCol = function(element){
		return element.getAttribute("col");
	}

	let configChangeCallback = function(){
		refreshBoard();
	}
	
	init();
};