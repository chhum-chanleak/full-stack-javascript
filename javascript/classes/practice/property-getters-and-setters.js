// 1. Getters and setters
const accessors = (() => {
  const obj = {
    get propName() {
      // getter, the code executed on getting obj.propName
    },

    set propName(value) {
      // setter, the code executed on setting obj.propName = value
    }
  };

  const user = {
    name: "John",
    surname: "Smith"
  };

  // Set variables and/or functions to public.
  return {
    get fullName() {
      return `${user.name} ${user.surname}`;
    },

    set fullName(value) {
      [user.name, user.surname] = value.split(" ");
    },
    obj,
  };
})();

// Getters and setters are properties, so we don't call them using ().
accessors.fullName; // output: "John Smith"
// After implementing setter(fullName(value)), we can do this.
accessors.fullName = "Alice Cooper";
accessors.fullName; // output: "Alice Cooper"

// 2. Accessor descriptors
const descriptors = (() => {
  let user = {
    name: "John",
    surname: "Smith"
  };

  Object.defineProperty(user, "fullName", {
    get() {
      return `${user.name} ${user.surname}`;
    },

    set(value) {
      [user.name, user.name] = value.split(" ");
    }
  });
})();

// descriptors.user.fullName; // output: "John Smith";

try {
  // If this statement throw an Error
  descriptors.fullName;
} catch(error) {
  // Print the Error message
  console.log(error);
};

let user = {
  name: "notJohn",
  surname: "notSmith"
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${user.name} ${user.surname}`;
  },

  set(value) {
    [user.name, user.name] = value.split(" ");
  },
  // Set 'fullName' to be enumerable.
  enumerable: true,
});

user.fullName; // output: "notJohn notSmith"

// 3. Smarter getters/setter
smartAccessors = (() => {
  // By convention(tradition), variables start with underscore('_') are considered internal(private) variables and should not be touched by external code.
  // Technically, it can be accessed by external code, but not recommended.
  let _name = ''; 

  const user = {
    get name() {
      return _name;
    },

    set name(value) {
      if (value.length < 4) {
        console.log('Name is too short, need at least 4 characters.');
        return;
      }
      _name = value;
    }
  };
  // Set variables and/or functions to public.
  return {
    user,
  };
})();

smartAccessors.user.name; // output: ''
smartAccessors.user.name = 'Chhum';
smartAccessors.user.name; // output: "Chhum"
// output: 'Name is too short, need at least 4 characters.'
smartAccessors.user.name = 'Chu';

// 4. Using for compatibility
// Original
const User = function(name, age) {
  this.name = name;
  this.age = age;
};

const john = new User("John", 25);

john.age; // output: 25;

// Updated
// Take control over a “regular” data property(birthday) at any moment by replacing it with a getter and a setter and tweak its behavior.
const User1 = function(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get () {
      // Initialize todayYear and set it to current year.
      const todayYear = new Date().getFullYear();

      return todayYear - this.birthday.getFullYear();
    },
  });
};

const john1 = new User1('John1', new Date(1992, 6, 1));
// output: 'Wed Jul 01 1992 00:00:00 GMT+0700 (Indochina Time)'
john1.birthday;
john1.age; // output: 32