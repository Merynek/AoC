import {getInputStrings} from "../utils";

enum Direction {
    FORWARD = "forward",
    DOWN = "down",
    UP = "up"
}

interface ICommand {
    direction: Direction;
    units: number;
}

function getDirection(direction: string): Direction {
    switch (direction) {
        case Direction.FORWARD: return Direction.FORWARD;
        case Direction.DOWN: return Direction.DOWN;
        case Direction.UP: return Direction.UP;
        default: return Direction.UP;
    }
}

function getCommand(command: string): ICommand {
    const parsedCommand = command.split(" ");
    return {
        direction: getDirection(parsedCommand[0]),
        units: Number(parsedCommand[1])
    }
}

export function getResult1() {
    const inputs = getInputStrings();
    let horizontalPos: number = 0
    let depth: number = 0

    inputs.forEach(input => {
        const command: ICommand = getCommand(input);
        switch (command.direction) {
            case Direction.FORWARD:
                horizontalPos += command.units;
                break;
            case Direction.DOWN:
                depth += command.units;
                break;
            case Direction.UP:
                depth -= command.units;
        }
    })
    return horizontalPos * depth;
}

export function getResult2() {
    const inputs = getInputStrings();
    let horizontalPos: number = 0;
    let depth: number = 0;
    let aim: number = 0;

    inputs.forEach(input => {
        const command: ICommand = getCommand(input);
        switch (command.direction) {
            case Direction.FORWARD:
                horizontalPos += command.units;
                depth += aim * command.units;
                break;
            case Direction.DOWN:
                aim += command.units;
                break;
            case Direction.UP:
                aim -= command.units;
        }
    })
    return horizontalPos * depth;
}