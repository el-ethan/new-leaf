import { createDirectoryAndFiles } from "./fileCreators";
import fs from 'fs';
import os from 'os';
import rimraf from 'rimraf';
import fsify from 'fsify';


describe('fileCreators', () => {
    describe('createDirectoryAndFiles', () => {
        const tempDir = os.tmpdir();
        const fsifier = fsify(
            {
                cwd: tempDir,
            }
        );

        afterEach( async () => {
            const testDir = `${tempDir}/MyComponent`;
            rimraf.sync(testDir);
        });

        it('creates directory in path', async () => {
            await createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs.existsSync(`${tempDir}/MyComponent`)).toBe(true);
        });

        it('creates component typescript file', async () => {
            await createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs.existsSync(`${tempDir}/MyComponent/MyComponent.tsx`)).toBe(true);
        });

        it('creates test file', async () => {
            await createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs.existsSync(`${tempDir}/MyComponent/MyComponent.test.tsx`)).toBe(true);
        });

        it('creates sass file', async () => {
            await createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs.existsSync(`${tempDir}/MyComponent/MyComponent.scss`)).toBe(true);
        })

        it('does not add extra level of indentation', async () => {
            await createDirectoryAndFiles(fsifier, 'MyComponent');
            const fileContents = fs.readFileSync(`${tempDir}/MyComponent/MyComponent.tsx`, 'utf8');
            expect(fileContents).not.toContain(`    import`);
        });

        describe('test file', () => {
            it('includes test for rendering component', async () => {
                await createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs.readFileSync(`${tempDir}/MyComponent/MyComponent.test.tsx`, 'utf8');
                expect(fileContents).toContain(`expect(container).toBeDefined();`);
            });
        });

        describe('scss file', () => {
            it('includes component class', async () => {
                await createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs.readFileSync(`${tempDir}/MyComponent/MyComponent.scss`, 'utf8');
                expect(fileContents).toContain(`MyComponent {`);
            });
        });

        describe('code file', () => {
            it('includes function component definition', async () => {
                await createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs.readFileSync(`${tempDir}/MyComponent/MyComponent.tsx`, 'utf8');
                expect(fileContents).toContain(`export const MyComponent:FunctionComponent<MyComponentProps> = ({}) => {`);
            });
        });
    });
});