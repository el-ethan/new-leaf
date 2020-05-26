import { Fsify, Structure } from 'fsify';
import fsify from 'fsify';


export function createFsifier(path:string):Fsify {
    return fsify({cwd: path, persistent: true});
}


const getTestFileContents = (componentName:string):string => {
    return `import React from 'react';
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
});`;
}

const getScssFileContents = (componentName:string):string => {
    return `${componentName} {

}`;
}

const getCodeFileContents = (componentName: string):string => {
    return `import React, { FunctionComponent } from 'react';
import './${componentName}.scss';


interface ${componentName}Props {

}

export const ${componentName}:FunctionComponent<${componentName}Props> = ({}) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}`;
}

export function createDirectoryAndFiles(fsifier: Fsify, componentName: string) {
    const filesStructure: Structure = [
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
            ] as Structure
        }
    ];

    return fsifier(filesStructure);
}