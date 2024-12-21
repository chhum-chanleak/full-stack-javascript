import { LoggerService } from "./exercises.js";
import { errorMessages } from "./errors.js";
// Validators for Order
export const validateUniqueName = (name, services) => {
    try {
        if (services.getServices().has(name)) {
            throw new Error(`${name} ${errorMessages.ALREADY_EXIST}`);
        }
    }
    catch (error) {
        (new LoggerService()).log(`Error registering service: ${error.message}`, "error");
        return false;
    }
    return true;
};
export const validateExistence = (name, services) => {
    try {
        if (!services.getServices().has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
    }
    catch (error) {
        (new LoggerService()).log(`Error unregistering service: ${error.message}`, "error");
        return false;
    }
    return true;
};
export const validateEmptiness = (services) => {
    if (services.getServices().size > 0) {
        return false;
    }
    return true;
};
