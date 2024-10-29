// 1. Mapped types
// type OnlyBoolsAndHorses = {
//   [key: string]: boolean | Horse;
// };

// const conforms: OnlyBoolsAndHorses = {
//   del: true,
//   rodney: false,
// };

// In this example, 'OptionsFlags' will take all the properties from the type 'Type' and change their values to be a boolean.
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeaturesOptions = OptionsFlags<Features>;

// 2. Mapping modifier

// Removes 'readonly' attributes from a types properties.
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string,
  readonly name: string,
};

type UnlockedAccounted = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string,
  name?: string,
  age?: number,
};

type User0 = Concrete<MaybeUser>;

// 3. Key Remapping via 'as'

// Syntax
// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as NewKeyType]: Type[Properties];
// };

// Using `template literal`
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person_3 {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person_3>;

// Filter using 'never'

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

// Map over arbitrary unions
type EventConfiq<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfiq<SquareEvent | CircleEvent>;

// 4. Further exploration

// Map using a conditional type
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string, pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;