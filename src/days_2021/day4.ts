import {getInputNumbersInLine, getInputStrings, sum, transposeMatrix} from "../utils";

interface Matrix {
    items: IMatrixItem[][];
    bingo: boolean;
}

interface IMatrixItem {
    value: number;
    marked: boolean;
}

interface ICheckRowBingo {
    bingo: boolean;
    rowItems: IMatrixItem[]
}

interface ICheckColumnBingo {
    bingo: boolean;
    columnItems: IMatrixItem[]
}

function getUnmarkedItems(matrix: Matrix): IMatrixItem[] {
    const items: IMatrixItem[] = [];
    matrix.items.forEach(row => {
        row.forEach(column => {
            if(!column.marked) {
                items.push(column);
            }
        })
    })
    return items;
}

function getMatrixNumbers(inputString: string[]): Matrix {
    const matrix: Matrix = {
        items: [],
        bingo: false
    }
    inputString.forEach(input => {
        const row = input.trim().split(" ").filter( s => s !== "");
        const numbers: IMatrixItem[] = [];
        for (let i = 0; i < row.length; i++) {
            numbers.push({
                marked: false,
                value: Number(row[i])
            })
        }
        matrix.items.push(numbers);
    })
    return matrix;
}

function markItem(matrix: Matrix, value: number) {
    matrix.items.forEach(row => {
        row.forEach(column => {
            if(column.value === value) {
                column.marked = true;
            }
        })
    })
}

function markItemInAllMatrixs(matrixs: Matrix[], value: number) {
    matrixs.forEach(matrix => {
        markItem(matrix, value)
    })
}

function checkRowBingo(row: IMatrixItem[]): ICheckRowBingo {
    if (row.every(c => c.marked === true)) {
        return {
            bingo: true,
            rowItems: row
        }
    }
    return {
        bingo: false,
        rowItems: []
    }
}

function checkRowsBingo(matrix: Matrix): ICheckRowBingo {
    let check: ICheckRowBingo = {
        bingo: false,
        rowItems: []
    }
    for (let i = 0; i < matrix.items.length; i++) {
        const row = matrix.items[i];
        check = checkRowBingo(row);
        if (check.bingo) {
            return check;
        }
    }
    return check;
}

function checkColumnBingo(column: IMatrixItem[]): ICheckColumnBingo {
    if (column.every(c => c.marked === true)) {
        return {
            bingo: true,
            columnItems: column
        }
    }
    return {
        bingo: false,
        columnItems: []
    }
}

function checkColumnsBingo(matrix: Matrix): ICheckColumnBingo {
    const transposedMatrix = transposeMatrix(matrix.items);
    let check: ICheckColumnBingo = {
        bingo: false,
        columnItems: []
    }
    for (let i = 0; i < transposedMatrix.length; i++) {
        const row = transposedMatrix[i];
        check = checkColumnBingo(row);
        if (check.bingo) {
            return check;
        }
    }
    return check;
}

function checkMatrixs(matrixs: Matrix[]): Matrix|null {
    let firstBingo: Matrix|null = null;
    for (let i = 0; i < matrixs.length; i++) {
        const checkRow = checkRowsBingo(matrixs[i]);
        if (checkRow.bingo) {
            matrixs[i].bingo = true;
            if (firstBingo === null) {
                firstBingo = matrixs[i];
            }
        }
        const checkColumn = checkColumnsBingo(matrixs[i]);
        if (checkColumn.bingo) {
            matrixs[i].bingo = true;
            if (firstBingo === null) {
                firstBingo = matrixs[i];
            }
        }
    }
    return firstBingo
}

function getMatrixs(): Matrix[] {
    const matrixs: Matrix[] = [];
    const strings = getInputStrings();
    let currentMatrix = [];
    strings.forEach(str => {
        if (str === "") {
            matrixs.push(getMatrixNumbers(currentMatrix))
            currentMatrix = [];
            return;
        }
        currentMatrix.push(str);
    })
    matrixs.push(getMatrixNumbers(currentMatrix));
    return matrixs;
}


export function getResult1() {
    const bingoNumbers = getInputNumbersInLine();
    const matrixs: Matrix[] = getMatrixs();

    let total: number = 0;
    for (let i = 0; i < bingoNumbers.length; i++) {
        markItemInAllMatrixs(matrixs, bingoNumbers[i]);
        const result = checkMatrixs(matrixs);
        if (result) {
            const unmarkedItems = getUnmarkedItems(result);
            const suma = sum(unmarkedItems.map(item => item.value));
            total = suma * bingoNumbers[i];
            break;
        }
    }
    return total;
}


export function getResult2() {
    const bingoNumbers = getInputNumbersInLine();
    const matrixs: Matrix[] = getMatrixs();

    let total: number = 0;
    for (let i = 0; i < bingoNumbers.length; i++) {
        markItemInAllMatrixs(matrixs.filter(m => !m.bingo), bingoNumbers[i]);
        const result = checkMatrixs(matrixs.filter(m => !m.bingo));
        if (result) {
            if (matrixs.every(m => m.bingo)) {
                const unmarkedItems = getUnmarkedItems(result);
                const suma = sum(unmarkedItems.map(item => item.value));
                total = suma * bingoNumbers[i];
                break;
            }
            if (i === bingoNumbers.length -1) {
                const unmarkedItems = getUnmarkedItems(result);
                const suma = sum(unmarkedItems.map(item => item.value));
                total = suma * bingoNumbers[i];
                break;
            }
        }
    }
    return total;
}