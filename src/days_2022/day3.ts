import {getInputStrings} from "../utils";
import sum from "lodash/sum";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";

class ElvesGroup {
    public ruckSacks: Rucksack[];

    constructor(ruckSacks: Rucksack[]) {
        this.ruckSacks = ruckSacks;
    }

    get sortedRuckSacks(): Rucksack[] {
        return orderBy(this.ruckSacks, (rucksack: Rucksack) => {
            return rucksack.compartments.length;
        }, ["asc"]);
    }

    get commonItems(): string[] {
        const sorted = this.sortedRuckSacks;
        const first = sorted[0];
        const rest = sorted.slice(1);
        const _commonItems: string[] = [];

        first.compartments.forEach(item => {
            let notFound = false;
            rest.forEach((ruckSack: Rucksack) => {
                if (ruckSack.compartments.indexOf(item) === -1) {
                    notFound = true
                }
            })
            if (!notFound && _commonItems.indexOf(item) === -1) {
                _commonItems.push(item);
            }
        })
        return _commonItems;
    }

    get priorities(): number[] {
        return this.commonItems.map(getPriority);
    }

    get sumPriorities(): number {
        return sum(this.priorities);
    }
}

class Rucksack {
    private firstCompartment: string[];
    private secondCompartment: string[];

    constructor(rucksack: string) {
        const half = Math.ceil(rucksack.length / 2);
        this.firstCompartment = rucksack.slice(0, half).split("")
        this.secondCompartment = rucksack.slice(half).split("");
    }

    get compartments(): string[] {
        return [...this.firstCompartment, ...this.secondCompartment];
    }

    get duplicities(): string[] {
        const _duplicities = [];
        this.firstCompartment.forEach(char => {
            if (this.secondCompartment.indexOf(char) > -1 && _duplicities.indexOf(char) === -1) {
                _duplicities.push(char);
            }
        })
        return _duplicities;
    }

    get priorities(): number[] {
        const _priorities: number[] = [];
        this.duplicities.forEach(duplicity => {
            _priorities.push(getPriority(duplicity));
        })
        return _priorities;
    }

    get sumPriorities(): number {
        return sum(this.priorities);
    }
}

const getPriority = (item: string) => {
    const lowChars = "abcdefghijklmnopqrstuvwxyz";
    const allChars = lowChars + lowChars.toUpperCase();
    const index = allChars.indexOf(item);
    if (index > -1) {
        return index + 1;
    }
    return 0;
}

export function getResult1() {
    const inputs = getInputStrings();
    const ruckSacks: Rucksack[] = inputs.map(input => new Rucksack(input));

    return sumBy(ruckSacks, (rucksack: Rucksack) => {
        return rucksack.sumPriorities;
    })
}

export function getResult2() {
    const inputs = getInputStrings();
    const ruckSacks: Rucksack[] = inputs.map(input => new Rucksack(input));
    const groups: ElvesGroup[] = chunk(ruckSacks, 3).map(group => new ElvesGroup(group));

    return sumBy(groups, (group: ElvesGroup) => {
        return group.sumPriorities;
    })
}