# webpack
1. Bundling
2. Webpack
  <!-- When dealing with Webpack (and often with any other bundler or build tool), we have two very important directories: 'src' (short for “source”) and 'dist' (short for “'dist'ribution”). We could technically call these directories whatever we want, but these names are conventions.

  'src' is where we keep all of our website’s source code, essentially where all of our work will be done (with an exception being altering any configuration files in the root of the project). When we run Webpack to bundle our code, it will output the bundled files into the 'dist' directory. The idea is that if someone were to fork or clone the project, they would not need the 'dist' directory, as they’d just be able to run Webpack to build from 'src' into their own 'dist'. Similarly, to deploy our website, we would only need the 'dist' code and nothing else. Keep that in mind! Work inside ''src'', build into 'dist', then deploy from there! -->
3. 'src' and 'dist'
  <!-- In most projects, the directories typically have these roles:

  src (Source Directory): This is where the raw source code lives. It usually contains your original files, like .js, .ts, .scss, or other assets that need processing or compiling. You work on files in src, and these files aren’t meant to be directly served to end-users.

  dist (Distribution/Build Directory): This is the 'build' directory. After the code is processed, bundled, or compiled, the final output is placed in dist. This directory contains the optimized, ready-for-production code that is usually minified, bundled, and may include transpiled assets (like ES5-compatible JavaScript for older browsers). It’s common to deploy the dist folder as it contains everything needed to run the application. -->

4. Bundling JavaScript
5. Handling HTML
6. Loading CSS
7. Loading images
  Image files used in our CSS inside url()
  Image files we reference in our HTML template, e.g. as the src of an <img>
  Images we use in our JavaScript, where we will need to import the files
8. Webpack dev server
9. Core concepts
  Entry
  Output
  Loaders
  Plugins
  Mode
  Browser Compatibility
  Environment
10. Asset Management
  Setup
  Loading CSS
  Loading Images
  Loading Fonts
  Loading Data
    Customize parser of JSON modules
  Global Assets
  Wrapping up
  Next guide
  Further Reading
11. '.d.ts' Files
  <!-- In TypeScript, a .d.ts file is a declaration file that provides type definitions for JavaScript code. These files allow TypeScript to understand the types used in existing JavaScript libraries or modules, enabling type checking and IntelliSense (auto-completion and suggestions) in IDEs. Declaration files are particularly useful when you want to use a JavaScript library that does not have built-in TypeScript support. -->