import { useCallback } from 'react';

function useValidation(inputsArray) {
  const validate = useCallback((inputs) => {
    const MIN_NAME_LENGTH = 6;
    const MIN_PASS_LENGTH = 6;
    const REGEX = /\S+@\S+\.\S+/;

    const { name, email, password, confirmation } = inputs;

    if (
      ('name' in inputs && name.length < MIN_NAME_LENGTH) ||
      ('email' in inputs && !REGEX.test(email)) ||
      ('password' in inputs && password.length < MIN_PASS_LENGTH) ||
      ('confirmation' in inputs && password !== confirmation)
    ) {
      return false;
    }

    return true;
  }, []);

  return inputsArray.map((inputs) => validate(inputs));
}

export default useValidation;
