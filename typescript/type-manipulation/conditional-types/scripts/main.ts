// 1. Conditional types
interface Animal {
  live(): void;
}
interface Dog extends Animal{
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

// Syntax
// SomeType extents OtherType ? TrueType : FalseType;

interface IdLabel {
  id: number /* Some fields */;
}
interface NameLabel {
  name: string /* Other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw new Error ("Unimplemented.");
}

// Equivalent to the 'overloads' above
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
const createLabel_1 = <T extends number | string>(idOrName: T): NameOrId<T> => {
  throw new Error("Unimplemented.");
};

const a = createLabel_1("Typescript");
const b = createLabel_1(2.8);
const c = createLabel_1(Math.random() ? "Hello" : 42);

// 2. Conditional type constraints
// type MessageOf<T> = T["message"]; // No
// In this example, TypeScript errors because T isn’t known to have a property called message. We could constrain T, and TypeScript would no longer complain.

type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;

// More example
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;

interface Email2 {
  message: string;
}
interface Dog2 {
  bark(): void;
}

type EmailMessageContents2 = MessageOf2<Email2>; // 'string'
type DogMessageContents2 = MessageOf2<Dog>; // 'never'

// More example
type Flatten<T> = T extends any[] ? T[number] : T;
// Extracts out the element type.
type Str = Flatten<string[]>;
// Leaves the type alone.
type Num = Flatten<number>;

// 3. Inferring with conditional types ('infer' keyword)
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;

// Example 1:
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;

type Num_1 = GetReturnType<() => number>;
type Str_1 = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

// Example 2:
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

// 4. Distributive conditional types
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<number | string>;

// Example 1:
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// 'ArrOfStrOrNum' is no longer a union.
type ArrOrStrOrNum_1 = ToArrayNonDist<string | number>;