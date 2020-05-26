#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boost = void 0;
const commander_1 = require("commander");
/**
 * This resource was a big help when setting up this project initially:
 * https://github.com/Microsoft/TypeScript-Babel-Starter
 */
function boost() {
    commander_1.program
        .option('-p, --path <value>', 'path to component root')
        .option('-n, --name <value>', 'component name');
    commander_1.program.parse(process.argv);
    console.log('********************');
    console.log(commander_1.program.path);
    console.log(commander_1.program.name);
    console.log(process.argv);
    console.log('********************');
    // createDirectoryAndFiles(createFsifier(program.pathValue), program.nameValue);
}
exports.boost = boost;
boost();
