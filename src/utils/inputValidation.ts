export const validateObject = <T extends Record<string, any>>(obj: T): boolean => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined || value === "") {
        throw new Error(`The value for key "${key}" is empty.`);
      }
    }
    return true;
  };