import {getInputNumbers} from "../utils";
import orderBy from "lodash/orderBy";

export function getResult1(input = getInputNumbers()) {
    let decreased: number = 0;

    for (let i = 0; i < input.length; i++) {
        const depthBefore = input[i - 1];
        const depth = input[i];
        if (depthBefore && depth <= depthBefore) {
            decreased++;
        }
    }

    return input.length -1 - decreased;
}

export function getResult2() {
    const input = getInputNumbers();
    let sums: number[] = [];

    for (let i = 0; i < input.length; i++) {
        const windowA = input[i];
        const windowB = input[i + 1];
        const windowC = input[i + 2];
        if (windowB && windowC) {
            sums.push(windowA + windowB + windowC);
        }
    }

    return getResult1(sums);
}