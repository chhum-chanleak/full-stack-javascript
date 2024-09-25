// 1. Getters and setters
// Syntax
class Accessor {
  constructor(type) {
    this.type = type;
  }
  get accessorType() {
    // This is a getter, the code executed on getting obj.accessorType
    return this.type;
  }

  set accessorType(value) {
     // setter, the code executed on setting obj.accessorType = value
    this.type = value;
  }
}

const getAccessor = new Accessor('get');

// Getters and setters are properties, so we don't call them using ().

// 2. Accessor descriptors
class Descriptor {
  #name;
  #surname;
  constructor(name, surname) {
    this.#name = name;
    this.#surname = surname;

    // When using Object.definedProperty() in a class body, one should use it inside the class's constructor itself.
    Object.defineProperty(this, "fullName", {
      get() {
        return `${this.#name} ${this.#surname}`;
      },

      set(value) {
        const name = value.split(' ');
        const [firstName, lastName] = name;

        this.#name = firstName;
        this.#surname = lastName;
      }
    });
  }
}

const descri = new Descriptor('No', 'One');

