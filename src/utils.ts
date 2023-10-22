export function normalizeArray(array: number[]) {
    const maxOriginalValue = Math.max(...array);
    const minOriginalValue = Math.min(...array);
  
    const originalRange = maxOriginalValue - minOriginalValue;
    const desiredRange = 20 - 5;
  
    const normalizedArray = array.map((value) => {
      // Normalize the value within the new range
      const normalizedValue = 5 + ((value - minOriginalValue) / originalRange) * desiredRange;
      return normalizedValue;
    });
  
    return normalizedArray;
  }