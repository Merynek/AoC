import {getInputStrings} from "../utils";
import orderBy from "lodash/orderBy";

type Sections = number[];

class Pair {
    firstSection: Sections;
    secondSection: Sections;

    constructor(firstSection: Sections, secondSection: Sections) {
        this.firstSection = firstSection;
        this.secondSection = secondSection;
    }

    get ordered(): Sections[] {
        return orderBy([this.firstSection, this.secondSection], (section: Sections) => {
            return section.length;
        }, ["asc"]);
    }

    get fullyOverlap(): boolean {
        const smaller = this.ordered[0];
        const bigger = this.ordered[1];

        return smaller[0] >= bigger[0] && smaller[smaller.length - 1] <= bigger[bigger.length - 1];
    }

    get overlap(): boolean {
        const smaller = this.ordered[0];
        const bigger = this.ordered[1];

        if (smaller[0] >= bigger[0] && smaller[0] <= bigger[bigger.length - 1]) {
            return true
        }
        return smaller[smaller.length - 1] >= bigger[0] && smaller[smaller.length - 1] <= bigger[bigger.length - 1];
    }
}

const createSections = (part: string) => {
    const sections: number[] = [];
    const part1 = part.split("-")[0];
    const part2 = part.split("-")[1];
    for (let i = Number(part1); i <= Number(part2); i++) {
        sections.push(i);
    }
    return sections;
}

const createPairs = (inputs: string[]): Pair[] => {
    const pairs: Pair[] = [];
    inputs.forEach(input => {
        const pair = input.split(",");
        const part1 = pair[0];
        const part2 = pair[1];
        pairs.push(new Pair(createSections(part1), createSections(part2)));
    })
    return pairs;
}

export function getResult1() {
    const inputs = getInputStrings();
    const pairs: Pair[] = createPairs(inputs);

    return pairs.filter(p => p.fullyOverlap).length;
}

export function getResult2() {
    const inputs = getInputStrings();
    const pairs: Pair[] = createPairs(inputs);

    return pairs.filter(p => p.overlap).length;
}