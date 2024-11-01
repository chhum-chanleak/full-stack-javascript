// 1. String Unions in Types
// In TypeScript, a 'string union' type is a union that restricts a value to a set of specific string literals. This is useful when you want a variable to accept only certain predefined string values, creating a kind of "enum-like" behavior without using an actual enum.

// Example of a 'String Union' Type
// Here’s a basic example that uses a 'string union' type to represent specific states:

type Status_1 = "loading" | "success" | "error";

function logStatus(status: Status_1): void {
    console.log(`Status: ${status}`);
}

// Valid calls
logStatus("loading"); // Status: loading
logStatus("success"); // Status: success

// Invalid call (will cause a TypeScript error)
// logStatus("failed");  // Error: Argument of type '"failed"' is not assignable to parameter of type 'Status'.

// Explanation:
// The 'Status_1' type is a union of specific strings: "loading" | "success" | "error".
// 'logStatus' only accepts values of type 'Status', preventing any other string from being passed to it.

// Exercise: Creating and Using String Unions
// Exercise Task
// Define a union type for 'Role' that restricts values to "admin", "user", or "guest". Then, create a function called 'assignRole_1' that takes a 'Role' as an argument and logs a specific message based on the role.
type Role_1 = "admin" | "user"| "guest";
type AssignRole_1 = (role: Role_1) => void;
const assignRole_1: AssignRole_1 = (role) => console.log(`Assigned role: ${role}`);

// const admin_1: Role_1 = "manager"; // Type '"manager"' is not assignable to type 'Role_1'.
const guest_1: Role_1 = "guest";

assignRole_1(guest_1);

// 2. Inference with Template Literals
// In TypeScript, template literal types can be used to infer parts of strings, allowing for flexible and powerful type manipulation. They’re especially useful when you want to extract specific parts of a string pattern or create new types based on dynamic string structures.

// Example of Inference with 'Template Literal' Types
// Let’s say we have a type that represents file paths, and we want to infer just the file name from a path structure:
type FilePath_1 = "home/user/document.txt" | "home/user/image.png" | "home/user/video.mp4";

type ExtractFileName_1<T> = T extends `${infer Path}/${infer FileName}` ? FileName : never;

type FileNames_1 = ExtractFileName_1<FilePath_1>; // "document.txt" | "image.png" | "video.mp4"

// Explanation:
// ExtractFileName<T> uses template literal inference to split 'T' into 'Path' and 'FileName' based on the / separator.
// If 'T' matches the pattern '${Path}/${FileName}', the type returns just 'FileName.' Otherwise, it returns 'never'.
// As a result, 'FileName's will be a union of "document.txt" | "image.png" | "video.mp4".

// Exercise: Parsing an HTTP URL with 'Template Literals'
// Exercise Task
// Define a union type, 'Url_1', containing strings for different HTTP URLs, like "http://example.com", "http://myapp.com/profile", and "http://site.com/settings". Then, create a type, 'ExtractDomain_1', that uses 'template literal' inference to extract only the domain name (e.g., example.com, myapp.com, site.com) from each 'Url' in 'Url_1'.
type Url_1 = "http://example.com" | "http://myapp.com/profile" | "http://site.com/settings";

type ExtractDomain_1<Type> = Type extends `http://${infer Domain}/${string}` 
? Domain : Type extends `http://${infer Domain}` 
? Domain : never;

type Domain_1 = ExtractDomain_1<Url_1>

// 3. 'Intrinsic String' Manipulation Types
// In TypeScript, intrinsic string manipulation types are 'utility types' that allow you to transform 'string literals' at the type level. These are especially useful when you need to enforce certain string patterns or transform strings in ways that reflect in the type system. The primary intrinsic string manipulation types in TypeScript are:

// No exercises.
// 3.1 Uppercase<StringType>
// Example: Converts each character in a 'string literal' type to uppercase.
type UppercaseHello = Uppercase<"hello">; // "HELLO"

// 3.2 Lowercase<StringType>
// Example: Converts each character in a string literal type to lowercase.
type LowercaseHello = Lowercase<"HELLO">; // "hello"

// 3.3 Capitalize<StringType>
// Example: Converts the first character of a string literal type to uppercase, leaving the rest of the characters unchanged.
type CapitalizeHello = Capitalize<"hello">; // "Hello"

// 3.4 Uncapitalize<StringType>
// Example: Converts the first character of a string literal type to lowercase, leaving the rest of the characters unchanged.
type UncapitalizeHello = Uncapitalize<"Hello">; // "hello"