# Focus Log

A simple web extension that helps you keep track of what you did.

Focus Log is a simple yet powerful extension designed to help you stay focused and keep track of your daily tasks. Easily set your current focus with just a click, and the extension's icon will change color, reminding you of your active focus at a glance. When you're ready, you can log your completed task and clear your focus with a single click. Originally built for internal use, we're excited to share it with everyone who wants a simple, no-frills way to track their work.

[Chrome Web Store](https://chromewebstore.google.com/detail/focus-log/pgoamholhbaeiokhfcchhbaicndfpcjn)
[Mozilla Firefox Addons](https://addons.mozilla.org/de/firefox/addon/focus-log/)

## Building

To build the project, first install the dependencies with `npm i` and run `npm run build` to build the extension. If you are using Google Chrome you can then load the extension in Settings/Extensions by clicking on "Load unpacked" and selecting the `dist` folder of this project.

Currently the package @userbrain/ui is not published to npm, so you will have to clone the repository and run `npm link` in the root folder of the package and `npm link @userbrain/ui` in the root folder of this project.
