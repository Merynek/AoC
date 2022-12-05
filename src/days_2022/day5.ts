import {getInputStringsNoTrim} from "../utils";
type Crate = string;

interface IMove {
    amount: number;
    from: number;
    to: number;
}

class Stack {
    private readonly _crates: Crate[];

    constructor(crates: Crate[]) {
        this._crates = crates;
    }

    public add(crate: Crate) {
        this._crates.push(crate);
    }

    public push(crates: Crate[]) {
        this._crates.push(...crates);
    }

    public get(): Crate|undefined {
        return this._crates.pop();
    }

    public getTop(): Crate|undefined {
        return this._crates[this._crates.length - 1];
    }

    public isEmpty(): boolean {
        return this._crates.length === 0;
    }
}

class GiantCargoCrane {
    private readonly _stacks: Stack[];

    constructor(stacks: Stack[]) {
        this._stacks = stacks;
    }

    public move(move: IMove) {
        const fromStack = this._stacks[move.from - 1];
        for (let i = 0; i < move.amount; i++) {
            const crate = fromStack.get();
            if (crate) {
                this._stacks[move.to - 1].add(crate);
            }
        }
    }

    public improvedMove(move: IMove) {
        const _crates: Crate[] = [];
        const fromStack = this._stacks[move.from - 1];
        for (let i = 0; i < move.amount; i++) {
            const crate = fromStack.get();
            if (crate) {
                _crates.push(crate);
            }
        }
        this._stacks[move.to - 1].push(_crates.reverse());
    }

    get topCrates(): Crate[] {
        return this._stacks.filter(s => !s.isEmpty()).map(stack => {
            return stack.getTop();
        });
    }
}

const createMoves = (inputs: string[]): IMove[] => {
    const moves: IMove[] = [];
    let movesIndex = 0;
    for (let i = 0; i < inputs.length; i++) {
        const row = inputs[i];
        if (row === "") {
            movesIndex = i + 1;
            break;
        }
    }

    for (let i = movesIndex; i < inputs.length; i++) {
        const row = inputs[i].replace("move ", "").replace("from ", "").replace("to ", "");
        const _moves = row.trim().split(" ");

        moves.push({
            amount: Number(_moves[0]),
            from: Number(_moves[1]),
            to: Number(_moves[2])
        })
    }

    return moves;
}

const createMachine = (isExample: boolean): GiantCargoCrane => {
    if (isExample) {
        return new GiantCargoCrane([
            new Stack(["Z", "N"]),
            new Stack(["M", "C", "D"]),
            new Stack(["P"]),
        ]);
    }
    return  new GiantCargoCrane([
        new Stack(["N", "R",  "G", "P"]),
        new Stack(["J", "T",  "B", "L", "F", "G", "D", "C"]),
        new Stack(["M", "S",  "V"]),
        new Stack(["L", "S",  "R", "C", "Z", "P"]),
        new Stack(["P", "S",  "L", "V", "C", "W", "D", "Q"]),
        new Stack(["C", "T",  "N", "W", "D", "M", "S"]),
        new Stack(["H", "D",  "G", "W", "P"]),
        new Stack(["Z", "L",  "P", "H", "S", "C", "M", "V"]),
        new Stack(["R", "P",  "F", "L", "W", "G", "Z"]),
    ]);
}

export function getResult1() {
    const machine = createMachine(true);
    const moves = createMoves(getInputStringsNoTrim());
    moves.forEach(move => {
        machine.move(move);
    })
    return machine.topCrates.toString().replace(new RegExp(",", "g"), "");
}

export function getResult2() {
    const machine = createMachine(true);
    const moves = createMoves(getInputStringsNoTrim());
    moves.forEach(move => {
        machine.improvedMove(move);
    })
    return machine.topCrates.toString().replace(new RegExp(",", "g"), "");
}