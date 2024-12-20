import { errorMessages } from "./errors.js";
// Validation functions
// Validate key-value pair
export const validateShapeData = (key, value) => {
    if (!key || !value) {
        console.error(`${errorMessages.MISSING_NAME_SERVICE_PARAMETERS}`);
        return false;
    }
    return true;
};
// Validate existence
export const validateExistence = (key) => {
    const value = new Map();
    if (!value.has(key)) {
        return false;
    }
    return true;
};
