# ES6 modules

# import and export

# import
<!-- The static import declaration is used to import read-only live bindings which are exported by another module. The imported bindings are called live bindings because they are updated by the module that exported the binding, but cannot be re-assigned by the importing module. -->
<!-- import declarations can only be present in modules, and only at the top-level (i.e. not inside blocks, functions, etc.). If an import declaration is encountered in non-module contexts (for example, <script> tags without type="module", eval, new Function, which all have "script" or "function body" as parsing goals), a SyntaxError is thrown. To load modules in non-module contexts, use the dynamic import syntax instead. -->
# export
<!-- The export declaration is used to export values from a JavaScript module. Exported values can then be imported into other programs with the import declaration or dynamic import. The value of an imported binding is subject to change in the module that exports it — when a module updates the value of a binding that it exports, the update will be visible in its imported value. -->
# Named export/import
export { cube, foo, graph };
import { myExport } from "/modules/my-module.js";
import { foo, bar } from "/modules/my-module.js";
import { reallyReallyLongModuleExportName as shortName } from "/modules/my-module.js";
import { "a-b" as a } from "/modules/my-module.js";
# Default export/import
<!-- If we want to export a single value or to have a fallback value for your module, you could use a default export: -->
<!-- The export default syntax allows any expression. -->
export default 1 + 1;
import myDefault from "/modules/my-module.js";
import myDefault, { foo, bar } from "/modules/my-module.js";
import { default as myDefault } from "/modules/my-module.js";
# Namespace export/import
<!-- Named exports are useful when you need to export several values. When importing this module, named exports must be referred to by the exact same name (optionally renaming it with as), but the default export can be imported with any name. For example: -->
export { myFunction as function1, myVariable as variable };
import * as myModule from "/modules/my-module.js";
# Side effect export/import
import "/modules/my-module.js";
<!-- Side effects in programming are primarily associated with mutation.
Mutation refers to the act of modifying the state of a variable or data structure within a function or block of code. When a function alters the values of variables outside its scope, it's said to have a 'side effect'. -->
<!-- The identifier being imported is a live binding, because the module exporting it may re-assign it and the imported value would change. However, the module importing it cannot re-assign it. Still, any module holding an exported object can mutate the object, and the mutated value can be observed by all other modules importing the same value. -->
# Hoisting
<!-- Import declarations are hoisted. In this case, that means that the identifiers the imports introduce are available in the entire module scope, and their side effects are produced before the rest of the module's code runs. -->
# Entry points
<!-- The Starting Points of Execution
In programming, an entry point is the designated starting point from which the execution of a program or module begins. It's the initial point of control that sets the flow of the application. -->
# Re-exporting / Aggregating
<!-- A module can also "relay" values exported from other modules without the hassle of writing two separate import/export statements. This is often useful when creating a single module concentrating various exports from various modules (usually called a "barrel module"). -->
<!-- Attempting to import the duplicate name directly will throw an error. -->
<!-- The "export from" syntax allows the 'as' token to be omitted, which makes the default export still re-exported as default export. -->
<!-- export from supports all features that import supports — for example, import attributes: -->
export { default } from "./data.json" with { type: "json" }; <!-- export/import attributes -->
import { default as function1, function2 } from "bar.js";
export { function1, function2 };
<!-- In parentModule.js Only aggregating the exports from childModule1 and childModule2 to re-export them -->
export { myFunction, myVariable } from "childModule1.js";
export { MyClass } from "childModule2.js";
<!-- In top-level module We can consume the exports from a single module since parentModule "collected"/"bundled" them in a single source -->
import { myFunction, myVariable, MyClass } from "parentModule.js";
# Identifiers
<!-- Identifiers in JavaScript
Identifiers are names given to variables, functions, classes, and other entities in JavaScript. They serve as labels that allow you to refer to and manipulate these entities within your code. -->
# Bindings
<!-- Imported Bindings in JavaScript
Imported bindings in JavaScript refer to the entities (variables, functions, classes, etc.) that are made accessible from other modules or scripts through the import statement. This mechanism allows for modularization, code organization, and reusability. -->
# Dynamic import
<!-- Dynamic imports in JavaScript allow you to load modules asynchronously at runtime, providing greater flexibility and control over your application's structure and behavior. This is particularly useful for code splitting, lazy loading, and conditional loading of modules. -->
<!-- import('./modulePath')
  .then(module => {
    // Use the imported module here
  })
  .catch(error => {
    // Handle import errors
  }); -->
# <script type="module"></script>

# CommonJS modules
<!-- module.exports.add = function(a, b) {
        return a + b;
} 

module.exports.subtract = function(a, b) {
        return a - b;
}

const {add, subtract} = require('./util')

console.log(add(5, 5)) // 10
console.log(subtract(10, 5)) // 5 -->