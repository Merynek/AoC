import {getInputMatrix, getInputNumbers, getInputStrings} from "../utils";
import maxBy from "lodash/maxBy";
import sum from "lodash/sum";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";

enum OPPONENT_OPTION {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = "C"
}

enum OPTIONS {
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSORS = "SCISSORS"
}

enum MY_OPTION {
    ROCK = "X",
    PAPER = "Y",
    SCISSORS = "Z"
}

enum NEED_OPTION {
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
    public needOption: NEED_OPTION|null;

    constructor(opponent: OPTIONS, me: OPTIONS, needOption: NEED_OPTION|null) {
        this.opponentOption = opponent;
        this.myOption = me;
        this.needOption = needOption;
        if (needOption) {
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

    private recompute() {
        if (this.needOption) {
            switch (this.needOption) {
                case NEED_OPTION.DRAW:
                    this.myOption = this.opponentOption;
                    break;
                case NEED_OPTION.LOSE:
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
                case NEED_OPTION.WIN:
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
}

const convertOpponentToOption = (option: OPPONENT_OPTION): OPTIONS => {
    switch (option) {
        case OPPONENT_OPTION.SCISSORS:
            return OPTIONS.SCISSORS;
        case OPPONENT_OPTION.ROCK:
            return OPTIONS.ROCK;
        case OPPONENT_OPTION.PAPER:
            return OPTIONS.PAPER;
    }
}

const convertMeToOption = (option: MY_OPTION): OPTIONS => {
    switch (option) {
        case MY_OPTION.SCISSORS:
            return OPTIONS.SCISSORS;
        case MY_OPTION.ROCK:
            return OPTIONS.ROCK;
        case MY_OPTION.PAPER:
            return OPTIONS.PAPER;
    }
}

export function getResult1() {
    const inputs = getInputStrings();
    const rounds: Round[] = [];
    inputs.forEach(input => {
        const double = input.replace(" ", "");
        const opponent = convertOpponentToOption(double[0] as OPPONENT_OPTION);
        const me = convertMeToOption(double[1] as MY_OPTION);
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
        const opponent = convertOpponentToOption(double[0] as OPPONENT_OPTION);
        const me = convertMeToOption(double[1] as MY_OPTION);
        const needOption = double[1] as NEED_OPTION;
        rounds.push(new Round(opponent, me, needOption))
    })

    return sumBy(rounds, (round) => {
        return round.totalScore;
    })
}