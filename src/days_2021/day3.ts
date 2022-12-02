import {getInputStrings, getMatrix, sum, transposeMatrix} from "../utils";


export function getResult1() {
    const baseInput = getInputStrings();
    const matrix = getMatrix(baseInput);
    const transposedMatrix = transposeMatrix(matrix);
    let gamaRate = "";
    let epsilonRate = "";

    for (let i = 0; i < transposedMatrix.length; i++) {
        const sumNumbers = sum(transposedMatrix[i]);
        const moreOnes = (sumNumbers > transposedMatrix[i].length - sumNumbers)
        gamaRate += moreOnes ? "1" : "0"
        epsilonRate += moreOnes ? "0" : "1"
    }

    return parseInt( gamaRate, 2 ) * parseInt(epsilonRate, 2)
}

function getNewInput(input: string[], mainIndex: number, variant: number) {
    const matrix = getMatrix(input);
    const transposedMatrix = transposeMatrix(matrix)
    const sumNumbers = sum(transposedMatrix[mainIndex]);
    const moreOnes = (sumNumbers >= transposedMatrix[mainIndex].length - sumNumbers);
    const indexes = [];
    transposedMatrix[mainIndex].forEach((number, index) => {
        if (variant === 1) {
            if (moreOnes && number === 1) {
                indexes.push(index)
            }
            if (!moreOnes && number === 0) {
                indexes.push(index)
            }
        } else {
            if (moreOnes && number === 0) {
                indexes.push(index)
            }
            if (!moreOnes && number === 1) {
                indexes.push(index)
            }
        }

    })

    if (indexes.length === 1) {
        return [input[indexes[0]]]
    }
    const newInput: string[] = [];
    indexes.forEach(index => {
        newInput.push(input[index])
    })
    return getNewInput(newInput, mainIndex + 1, variant);
}

export function getResult2() {
    let input = getInputStrings();
    let oxygenGeneratorRating = getNewInput(input,0, 1);
    let co2ScrubberRating = getNewInput(input, 0, 2);
    debugger;

    return parseInt( oxygenGeneratorRating[0], 2 ) * parseInt(co2ScrubberRating[0], 2)
}