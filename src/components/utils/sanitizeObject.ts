/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (value: any): any => {
  Object.keys(value).forEach((key) => value[key] == null && delete value[key]);
  return value;
};
