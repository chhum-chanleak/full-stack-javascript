import { errorMessages } from "./errors.js";
export const validateShapeData = (name, shape) => {
    if (!name || !shape) {
        console.error(`${errorMessages.MISSING_NAME_SHAPE_PARAMETERS}`);
        return false;
    }
    return true;
};
