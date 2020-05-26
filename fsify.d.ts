declare module "fsify" {
    export interface File {
        type: "file"
        name: string
        contents: string
        encoding?: string
        mode?: number //0o666
        flag?: string
    }

    export interface Directory {
        type: "directory"
        name: string
        contents: Structure
        mode?: number //0o777
    }

    export class Options {
        cwd?: string
        persistent?: boolean
        force?: boolean
    }

    export type PathComponent = File | Directory

    export type Structure = PathComponent[]

    export interface Fsify {
        (structure: Structure): Promise<Structure>
        FILE: "file"
        DIRECTORY: "directory"
    }

    function initializer(opts?: Options): Fsify
    export default initializer
}