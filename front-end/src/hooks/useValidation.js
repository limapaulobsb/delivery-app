import { useCallback } from 'react';

// This custom hook handles most form validations
function useValidation(inputsArray) {
  const validate = useCallback((inputs) => {
    const MIN_ADDRESS_LENGTH = 10;
    const MIN_NAME_LENGTH = 6;
    const MIN_PASS_LENGTH = 6;
    const REGEX = /\S+@\S+\.\S+/;

    const { name, email, password, confirmation, address } = inputs;

    // Conditions for inputs not being valid
    if (Object.keys(inputs).every((key) => !key)) {
      return false;
    }

    if (
      ('name' in inputs && name.length < MIN_NAME_LENGTH) ||
      ('email' in inputs && !REGEX.test(email)) ||
      ('password' in inputs && password.length < MIN_PASS_LENGTH) ||
      ('confirmation' in inputs && password !== confirmation) ||
      ('address' in inputs && address.length < MIN_ADDRESS_LENGTH)
    ) {
      return false;
    }

    return true;
  }, []);

  return inputsArray.map((inputs) => validate(inputs));
}

export default useValidation;
