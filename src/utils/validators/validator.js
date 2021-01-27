export const required = (value) => {
  if (!value) return 'Field is required';
  return undefined;
};

export const maxLength = (leng) => (value) => {
  if (value.length > leng) return 'Max length is 30 symbols';
  return undefined;
};
