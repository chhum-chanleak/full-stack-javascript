// 1. Template literal types
type World = "world";
type Greeting = `Hello ${World}`;

// union
type EmailLocaleIDs = "welcome_email" | "email-heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

// Distribute '_id' to the end of each literal type.
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// For each interpolated position in the template literal, the unions are cross multiplied(cross distributed):
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// 2. String unions in types
const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

// const person = makeWatchedObject({
//   firstName: "Saoirse",
//   lastName: "Ronan",
//   age: 26,
// });

// // makeWatchedObject has added `on` to the anonymous Object.

// person.on("firstNameChanged", (newValue) => {
//   console.log(`firstName was changed to ${newValue}!`);
// })

// Object.keys(passedObject).map(x => `${x}Changed`), template literals inside the type system provide a similar approach to string manipulation:

// type PropEventSource<Type> = {
//   on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;

//   // Create a "watched object" with an `on` method
//   // so that you can watch for changes to properties.
//   declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
// };

// 3. Inference with template literals
// type PropEventSource<Type> = {
//   on<Key extends string & keyof Type>
//       (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
// };

// declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

// const person = makeWatchedObject({
// firstName: "Saoirse",
// lastName: "Ronan",
// age: 26
// });

// person.on("firstNameChanged", newName => {
                              
// (parameter) newName: string
//   console.log(`new name is ${newName.toUpperCase()}`);
// });

// person.on("ageChanged", newAge => {
                        
// (parameter) newAge: number
//   if (newAge < 0) {
//       console.warn("warning! negative age");
//   }
// })

// 4. Intrinsic String Manipulation Types
// 4.1 Uppercase<StringType>
// Converts each character in the string to the uppercase version.
type Greeting_1 = "Hello, world!";
type ShoutGreeting = Uppercase<Greeting_1>; // 'HELLO, WORLD!";

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;

// 4.2 Lowercase<StringType>
// Converts each character in the string to the lowercase equivalent.
type Greeting_2 = "Hello, world!";
type QuietGreeting = Lowercase<Greeting_2>;

type ASCIICacheKey_2<Str extends string> = `id-${Lowercase<Str>}`;
type MainID_2 = ASCIICacheKey_2<"MY_APP">;

// 4.3 Capitalize<StringType>
// Converts the first character in the string to an uppercase equivalent.
type LowercaseGreeting = "hello, world!";
type Greeting_3 = Capitalize<LowercaseGreeting>;

// 4.4 Uncapitalize<StringType>
// Converts the first character in the string to a lowercase equivalent.
type UppercaseGreeting = "HELLO, WORLD!";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;