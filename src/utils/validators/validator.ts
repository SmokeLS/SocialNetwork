export const required = (value: string) => {
  if (!value) return 'Field is required';
  return undefined;
};

export const maxLength = (leng: number) => (value: string) => {
  if (value.length > leng) return 'Max length is 30 symbols';
  return undefined;
};
