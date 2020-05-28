#!/usr/bin/env node
import { program } from 'commander';
import { createDirectoryAndFiles, createFsifier } from './fileCreators';
/**
 * This resource was a big help when setting up this project initially:
 * https://github.com/Microsoft/TypeScript-Babel-Starter
 */
export async function newLeaf() {
    program
        .option('-p, --path <path>', 'path to component root')
        .option('-n, --component-name <name>', 'component name');
    program.parse(process.argv);
    const path = program.path.replace(/\/$/, '');
    const componentName = program.componentName;
    await createDirectoryAndFiles(createFsifier(path), componentName);
    console.log(`New component created at ${path}/${componentName}/*`);
}

newLeaf();
