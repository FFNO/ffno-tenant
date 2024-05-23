declare global {
  type Nullable<T> = T | null;

  type NullableObject<T> = { [K in keyof T]: T[K] | null };

  type DeepNullable<T> = {
    [K in keyof T]: DeepNullable<T[K]> | null;
  };
}

export {};
