function inputValidation(inputs) {
  const MIN_NAME_LENGTH = 12;
  const MIN_PASS_LENGTH = 6;
  const REGEX = /\S+@\S+\.\S+/;

  const { email, name, password } = inputs;

  if (
    ('email' in inputs && !REGEX.test(email)) ||
    ('name' in inputs && name.length < MIN_NAME_LENGTH) ||
    ('password' in inputs && password.length < MIN_PASS_LENGTH)
  ) {
    return false;
  }

  return true;
}

export default inputValidation;
