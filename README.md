> This is how I set up Vite to meet my requirements for building a Web Extension for Google Chrome, since other Browsers also support Web Extensions with Manifest v3 it should also apply to Firefox, Edge and Safari.

## Building

To build the project, first install the dependencies with `npm i` and run `npm run build` to build the extension. If you are using Google Chrome you can then load the extension in Settings/Extensions by clicking on "Load unpacked" and selecting the `dist` folder of this project.