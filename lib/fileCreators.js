"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectoryAndFiles = void 0;
const fsify_1 = __importDefault(require("fsify"));
function createFsifier(path) {
    return fsify_1.default({ cwd: path });
}
const getTestFileContents = (componentName) => {
    return `
    import React from 'react';
    import '@testing-library/jest-dom';
    import { render } from '@testing-library/react';

    import { ${componentName} } from './${componentName}';


    describe('${componentName}', () => {
        it('renders', () => {
            const { container } = render(<${componentName}></${componentName}>);
            expect(container).toBeDefined();
        });

        it('does something else', () => {
            const { getByTestId } = render(<${componentName}></${componentName}>);
            expect(getByTestId('id')).toBeDefined();
        });
    });
    `;
};
const getScssFileContents = (componentName) => {
    return `
    ${componentName} {

    }
    `;
};
const getCodeFileContents = (componentName) => {
    return `
    import React, { FunctionComponent } from 'react';


    interface ${componentName}Props {

    }

    export const ${componentName}:FunctionComponent<${componentName}Props> = ({}) => {
        return (
            <div></div>
        );
    }
    `;
};
function createDirectoryAndFiles(fsifier, componentName) {
    const filesStructure = [
        {
            type: fsifier.DIRECTORY,
            name: componentName,
            contents: [
                {
                    type: fsifier.FILE,
                    name: `${componentName}.tsx`,
                    contents: getCodeFileContents(componentName)
                },
                {
                    type: fsifier.FILE,
                    name: `${componentName}.test.tsx`,
                    contents: getTestFileContents(componentName)
                },
                {
                    type: fsifier.FILE,
                    name: `${componentName}.scss`,
                    contents: getScssFileContents(componentName)
                }
            ]
        }
    ];
    return fsifier(filesStructure);
}
exports.createDirectoryAndFiles = createDirectoryAndFiles;
