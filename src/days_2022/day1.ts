import {getInputMatrix, getInputNumbers, getInputStrings} from "../utils";
import maxBy from "lodash/maxBy";
import sum from "lodash/sum";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";

class Elf {
    public calories: number[] = [];

    get totalCalories(): number {
        return sum(this.calories);
    }
}

const createElf = (calories: number[]): Elf => {
    const elf = new Elf();
    elf.calories = calories;
    return elf;
}

const createElves = (): Elf[] => {
    const inputs = getInputNumbers();
    const elves: Elf[] = [];
    let currentCalories: number[] = [];
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const isLast = i === inputs.length - 1;
        if (!isNaN(input)) {
            currentCalories.push(input);
            if (isLast) {
                elves.push(createElf(currentCalories));
            }
        } else {
            elves.push(createElf(currentCalories));
            currentCalories = [];
        }
    }
    return elves;
}

export function getResult1() {
    const elves = createElves();
    const maxElves: Elf = maxBy(elves, (elf) => {
        return elf.totalCalories;
    })

    return maxElves.totalCalories;
}

export function getResult2() {
    const elves = createElves();
    const sortedElves = orderBy(elves, "totalCalories", ["desc"]);
    const topThreeElves = sortedElves.slice(0, 3);

    return sumBy(topThreeElves, (elf) => {
        return elf.totalCalories;
    });
}