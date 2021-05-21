let BoardLogic = function() {

	let board;
	let originalBoard;
	let selectedCell;
	let solvedBoard;
	
	let puzzleGenerator;
	
	let currentDifficult;
	
	let init = function() {
		currentDifficult = difficult.EASY;
		puzzleGenerator = PuzzleGenerator();
		
		createPuzzle();
	}
	
	let createPuzzle = function() {
		let randomBoard = getRandomBoard();
		board = copyBoard(randomBoard.unsolved);
		originalBoard = copyBoard(randomBoard.unsolved);
		solvedBoard = copyBoard(randomBoard.solved);
	}
	
	let copyBoard = function(board){
		
		let newBoard = [];
		
		for(let i = 0; i < 9; i++) {
			
			newBoard[i] = [];
			
			for(let j = 0; j < 9; j++) {
				newBoard[i][j] = board[i][j];
			}
		}	
		
		return newBoard;
	}
	

	let changeSelectedCellValue = function(value) {
		if(!hasSelectedCell()){
			return;
		}
		
		if(!isCellEditable()){
			return;
		}
		
		board[selectedCell.row][selectedCell.col] = value;
		selectedCell.value = value;
	}
	
	let isBoardCompleteCorrectly = function() {
		if(!isBoardComplete()){
			return false;
		}
		
		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 9; j++){
				if(board[i][j] != solvedBoard[i][j]){
					return false;
				}
			}
		}
		
		return true;
	}
	
	let isBoardComplete = function() {
		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 9; j++){
				if(board[i][j] == 0){
					return false;
				}
			}
		}
		
		return true;
	}
	
	let clearSelectedCell = function() {		
		if(!hasSelectedCell()){
			return;
		}
		
		if(!isCellEditable()){
			return;
		}
		
		board[selectedCell.row][selectedCell.col] = 0;
		selectedCell.value = 0;
	}
                                                                   
	let selectCell = function(cell) {
		selectedCell = cell;
	}
	
	let getValueAt = function(row, col) {
		return board[row][col];
	}
	
	let hasSelectedCell = function() {
		return !!selectedCell;
	}
	
	let isCellEditable = function(){
		if(!hasSelectedCell()){
			return false;
		}
		
		return originalBoard[selectedCell.row][selectedCell.col] == 0;
	}
	
	let getRandomBoard = function(){
		return puzzleGenerator.generatePuzzle(currentDifficult.code);
	}

	let getSelectedCell = function() {
		return selectedCell;
	}

	let isSelectedCellEditable = function() {
		return isCellEditable();
	}
	
	let restart = function() {
		board = copyBoard(originalBoard);
		selectedCell = null;
	}
	
	let newGame = function() {
		createPuzzle();
	}
	
	let newGameAtDifficult = function(difficult) {
		currentDifficult = difficult;
		newGame();
	}
	
	let getDifficultName = function() {
		return currentDifficult.name;
	}

	init();

	return {
		changeSelectedCellValue,
		selectCell,
		getSelectedCell,
		getValueAt,
		clearSelectedCell,
		isBoardComplete,
		isBoardCompleteCorrectly,
		isSelectedCellEditable,
		restart,
		newGame,
		newGameAtDifficult,
		getDifficultName
	}
}