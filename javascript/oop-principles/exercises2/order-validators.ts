import { type AbstractOrderServicesStorage, LoggerService } from "./exercises.js"
import { errorMessages } from "./errors.js";

// Validators for Order

export const validateUniqueName = (name: string, services: AbstractOrderServicesStorage): boolean => {
  try {
    if (services.getServices().has(name)) {
      throw new Error(`${name} ${errorMessages.ALREADY_EXIST}`);
    }
  } catch(error) {
    (new LoggerService()).log(`Error registering service: ${(error as Error).message}`, "error");
    return false;
  }

  return true;
};

export const validateExistence = (name: string, services: AbstractOrderServicesStorage): boolean => {  
  try {
    if (!services.getServices().has(name)) {
      throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
    }
  } catch(error) {
    (new LoggerService()).log(`Error unregistering service: ${(error as Error).message}`, "error");
    return false;
  }

  return true;
};

export const validateEmptiness = (services: AbstractOrderServicesStorage): boolean => {
  if (services.getServices().size > 0) {    
    return false;
  }
  return true;
};