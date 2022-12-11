import {getInputStrings} from "../utils";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";

enum ExeCommands {
    CD = "cd",
    LS = "ls"
}

class File {
    public name: string = "";
    public size: number = 0;
}

class Folder {
    public name: string = "";
    public folders: Folder[] = [];
    public files: File[] = [];
    public parent: Folder|null;

    constructor(parent: Folder) {
        this.parent = parent;
    }

    get size(): number {
        return this.filesSize + this.foldersSize;
    }

    get filesSize(): number {
        return sumBy(this.files.map(f => f.size));
    }

    get foldersSize(): number {
        return sumBy(this.folders.map(folder => folder.size));
    }

    public findFolderByName(name: string): Folder|undefined {
        return this.folders.find(f => f.name === name);
    }

    get allFlatFolders(): Folder[] {
        const folders: Folder[] = [];
        this.folders.forEach(folder => {
            folders.push(folder);
            if (folder.folders.length) {
                folders.push(...folder.allFlatFolders);
            }
        })
        return folders;
    }
}

class FileSystem {
    public totalSpace: number = 70000000;
    public needSpaceForUpdate: number = 30000000;
    public lines: string[];
    public currentLineIndex: number = 0;
    public rootFolder: Folder;
    public currentPosition: Folder;

    constructor(lines: string[]) {
        const rootFolder = new Folder(null);
        rootFolder.name = "root";
        this.rootFolder = rootFolder;
        this.currentPosition = rootFolder;
        this.lines = lines;
    }

    get smallestFolderSizeNeedToBeDeletedForUpdate(): number {
        const folders = this.flatFolders;
        const orderedFolders: Folder[] = orderBy(folders, (folder: Folder) => {
            return folder.size;
        }, ["asc"])
        const smallest = orderedFolders.find(folder => {
            return folder.size + this.currentFreeSpace >= this.needSpaceForUpdate;
        })
        return smallest.size;
    }

    get currentFreeSpace() {
        return this.totalSpace - this.rootFolder.size;
    }

    get flatFolders(): Folder[] {
        return [this.rootFolder, ...this.rootFolder.allFlatFolders];
    }

    get foldersAtMost100000Size() {
        return this.flatFolders.filter(folder => folder.size <= 100000);
    }

    get sumOfExample1(): number {
        return sumBy(this.foldersAtMost100000Size, (folder: Folder) => {
            return folder.size;
        })
    }

    public execute(command: ExeCommands, param: string) {
        switch (command) {
            case ExeCommands.CD:
                switch (param) {
                    case "/":
                        this.currentPosition = this.rootFolder;
                        break;
                    case "..":
                        this.currentPosition = this.currentPosition.parent;
                        break;
                    default:
                        const foundFolder = this.currentPosition.findFolderByName(param);
                        if (foundFolder) {
                            this.currentPosition = foundFolder;
                        }
                }
                break;
            case ExeCommands.LS:
                break;
        }
    }

    public addFolder(folder: Folder) {
        this.currentPosition.folders.push(folder);
    }

    public addFile(file: File) {
        this.currentPosition.files.push(file)
    }

    public readLines() {
        const line = this.lines[this.currentLineIndex];
        if (!line) {
            return;
        }
        this.currentLineIndex++;
        const parts = line.split(" ");
        switch (parts[0]) {
            case "$":
                this.execute(parts[1] as ExeCommands, parts[2] || "");
                break;
            case "dir":
                const newFolder = new Folder(this.currentPosition);
                newFolder.name = parts[1];
                this.addFolder(newFolder);
                break;
            default:
                const newFile = new File();
                newFile.size = Number(parts[0]);
                newFile.name = parts[1];
                this.addFile(newFile);
        }
        this.readLines();
    }
}

export function getResult1() {
    const fileSystem = new FileSystem(getInputStrings());
    fileSystem.readLines()
    return fileSystem.sumOfExample1;
}

export function getResult2() {
    const fileSystem = new FileSystem(getInputStrings());
    fileSystem.readLines()
    return fileSystem.smallestFolderSizeNeedToBeDeletedForUpdate;
}