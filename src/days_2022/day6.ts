import {getInputNumbers, getInputStrings} from "../utils";
import maxBy from "lodash/maxBy";
import sum from "lodash/sum";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";

export function getResult1() {
    const input = getInputStrings()[0];
    const inputs = input.split("");
    let check = "";
    let result = 0;
    for (let i = 0; i < inputs.length; i++) {
        const char = inputs[i];
        const charIndex = check.indexOf(char);
        if (charIndex > -1) {
            check = check.slice(charIndex + 1, check.length);
            result = i;
        }
        check += char;
        if (check.length === 14) {
            result = i + 1;
            break;
        }
    }

    return result;
}

export function getResult2() {
    const inputs = getInputStrings();

    return 1;
}