import {getInputNumbersInLine, getInputStrings, sum, transposeMatrix} from "../utils";

interface IFish {
    internalTimer: number;
}

function createNewFish(timer: number = 8): IFish {
    return {
        internalTimer: timer
    }
}

function nextDay(fishes: IFish[]) {
    let countOfNewFish = 0;
    for (let i = 0; i < fishes.length; i++) {
        const currentFish = fishes[i];
        if (currentFish.internalTimer === 0) {
            currentFish.internalTimer = 6;
            countOfNewFish++;
            continue;
        }
        currentFish.internalTimer--;
    }
    for (let i = 0; i < countOfNewFish; i++) {
        fishes.push(createNewFish())
    }
}

export function getResult1() {
    const numbers = getInputNumbersInLine();
    const fishes: IFish[] = [];

    numbers.forEach(num => {
        fishes.push(createNewFish(num))
    })

    for (let i = 0; i < 256; i++) {
        nextDay(fishes)
    }

    return fishes.length
}


export function getResult2() {
    const numbers = getInputNumbersInLine();
    return 0
}