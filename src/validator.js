class Validator {
  static validate(sudoku) {
    const validator = new Validator();

    return validator.validate(sudoku);
  }

  validate(sudoku) {
    sudoku = this.getCleanSudoku(sudoku);
    let isIncomplete = false;

    // checking if rows and columns are valid
    for (let row = 0; row < 9; row++) {
      const rowMap = {};
      const colMap = {};
      for (let col = 0; col < 9; col++) {
        const rowCell = sudoku[row][col];
        const colCell = sudoku[col][row];
        if (rowCell === "0" || colCell === "0") {
          isIncomplete = true;
          continue;
        }
        if (!this.isCellValid(rowCell) || !this.isCellValid(colCell)) {
          return "Sudoku is invalid.";
        }
        if (rowMap[rowCell] || colMap[colCell]) {
          return "Sudoku is invalid.";
        }
        rowMap[rowCell] = 1;
        colMap[colCell] = 1;
      }
    }

    // checking if boxes are valid
    for (let row = 0; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        const box = {};
        for (let boxRow = 0; boxRow < 3; boxRow++) {
          for (let boxCol = 0; boxCol < 3; boxCol++) {
            const cell = sudoku[row + boxRow][col + boxCol];
            if (cell === "0") continue;
            if (box[cell]) return "Sudoku is invalid.";
            box[cell] = 1;
          }
        }
      }
    }
    if (isIncomplete) return "Sudoku is valid but incomplete.";
    return "Sudoku is valid.";
  }

  getCleanSudoku(sudoku) {
    return sudoku
      .replace(/[|+-]/g, "")
      .split("\n")
      .filter((row) => row[0])
      .map((row) => row.split(" "));
  }

  isCellValid(cell) {
    const number = Number(cell);
    if (number >= 1 && number <= 9) return true;
    return false;
  }
}

module.exports = Validator;
