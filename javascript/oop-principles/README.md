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