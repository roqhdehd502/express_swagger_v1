/**
 * 정규표현식을 사용하여 문자열이 숫자로만 구성되었는지 확인
 * @param{string} value
 * @returns boolean
 */
export const isNumericString = (value: string) => {
  return /^\d+$/.test(value);
};

/**
 * 정규표현식을 사용하여 숫자가 자연수인지 확인
 * @param(number) value
 * @returns boolean
 */
export const isNaturalNumber = (value: number) => {
  const stringValue = value.toString();
  return /^[1-9]\d*$/.test(stringValue);
};
