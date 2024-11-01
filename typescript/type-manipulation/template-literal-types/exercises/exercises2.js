function logStatus_2(status) {
    console.log(`Status: ${status}`);
}
// Valid calls
logStatus_2("loading"); // Status: loading
logStatus_2("success"); // Status: success
const assignRole_2 = (role) => console.log(role);
assignRole_2("admin"); // Yes
export {};
