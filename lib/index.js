#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newLeaf = void 0;
const commander_1 = require("commander");
const fileCreators_1 = require("./fileCreators");
/**
 * This resource was a big help when setting up this project initially:
 * https://github.com/Microsoft/TypeScript-Babel-Starter
 */
async function newLeaf() {
    commander_1.program
        .option('-p, --path <path>', 'path to component root')
        .option('-n, --component-name <name>', 'component name');
    commander_1.program.parse(process.argv);
    const path = commander_1.program.path.replace(/\/$/, '');
    const componentName = commander_1.program.componentName;
    await fileCreators_1.createDirectoryAndFiles(fileCreators_1.createFsifier(path), componentName);
    console.log(`New component created at ${path}/${componentName}/*`);
}
exports.newLeaf = newLeaf;
newLeaf();
