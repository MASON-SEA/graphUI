export type CopyProperties<T> = {
  [key in keyof T]: T[key];
};
