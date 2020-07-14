/* eslint-disable no-param-reassign */
export default (value) =>
  Object.keys(value).forEach((key) => value[key] == null && delete value[key]);
