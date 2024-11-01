"use strict";
// 1. String Unions in Types
// In TypeScript, a 'string union' type is a union that restricts a value to a set of specific string literals. This is useful when you want a variable to accept only certain predefined string values, creating a kind of "enum-like" behavior without using an actual enum.
function logStatus(status) {
    console.log(`Status: ${status}`);
}
// Valid calls
logStatus("loading"); // Status: loading
logStatus("success"); // Status: success
const assignRole_1 = (role) => console.log(`Assigned role: ${role}`);
// const admin_1: Role_1 = "manager"; // Type '"manager"' is not assignable to type 'Role_1'.
const guest_1 = "guest";
assignRole_1(guest_1);
