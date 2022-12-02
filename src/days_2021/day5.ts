import {getInputNumbersInLine, getInputStrings, sum, transposeMatrix} from "../utils";

interface Matrix {
    items: IMatrixItem[][];
}

interface IMatrixItem {
    count: number;
}

interface ICors {
    x: number;
    y: number;
}

interface IPairs {
    from: ICors;
    to: ICors;
}

function getCountOfDangerItems(matrix: Matrix): number {
    let count = 0;
    matrix.items.forEach(row => {
        row.forEach(column => {
            if(column.count >= 2) {
                count++;
            }
        })
    })
    return count;
}

function createDiagram(maxCors: ICors): Matrix {
    const matrix: Matrix = {
        items: []
    }
    for (let row = 0; row <= maxCors.y; row++) {
        const item: IMatrixItem[] = [];
        for (let column = 0; column <= maxCors.x; column++) {
            item.push({
                count: 0
            })
        }
        matrix.items.push(item);
    }
    return matrix;
}

function markItem(matrix: Matrix, cors: ICors) {
    matrix.items.forEach((row, yIndex) => {
        if (yIndex === cors.y) {
            row.forEach((column, xIndex) => {
                if(xIndex === cors.x) {
                    column.count = column.count +1;
                }
            })
        }
    })
}

function markItems(matrix: Matrix, cors1: ICors, cors2: ICors) {
    const isOnlyHorizontalOrVertical = (cors1.x === cors2.x) || (cors1.y === cors2.y);
    if (isOnlyHorizontalOrVertical) {
        const fromY = Math.min(cors1.y, cors2.y);
        const toY = Math.max(cors1.y, cors2.y);
        const fromX = Math.min(cors1.x, cors2.x);
        const toX = Math.max(cors1.x, cors2.x);

        for(let y = fromY; y <= toY; y++) {
            for(let x = fromX; x <= toX; x++) {
                markItem(matrix, { x, y });
            }
        }
    } else {
        let xTemp = cors1.x;
        const markXItem = (y: number) => {
            if (cors1.x < cors2.x) {
                xTemp = xTemp + 1;
                markItem(matrix, { x: xTemp, y });
            } else {
                xTemp = xTemp - 1;
                markItem(matrix, { x: xTemp, y });
            }
        }
        if (cors1.y < cors2.y) {
            for(let y = cors1.y; y <= cors2.y; y++) {
                if (y === cors1.y) {
                    markItem(matrix, { x: cors1.x, y });
                    continue;
                }
                markXItem(y);
            }
        } else {
            for(let y = cors1.y; y >= cors2.y; y--) {
                if (y === cors1.y) {
                    markItem(matrix, { x: cors1.x, y });
                    continue;
                }
                markXItem(y);
            }
        }
    }
}

function getMaxCors(pairs: IPairs[]): ICors {
    let maxX = 0;
    let maxY = 0;
    pairs.forEach(pair => {
        maxX = Math.max(maxX, pair.from.x);
        maxY = Math.max(maxY, pair.from.y);
        maxX = Math.max(maxX, pair.to.x);
        maxY = Math.max(maxY, pair.to.y);
    })
    return {
        x: maxX,
        y: maxY
    }
}

function createPairs(inputStrings: string[]): IPairs[] {
    const pairs: IPairs[] = [];
    inputStrings.forEach(str => {
        const cors = str.split("->")
        const cors1 = cors[0].trim();
        const cors2 = cors[1].trim();
        const xy1 = cors1.split(",");
        const x1 = Number(xy1[0]);
        const y1 = Number(xy1[1]);
        const xy2 = cors2.split(",");
        const x2 = Number(xy2[0]);
        const y2 = Number(xy2[1]);
        pairs.push({
            from: {
                x: x1,
                y: y1
            },
            to: {
                x: x2,
                y: y2
            }
        })
    })
    return pairs;
}

export function getResult1() {
    const strings = getInputStrings();
    const pairs = createPairs(strings);
    const maxCors = getMaxCors(pairs);
    const diagram = createDiagram(maxCors);
    pairs.forEach(pair => {
        markItems(diagram, pair.from, pair.to);
    })
    const dangerItems = getCountOfDangerItems(diagram);
    return dangerItems;
}


export function getResult2() {
    return 0
}