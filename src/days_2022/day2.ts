import {getInputStrings} from "../utils";
import sumBy from "lodash/sumBy";

enum OPTIONS {
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSORS = "SCISSORS"
}

enum NEED_MOVE {
    LOSE = "X",
    DRAW = "Y",
    WIN = "Z"
}

enum Result {
    WIN,
    LOSE,
    DRAW
}

class Round {
    public opponentOption: OPTIONS;
    public myOption: OPTIONS;
    public needOption: NEED_MOVE|null;

    constructor(opponent: OPTIONS, me: OPTIONS, needMove: NEED_MOVE|null) {
        this.opponentOption = opponent;
        this.myOption = me;
        this.needOption = needMove;
        if (needMove) {
            this.recompute();
        }
    }

    get optionScore(): number {
        switch (this.myOption) {
            case OPTIONS.ROCK:
                return 1;
            case OPTIONS.PAPER:
                return 2;
            case OPTIONS.SCISSORS:
                return 3;
        }
    }

    get resultScore(): number {
        switch (this.result) {
            case Result.WIN:
                return 6;
            case Result.DRAW:
                return 3;
            case Result.LOSE:
                return 0;
        }
    }

    get totalScore() {
        return this.resultScore + this.optionScore;
    }

    get result(): Result {
        switch (this.myOption) {
            case OPTIONS.SCISSORS:
                switch (this.opponentOption) {
                    case OPTIONS.PAPER:
                        return Result.WIN;
                    case OPTIONS.ROCK:
                        return Result.LOSE;
                    case OPTIONS.SCISSORS:
                        return Result.DRAW;
                }
                break;
            case OPTIONS.PAPER:
                switch (this.opponentOption) {
                    case OPTIONS.PAPER:
                        return Result.DRAW;
                    case OPTIONS.ROCK:
                        return Result.WIN;
                    case OPTIONS.SCISSORS:
                        return Result.LOSE;
                }
                break;
            case OPTIONS.ROCK:
                switch (this.opponentOption) {
                    case OPTIONS.PAPER:
                        return Result.LOSE;
                    case OPTIONS.ROCK:
                        return Result.DRAW;
                    case OPTIONS.SCISSORS:
                        return Result.WIN;
                }
        }
    }

    private recompute() {
        if (this.needOption) {
            switch (this.needOption) {
                case NEED_MOVE.DRAW:
                    this.myOption = this.opponentOption;
                    break;
                case NEED_MOVE.LOSE:
                    switch (this.opponentOption) {
                        case OPTIONS.PAPER:
                            this.myOption = OPTIONS.ROCK;
                            break;
                        case OPTIONS.ROCK:
                            this.myOption = OPTIONS.SCISSORS;
                            break;
                        case OPTIONS.SCISSORS:
                            this.myOption = OPTIONS.PAPER;
                            break;
                    }
                    break;
                case NEED_MOVE.WIN:
                    switch (this.opponentOption) {
                        case OPTIONS.PAPER:
                            this.myOption = OPTIONS.SCISSORS;
                            break;
                        case OPTIONS.ROCK:
                            this.myOption = OPTIONS.PAPER;
                            break;
                        case OPTIONS.SCISSORS:
                            this.myOption = OPTIONS.ROCK;
                            break;
                    }
                    break;
            }
        }
    }
}

const convertOpponentToOption = (option: string): OPTIONS => {
    switch (option) {
        case "A":
            return OPTIONS.ROCK;
        case "B":
            return OPTIONS.PAPER;
        case "C":
            return OPTIONS.SCISSORS;
    }
}

const convertMeToOption = (option: string): OPTIONS => {
    switch (option) {
        case "X":
            return OPTIONS.ROCK;
        case "Y":
            return OPTIONS.PAPER;
        case "Z":
            return OPTIONS.SCISSORS;
    }
}

export function getResult1() {
    const inputs = getInputStrings();
    const rounds: Round[] = [];
    inputs.forEach(input => {
        const double = input.replace(" ", "");
        const opponent = convertOpponentToOption(double[0]);
        const me = convertMeToOption(double[1]);
        rounds.push(new Round(opponent, me, null))
    })

    return sumBy(rounds, (round) => {
        return round.totalScore;
    })
}

export function getResult2() {
    const inputs = getInputStrings();
    const rounds: Round[] = [];
    inputs.forEach(input => {
        const double = input.replace(" ", "");
        const opponent = convertOpponentToOption(double[0]);
        const me = convertMeToOption(double[1]);
        const needOption = double[1] as NEED_MOVE;
        rounds.push(new Round(opponent, me, needOption))
    })

    return sumBy(rounds, (round) => {
        return round.totalScore;
    })
}