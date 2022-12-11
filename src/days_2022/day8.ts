import {getInputStrings, getMatrixString} from "../utils";
import maxBy from "lodash/maxBy";
import sum from "lodash/sum";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";

interface Coordinates {
    x: number;
    y: number;
}

interface ITree {
    height: number;
    cord: Coordinates;
    seeTrees: number;
    isVisible: boolean;
}

class Map {
    public matrix: number[][] = [];

    constructor(map: number[][]) {
        this.matrix = map;
    }

    get edgeTrees(): number {
        return (this.matrix.length * 2) + ((this.matrix[0].length - 2) * 2);
    }

    get countOfInnerVisibleTrees(): number {
        return sumBy(this.computedTrees, (tree: ITree) => {
            return tree.isVisible;
        })
    }

    get highestTree(): ITree {
        return orderBy(this.computedTrees, (tree: ITree) => {
            return tree.seeTrees;
        }, ["desc"])[0];
    }

    get computedTrees(): ITree[] {
        const trees: ITree[] = []
        for (let y = 1; y < this.matrix.length - 1; y++) {
            for (let x = 1; x < this.matrix[0].length - 1; x++) {
                const tree: ITree = {
                    height: this.matrix[y][x],
                    cord: {y, x},
                    seeTrees: 1,
                    isVisible: false
                };
                if (this.treeIsVisible(tree)) {
                    tree.isVisible = true;
                }
                this.setSideTreesVision(tree);
                this.setTopBottomTreesVision(tree);
                trees.push(tree);
            }
        }
        return trees;
    }

    private treeIsVisible(tree: ITree) {
        const sideVisible = this.isSideVisible(tree);
        if (!sideVisible) {
            return this.isTopBottomVisible(tree)
        }
        return true;
    }

    private setSideTreesVision(tree: ITree) {
        let heights: number[] = [];
        let sees = 0;
        for (let x = tree.cord.x - 1; x >= 0; x--) {
            heights.push(this.matrix[tree.cord.y][x]);
            if (!this.hasBlockingTrees(heights, tree.height)) {
                sees++;
            } else {
                sees++;
                break;
            }
        }
        tree.seeTrees *= sees;
        sees = 0;
        heights = [];
        for (let x = tree.cord.x + 1; x < this.matrix[0].length; x++) {
            heights.push(this.matrix[tree.cord.y][x]);
            if (!this.hasBlockingTrees(heights, tree.height)) {
                sees++;
            } else {
                sees++;
                break;
            }
        }
        tree.seeTrees *= sees;
    }

    private setTopBottomTreesVision(tree: ITree) {
        let heights: number[] = [];
        let sees = 0;
        for (let y = tree.cord.y - 1; y >= 0; y--) {
            heights.push(this.matrix[y][tree.cord.x]);
            if (!this.hasBlockingTrees(heights, tree.height)) {
                sees++;
            } else {
                sees++;
                break;
            }
        }
        tree.seeTrees *= sees;
        sees = 0;
        heights = [];
        for (let y = tree.cord.y + 1; y < this.matrix.length; y++) {
            heights.push(this.matrix[y][tree.cord.x]);
            if (!this.hasBlockingTrees(heights, tree.height)) {
                sees++;
            } else {
                sees++;
                break;
            }
        }
        tree.seeTrees *= sees;
    }

    private isSideVisible(tree: ITree): boolean {
        let heights: number[] = [];

        for (let x = 0; x < this.matrix[0].length; x++) {
            if (x === tree.cord.x) {
                if (!this.hasBlockingTrees(heights, tree.height)) {
                    return true;
                }
                heights = [];
                continue;
            }
            heights.push(this.matrix[tree.cord.y][x]);
        }
        return !this.hasBlockingTrees(heights, tree.height);
    }

    private isTopBottomVisible(tree: ITree): boolean {
        let heights: number[] = [];

        for (let y = 0; y < this.matrix.length; y++) {
            if (y === tree.cord.y) {
                if (!this.hasBlockingTrees(heights, tree.height)) {
                    return true;
                }
                heights = [];
                continue;
            }
            heights.push(this.matrix[y][tree.cord.x]);
        }
        return !this.hasBlockingTrees(heights, tree.height)
    }

    private hasBlockingTrees(trees: number[], height: number) {
        const biggerOrSameTrees = trees.filter(h => h >= height);
        return biggerOrSameTrees.length !== 0;
    }
}

export function getResult1() {
    const matrix = getMatrixString();
    const map = new Map(matrix);

    return map.countOfInnerVisibleTrees + map.edgeTrees;
}

export function getResult2() {
    const matrix = getMatrixString();
    const map = new Map(matrix);

    return map.highestTree.seeTrees
}