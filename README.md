# starfront
<img src="https://user-images.githubusercontent.com/14197491/210906219-a544ac0f-4b60-488c-ab3c-32afcf64aee6.png" width="100" height="100" />

Browser extension realised with TS, React + Redux (wrapped with [webext-redux](https://github.com/tshaddix/webext-redux) in order to sync across the extension's components)

## Running

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Go to Chrome extensions page (chrome://extensions/), check the developer mode and load unpacked the `dev` folder from your project. 
You should see the extension added in your browser now. To test it, go to any Youtube page and click the button that appears next to the like button.
A menu should appear on the page

### `npm run build`

Builds the app for production to the `build` folder.\
Repeat the steps from the development mode, only with the `build` folder.
