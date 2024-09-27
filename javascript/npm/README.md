# npm
<!-- npm (no capitals!) is a package manager - a gigantic repository of plugins, libraries, and other tools, which provides us with a command-line tool we can use to install these tools (that we call “packages”) in our applications. We will then have all our installed packages’ code locally, which we can import into our own files. We could even publish our own code to npm! -->

<!-- npm --save is a command used to install a package and automatically save it as a dependency in your project's package.json file. This means that when you or others clone or share your project, the specified package will be installed along with the rest of your project's dependencies. -->
<!-- This command does two things — first, it downloads all the code from the package into a folder called node_modules. Second, it automatically modifies the package.json file to keep track of the package as a project dependency. -->
<!-- This is useful later when sharing a project with others — instead of sharing the node_modules folder (which can get very large), you only need to share the package.json file and other developers can install the required packages automatically with the command npm install. -->

<!-- npm --save-dev is a command used to install a package and automatically save it as a development dependency in your project's package.json file. This is typically used for packages that are only needed during development, such as testing frameworks, linting tools, -->

# npm does not stand for "Node Package Manager"

# package.json
<!-- npm revolves around a file called package.json. It’s a JSON file containing information about our project, such as its name or any dependencies and their version numbers. npm can read this file and do things such as install all of the listed dependencies with the correct versions, and running commands that you’ve set as an npm script (we will cover npm scripts in a later lesson).
For example, here is the package.json file for The Odin Project’s curriculum repo that houses all of the lesson files (including this lesson you are doing right now): -->
{
  "name": "curriculum",
  "version": "1.0.0",
  "description": "[The Odin Project](https://www.theodinproject.com/) (TOP) is an open-source curriculum for learning full-stack web development. Our curriculum is divided into distinct courses, each covering the subject language in depth. Each course contains a listing of lessons interspersed with multiple projects. These projects give users the opportunity to practice what they are learning, thereby reinforcing and solidifying the theoretical knowledge learned in the lessons. Completed projects may then be included in the user's portfolio.",
  "scripts": {
    "lint:lesson": "markdownlint-cli2 --config lesson.markdownlint-cli2.jsonc",
    "lint:project": "markdownlint-cli2 --config project.markdownlint-cli2.jsonc",
    "fix:lesson": "markdownlint-cli2 --fix --config lesson.markdownlint-cli2.jsonc",
    "fix:project": "markdownlint-cli2 --fix --config project.markdownlint-cli2.jsonc"
  },
  "license": "CC BY-NC-SA 4.0",
  "devDependencies": {
    "markdownlint-cli2": "^0.12.1"
  }
}
<!-- There’s a lot of stuff here and we don’t need to understand it all yet. The point is that if you were to clone the curriculum repo, if you ran npm install, npm would read this package.json file and see that it needs to install the markdownlint-cli2 package. Once this package is installed, you’ll be able to run any of the four npm scripts that use that package. The curriculum repo itself does not actually contain the code for the markdownlint-cli2 package, as anyone cloning the repo can just run npm install to let npm grab the code for them. -->
<!-- In our own projects, as we use npm to install new packages (or uninstall any!), it will automatically update our package.json with any new details. We will see this in action in the next lesson when we introduce module bundling using a package called Webpack. -->

<!-- A package.json file:

lists the packages your project depends on
specifies versions of a package that your project can use using semantic versioning rules
makes your build reproducible, and therefore easier to share with other developers -->

<!-- package.json fields
Required name and version fields
A package.json file must contain "name" and "version" fields.

The "name" field contains your package's name, and must be lowercase and one word, and may contain hyphens and underscores.

The "version" field must be in the form x.x.x and follow the semantic versioning guidelines.

Author field
If you want to include package author information in "author" field, use the following format (email and website are both optional):

Your Name <email@example.com> (http://example.com) -->

<!-- Creating a new package.json file
You can create a package.json file by running a CLI questionnaire or creating a default package.json file.

Running a CLI questionnaire
To create a package.json file with values that you supply, use the npm init command.

On the command line, navigate to the root directory of your package.

cd /path/to/package
Run the following command:

npm init
Answer the questions in the command line questionnaire. -->

<!-- Creating a default package.json file
To create a default package.json using information extracted from the current directory, use the npm init command with the --yes or -y flag. For a list of default values, see "Default values extracted from the current directory".

On the command line, navigate to the root directory of your package.

cd /path/to/package
Run the following command:

npm init --yes -->
{
  "name": "my_package",
  "description": "make your package easier to find on the npm website",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/monatheoctocat/my_package/issues"
  },
  "homepage": "https://github.com/monatheoctocat/my_package"
}

<!-- Default values extracted from the current directory
name: the current directory name
version: always 1.0.0
description: info about the package, or an empty string ""
scripts: by default creates an empty test script
keywords: empty
author: empty
license: ISC
bugs: information from the current directory, if present
homepage: information from the current directory, if present -->

<!-- Setting config options for the init command
You can set default config options for the npm init command. For example, to set the default author email, author name, and license, on the command line, run the following commands: -->

> npm set init-author-email "example-user@example.com"
> npm set init-author-name "example_user"
> npm set init-license "MIT"

<!-- Any packages we install are called “dependencies”, but if any packages are only used during the development process and their code is not needed for the user-facing app (such as the Jest testing framework), we call them development dependencies. -->

# dependencies
<!-- Definition: Dependencies are external modules or libraries that your code relies on.
Purpose: They provide additional functionality, save development time, and ensure code quality. -->
<!-- Dependency Management Tools: Tools like npm, Yarn, and pip help manage dependencies, ensuring consistent versions and avoiding conflicts. -->

# Demystifying `devDependencies` and `dependencies`
<!-- If you aren't familiar, devDependencies and dependencies are two properties that are added to package.json when a package is installed as a development dependency or a production dependency, respectively. -->

<!-- In the npm ecosystem packages are installed and consumed by requiring or importing them in files, or run in the command-line as binaries. When an application is fed into a module bundler, like Webpack or Rollup, all required dependencies are pulled together and bundled (as the name suggests). You should ensure that these packages are present in dependencies, as they're needed at runtime.

Development dependencies, or devDependencies are packages that are consumed by requiring them in files or run as binaries, during the development phase. These are packages that are only necessary during development and not necessary for the production build. Some examples of packages that would only be required during development are babel plugins and presets, test runners and linter packages.

Alternatively, there is a dependency that is necessary in both production and development. In this case, it can be added to dependencies, since dependencies are available in both production and development.

I hope this explanation helps with you in deciding whether to --save-dev or --save that package, next time. -->