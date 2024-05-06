export enum PropertyType {
  SINGLE_UNIT,
  MULTIPLE_UNIT,
}

export const propertyTypeRecord: Record<PropertyType, string> = {
  [PropertyType.SINGLE_UNIT]: 'Single Unit',
  [PropertyType.MULTIPLE_UNIT]: 'Multiple Unit',
};
