# oop-principles

SOLID principles
  1. Single responsibility
  2. Open-closed
  3. Liskov substitution
  4. Interface segregation
  5. Dependency inversion
Loosely coupled objects
Separating core logic and DOM logic
Coupling
Patterns to Reduce Coupling
Publish/Subscribe pattern
Service registry pattern
Repository pattern
DAOs pattern
new Map()

Using Constants for Error Messages
Throwing an error instead of logging a plain message:
  Throwing an error gives you more control over how the application responds to failure. It is safe for Business Logic and Integrity
Separating Validation logics from core logic
Using Optional Chaining for Safety
Consistency in Error Handling
Improve the Logging Strategy
console.error() does not stop the program
Throwing new Error() stops the program
Using Constants for Error Messages
  Example: // errors.ts
    export const ErrorMessages = {
      MISSING_NAME_SHAPE_PARAMETERS: "name and shape parameters are required",
      SHAPE_NOT_FOUND: "Shape not found in the registry",
      SHAPE_ALREADY_EXISTS: "Shape already exists in the registry",
      INVALID_SHAPE_TYPE: "Invalid shape type provided",
      // Add more as needed
    };
Refactoring Repeated Logic

Programmers should adhere to :
  1. Standard
  2. Principles(SOLID)
  3. Design patterns
    Singleton(creational)
    Factory(creational)
    Adapter(structural)
    Observer(behavioral)
  4. Naming strategy
    Avoid type information or unnecessary encodings
      Do: "const p = unit.parts[42]"
      Don't: "const p = uni.partList[42]"
    Expand abbreviations
      Do: "const part = unit.parts[42]"
      Don't: "const p = unit.parts[42]"
    Use clear distinction
      Do: "const organ = viewer.organs[42]"
      Don't: "const part = unit.parts[42]"
    No magic values
      Do: "
        const BRAIN = 42
        const organ = viewer.organs[BRAIN]
      "
      Don't: "const organ = viewer.organs[42]"
    Be descriptive
      Do: "
        const BRAIN_INDEX = 42
        const organ = viewer.organs[BRAIN_INDEX]
      "
  5. Test
        End-to-end
        Unit
        Integration
  6. Time (It takes time to get used to these SOLID principles. Set reasonable and reachable goal)