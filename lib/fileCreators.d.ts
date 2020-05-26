import { Fsify, Structure } from 'fsify';
export declare function createFsifier(path: string): Fsify;
export declare function createDirectoryAndFiles(fsifier: Fsify, componentName: string): Promise<Structure>;
