interface objType{
  [name: string]: string | number | any
}

export default (value:Object):objType => {
  Object.keys(value).forEach((key) => value[key] == null && delete value[key]);
  return value;
};
