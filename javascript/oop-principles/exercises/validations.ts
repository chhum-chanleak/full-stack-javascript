import { ShapeLSP } from "./more-SOLID-exercises";
import { errorMessages } from "./errors.js";

// Validation functions
type ValidateShapeData = (name: string, shape: ShapeLSP) => boolean;
export const validateShapeData: ValidateShapeData = (name, shape) =>  {
  if (!name || !shape) {
    console.error(`${errorMessages.MISSING_NAME_SHAPE_PARAMETERS}`);

    return false;
  }

  return true;
}