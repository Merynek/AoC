import input from "bundle-text:./inputs/input.txt";
import inputAdditional from "bundle-text:./inputs/inputAdditional.txt";

export function getInputNumbers(): number[] {
    return input.toString()
        .trim()
        .split('\n')
        .map((num) => parseInt(num, 10));
}

export function getInputStrings(): string[] {
    return input.toString()
        .trim()
        .split('\n')
        .map(str => str.replace(/(\r)/gm, ""))
}

export function getInputStringsNoTrim(): string[] {
    return input.toString()
        .split('\n')
        .map(str => str.replace(/(\r)/gm, ""))
}


export function getInputMatrix(): number[] {
    return inputAdditional.toString()
        .trim()
        .split(',')
        .map((num) => parseInt(num, 10));
}

export function getInputNumbersInLine(): number[] {
    return inputAdditional.toString()
        .trim()
        .split(',')
        .map((num) => parseInt(num, 10));
}

export function sum(numbers: any) {
    return numbers.reduce((partial_sum, a) => partial_sum + a, 0);
}

export function getMatrixString(): number[][] {
    const matrix = [];
    const inputString = getInputStrings();
    inputString.forEach(input => {
        const numbers = [];
        for (let i = 0; i < input.length; i++) {
            numbers.push(Number(input[i]));
        }
        matrix.push(numbers);
    })
    return matrix;
}

export function getMatrix(inputString: string[]): number[][] {
    const matrix = [];
    inputString.forEach(input => {
        const numbers = [];
        for (let i = 0; i < input.length; i++) {
            numbers.push(Number(input[i]));
        }
        matrix.push(numbers);
    })
    return matrix;
}


export function transposeMatrix<T>(inputMatrix: T[][]): T[][] {
    let source = inputMatrix.map((arr) => {
        return arr.slice();
    });

    const M = source.length;
    const N = source[0].length;

    // create a new NxM destination array
    let destination = new Array(N);
    for (let i = 0; i < N; i++) {
        destination[i] = new Array(M);
    }

    // start copying from source into destination
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            destination[i][j] = source[M - j - 1][i];
        }
        destination[i].reverse();
    }

    return destination;
}