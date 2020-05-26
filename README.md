# New Leaf

New Leaf is a tool for quickly scaffolding a new React component following a very specific structure. Running the command will create the shell of a React component in a `.tsx` file, with an interface for its props, along with a test file `.test.tsx` and a stylesheet `.scss`. All of these files will be contained inside a new folder with the same name as the component.

# Usage

No need to install the package. You can simply run using `npx` like this:

```
$ npx new-leaf -p '/tmp/' -n 'MyNewComponent'
```

This command will create the following file structure in `/tmp/`:

```
/tmp/
  └── MyNewComponent/
           ├── MyNewComponent.tsx
           ├── MyNewComponent.test.tsx
           └── MyNewComponent.scss
```

The files will contain the following boilerplate (boilerplate subject to change):

```typescript
// MyNewComponent.tsx
import React, { FunctionComponent } from 'react';
import './MyNewComponent.scss';


interface MyNewComponentProps {

}

export const MyNewComponent:FunctionComponent<MyNewComponentProps> = ({}) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}
```

```typescript
// MyNewComponent.test.tsx
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { MyNewComponent } from './MyNewComponent';


describe('MyNewComponent', () => {
    it('renders', () => {
        const { container } = render(<MyNewComponent></MyNewComponent>);
        expect(container).toBeDefined();
    });

    it('does something else', () => {
        const { getByTestId } = render(<MyNewComponent></MyNewComponent>);
        expect(getByTestId('id')).toBeDefined();
    });
});
```

```css
/* MyNewComponent.scss */
MyNewComponent {

}
```