"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileCreators_1 = require("./fileCreators");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const rimraf_1 = __importDefault(require("rimraf"));
const fsify_1 = __importDefault(require("fsify"));
describe('fileCreators', () => {
    describe('createDirectoryAndFiles', () => {
        const tempDir = os_1.default.tmpdir();
        const fsifier = fsify_1.default({
            cwd: tempDir,
            persistent: false,
            force: true
        });
        afterEach(async () => {
            const testDir = `${tempDir}/MyComponent`;
            rimraf_1.default.sync(testDir);
        });
        it('creates directory in path', async () => {
            await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs_1.default.existsSync(`${tempDir}/MyComponent`)).toBe(true);
        });
        it('creates component typescript file', async () => {
            await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs_1.default.existsSync(`${tempDir}/MyComponent/MyComponent.tsx`)).toBe(true);
        });
        it('creates test file', async () => {
            await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs_1.default.existsSync(`${tempDir}/MyComponent/MyComponent.test.tsx`)).toBe(true);
        });
        it('creates sass file', async () => {
            await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
            expect(fs_1.default.existsSync(`${tempDir}/MyComponent/MyComponent.scss`)).toBe(true);
        });
        describe('test file', () => {
            it('includes test for rendering component', async () => {
                await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs_1.default.readFileSync(`${tempDir}/MyComponent/MyComponent.test.tsx`, 'utf8');
                expect(fileContents).toContain(`expect(container).toBeDefined();`);
            });
        });
        describe('scss file', () => {
            it('includes component class', async () => {
                await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs_1.default.readFileSync(`${tempDir}/MyComponent/MyComponent.scss`, 'utf8');
                expect(fileContents).toContain(`MyComponent {`);
            });
        });
        describe('code file', () => {
            it('includes function component definition', async () => {
                await fileCreators_1.createDirectoryAndFiles(fsifier, 'MyComponent');
                const fileContents = fs_1.default.readFileSync(`${tempDir}/MyComponent/MyComponent.tsx`, 'utf8');
                expect(fileContents).toContain(`export const MyComponent:FunctionComponent<MyComponentProps> = ({}) => {`);
            });
        });
    });
});
