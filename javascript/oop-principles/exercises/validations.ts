import { errorMessages } from "./errors.js";

// Validation functions

// Validate key-value pair
export const validateShapeData = <Key, Value>(key: Key, value: Value) =>  {
  if (!key || !value) {
    console.error(`${errorMessages.MISSING_NAME_SERVICE_PARAMETERS}`);

    return false;
  }

  return true;
}

// Validate existence
export const validateExistence = <Key, Value>(key: Key): boolean => {
  const value: Map<Key, Value> = new Map();

  if (!value.has(key)) {
    return false;
  }

  return true;
}